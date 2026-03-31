package com.testtech.backend.secondary.mapper;

import com.testtech.backend.domain.entity.Question;
import com.testtech.backend.secondary.entity.CategoryJpaEntity;
import com.testtech.backend.secondary.entity.QuestionJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionMapper {

    public static Question toDomainQuestion(QuestionJpaEntity entity) {
        return Question.builder()
                .id(entity.getId())
                .question(entity.getQuestion())
                .answer(entity.getAnswer())
                .categoryId(entity.getCategory().getId())
                .build();
    }

    public static List<Question> toDomainQuestions(List<QuestionJpaEntity> entities) {
        if (entities == null || entities.isEmpty()) {
            return List.of();
        }

        return entities.stream()
                .map(QuestionMapper::toDomainQuestion)
                .toList();
    }

    public static QuestionJpaEntity toJpaQuestion(Question entity) {
        return QuestionJpaEntity.builder()
                .id(entity.getId())
                .question(entity.getQuestion())
                .answer(entity.getAnswer())
                .category(CategoryJpaEntity.builder().id(entity.getCategoryId()).build())
                .build();
    }

    public static List<QuestionJpaEntity> toJpaQuestions(List<Question> entities) {
        if (entities == null || entities.isEmpty()) {
            return List.of();
        }

        return entities.stream()
                .map(QuestionMapper::toJpaQuestion)
                .toList();
    }
}
