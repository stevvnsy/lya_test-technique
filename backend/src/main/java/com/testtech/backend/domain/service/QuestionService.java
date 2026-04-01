package com.testtech.backend.domain.service;

import com.testtech.backend.domain.entity.Question;
import com.testtech.backend.domain.port.QuestionPersistencePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionPersistencePort questionPersistencePort;

    public Question addQuestionToCategory(Question request) {
        return questionPersistencePort.addQuestionToCategory(request);
    }

    public Optional<List<Question>> searchQuestions(String query) {
        if (query == null || query.isBlank()) {
            return questionPersistencePort.getAllQuestions();
        }
        return questionPersistencePort.searchQuestions(query);
    }

}
