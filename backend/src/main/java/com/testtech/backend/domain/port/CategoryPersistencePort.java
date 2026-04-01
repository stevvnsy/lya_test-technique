package com.testtech.backend.domain.port;

import com.testtech.backend.domain.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryPersistencePort {

    List<Category> getAllCategories();

    Optional<Category> getCategoryById(Long id);

    boolean existsByName(String name);

    Category createCategory(Category category);
}
