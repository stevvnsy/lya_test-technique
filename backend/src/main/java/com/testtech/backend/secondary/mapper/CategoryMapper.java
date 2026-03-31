package com.testtech.backend.secondary.mapper;

import com.testtech.backend.domain.entity.Category;
import com.testtech.backend.domain.entity.Question;
import com.testtech.backend.secondary.entity.CategoryJpaEntity;
import com.testtech.backend.secondary.entity.QuestionJpaEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryMapper {

    public Category toDomain(CategoryJpaEntity entity) {
        if (entity == null) {
            return null;
        }

        List<Question> questions = entity.getQuestions().stream()
                .map(this::toDomainQuestion)
                .toList();

        return new Category(entity.getId(), entity.getName(), entity.getDescription(), questions);
    }

    private Question toDomainQuestion(QuestionJpaEntity entity) {
        return new Question(entity.getId(), entity.getQuestion(), entity.getAnswer());
    }
}
