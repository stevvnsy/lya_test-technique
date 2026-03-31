package com.testtech.backend.secondary.adapter;

import com.testtech.backend.domain.entity.Category;
import com.testtech.backend.domain.service.CategoryService;
import com.testtech.backend.secondary.mapper.CategoryMapper;
import com.testtech.backend.secondary.repository.SpringDataCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CategoryRepositoryAdapter implements CategoryService {

    private final SpringDataCategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryMapper::toDomain)
                .toList();
    }

    @Override
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(CategoryMapper::toDomain);
    }

    @Override
    public boolean existsByName(String name) {
        return categoryRepository.existsByName(name);
    }

    @Override
    public Category createCategory(Category category) {

        if (existsByName(category.getName())) {
            throw new IllegalArgumentException("Une catégorie avec ce nom existe déjà !");
        }

        return CategoryMapper.toDomain(
                categoryRepository.save(CategoryMapper.toJpaEntity(category))
        );
    }
}
