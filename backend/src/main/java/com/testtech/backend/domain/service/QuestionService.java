package com.testtech.backend.domain.service;

import com.testtech.backend.domain.entity.Question;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface QuestionService {

    Question addQuestionToCategory(Question request);

    Optional<List<Question>> searchQuestions(String query);
}
