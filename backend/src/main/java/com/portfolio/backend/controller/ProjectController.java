package com.portfolio.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.portfolio.backend.dto.ErrorResponse;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final Cloudinary cloudinary;

    @org.springframework.beans.factory.annotation.Value("${cloudinary.cloud-name:}")
    private String cloudinaryCloudName;

    public ProjectController(ProjectRepository projectRepository, Cloudinary cloudinary) {
        this.projectRepository = projectRepository;
        this.cloudinary = cloudinary;
    }

    // GET /api/projects  -> list all projects, newest first
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByIdDesc();
    }

    // GET /api/projects/{id} -> a single project (used by ProjectDetails page)
    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Project not found")));
    }

    // POST /api/projects -> create a new project, optional image file
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> createProject(
            @RequestParam String name,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String website,
            @RequestParam(required = false) String githubUrl,
            @RequestParam(required = false) MultipartFile image
    ) {
        if (!StringUtils.hasText(name)) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Project name is required"));
        }

        String imageUrl = null;
        String imagePublicId = null;

        if (image != null && !image.isEmpty()) {
            if (cloudinaryCloudName == null || cloudinaryCloudName.isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorResponse(
                                "Image uploads require Cloudinary credentials. " +
                                "Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and " +
                                "CLOUDINARY_API_SECRET, or submit the project without an image."));
            }
            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.asMap("folder", "portfolio-projects")
                );
                imageUrl = (String) uploadResult.get("secure_url");
                imagePublicId = (String) uploadResult.get("public_id");
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ErrorResponse("Failed to upload image: " + e.getMessage()));
            }
        }

        Project project = new Project(name, role, year, description, website, githubUrl, imageUrl, imagePublicId);
        Project saved = projectRepository.save(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // DELETE /api/projects/{id} -> remove project + its Cloudinary image
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return projectRepository.findById(id)
                .<ResponseEntity<?>>map(project -> {
                    if (project.getImagePublicId() != null) {
                        deleteCloudinaryImage(project.getImagePublicId());
                    }
                    projectRepository.deleteById(id);
                    return ResponseEntity.ok(new SuccessResponse(true));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Project not found")));
    }

    // ---------- Helpers ----------

    private void deleteCloudinaryImage(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException ignored) {
            // non-fatal: project record is still deleted even if image cleanup fails
        }
    }

    // small inline response type for delete success
    static class SuccessResponse {
        public boolean success;

        public SuccessResponse(boolean success) {
            this.success = success;
        }
    }
}
