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
    private final CategoryMapper categoryMapper;

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

    @Override
    public boolean existsByName(String name) {
        return categoryRepository.existsByName(name);
    }

    @Override
    public Category createCategory(Category category) {
        category.validate();

        if (existsByName(category.getName())) {
            throw new IllegalArgumentException("Une catégorie avec ce nom existe déjà !");
        }

        return categoryMapper.toDomain(
                categoryRepository.save(
                        categoryMapper.toJpaEntity(category)
                )
        );
    }
}
