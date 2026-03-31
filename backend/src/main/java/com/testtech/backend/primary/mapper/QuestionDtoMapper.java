package com.testtech.backend.primary.mapper;

import com.testtech.backend.domain.entity.Category;
import com.testtech.backend.domain.entity.Question;
import com.testtech.backend.primary.dto.CreateQuestionRequest;
import org.springframework.stereotype.Component;

@Component
public class QuestionDtoMapper {

    public static Question toDomain(Category category, CreateQuestionRequest request) {
        return Question.builder()
                .categoryId(category.getId())
                .question(request.getQuestion())
                .answer(request.getAnswer())
                .build();
    }
}
