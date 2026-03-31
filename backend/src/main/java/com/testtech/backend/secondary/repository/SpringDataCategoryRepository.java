package com.testtech.backend.secondary.repository;

import com.testtech.backend.secondary.entity.CategoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataCategoryRepository extends JpaRepository<CategoryJpaEntity, Long> {
    boolean existsByName(String name);
}
