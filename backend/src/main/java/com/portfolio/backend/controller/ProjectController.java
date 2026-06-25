package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ErrorResponse;
import com.portfolio.backend.model.Project;
import com.portfolio.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository projectRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
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

        String imagePath = null;
        if (image != null && !image.isEmpty()) {
            try {
                imagePath = saveImage(image);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ErrorResponse("Failed to save image: " + e.getMessage()));
            }
        }

        Project project = new Project(name, role, year, description, website, githubUrl, imagePath);
        Project saved = projectRepository.save(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // DELETE /api/projects/{id} -> remove project + its image file
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        return projectRepository.findById(id)
                .<ResponseEntity<?>>map(project -> {
                    if (project.getImage() != null) {
                        deleteImageFile(project.getImage());
                    }
                    projectRepository.deleteById(id);
                    return ResponseEntity.ok(new SuccessResponse(true));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Project not found")));
    }

    // ---------- Helpers ----------

    private String saveImage(MultipartFile file) throws IOException {
        Path uploadPath = Path.of(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String filename = UUID.randomUUID() + extension;
        Path destination = uploadPath.resolve(filename);
        file.transferTo(destination);

        return "/uploads/" + filename;
    }

    private void deleteImageFile(String imagePathUrl) {
        try {
            // imagePathUrl looks like "/uploads/xxxx.png" -> strip leading "/uploads/"
            String filename = imagePathUrl.replaceFirst("^/uploads/", "");
            Path filePath = Path.of(uploadDir).resolve(filename);
            Files.deleteIfExists(filePath);
        } catch (IOException ignored) {
            // non-fatal: project record is still deleted even if file cleanup fails
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
