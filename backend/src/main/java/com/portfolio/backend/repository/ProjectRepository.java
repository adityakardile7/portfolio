package com.portfolio.backend.repository;

import com.portfolio.backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    // findAll(), findById(), save(), deleteById() etc. are provided automatically.
    // We order newest-first for the home page list.
    java.util.List<Project> findAllByOrderByIdDesc();
}
