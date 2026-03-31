package com.testtech.backend.secondary.mapper;

import com.testtech.backend.domain.entity.Category;
import com.testtech.backend.secondary.entity.CategoryJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public static Category toDomain(CategoryJpaEntity entity) {
        if (entity == null) {
            return null;
        }

        return Category.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .questions(QuestionMapper.toDomainQuestions(entity.getQuestions()))
                .build();
    }

    public static CategoryJpaEntity toJpaEntity(Category category) {
        return CategoryJpaEntity.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .questions(QuestionMapper.toJpaQuestions(category.getQuestions()))
                .build();
    }
}
