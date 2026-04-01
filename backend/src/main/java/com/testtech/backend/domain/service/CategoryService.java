package com.testtech.backend.domain.service;

import com.testtech.backend.domain.entity.Category;
import com.testtech.backend.domain.port.CategoryPersistencePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryPersistencePort categoryPersistencePort;

    public List<Category> getAllCategories() {
        return categoryPersistencePort.getAllCategories();
    }

    public Optional<Category> getCategoryById(Long id) {
        return categoryPersistencePort.getCategoryById(id);
    }

    public Category createCategory(Category category) {
        if (existsByName(category.getName())) {
            throw new IllegalArgumentException("Une catégorie avec ce nom existe déjà !");
        }

        return categoryPersistencePort.createCategory(category);
    }

    public boolean existsByName(String name) {
        return categoryPersistencePort.existsByName(name);
    }

}
