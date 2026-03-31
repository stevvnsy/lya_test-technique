package com.testtech.backend.secondary.adapter;

import com.testtech.backend.domain.entity.Category;
import com.testtech.backend.domain.service.CategoryService;
import com.testtech.backend.secondary.mapper.CategoryMapper;
import com.testtech.backend.secondary.repository.SpringDataCategoryRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CategoryRepositoryAdapter implements CategoryService {

    private final SpringDataCategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryRepositoryAdapter(SpringDataCategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toDomain)
                .toList();
    }

    @Override
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(categoryMapper::toDomain);
    }
}
