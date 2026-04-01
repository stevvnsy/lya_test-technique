package com.testtech.backend.domain.port;

import com.testtech.backend.domain.entity.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionPersistencePort {

    Question addQuestionToCategory(Question request);

    Optional<List<Question>> getAllQuestions();

    Optional<List<Question>> searchQuestions(String query);
}
