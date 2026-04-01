package com.testtech.backend.secondary.adapter;

import com.testtech.backend.domain.entity.Question;
import com.testtech.backend.domain.port.QuestionPersistencePort;
import com.testtech.backend.secondary.mapper.QuestionMapper;
import com.testtech.backend.secondary.repository.SpringDataQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class QuestionRepositoryAdapter implements QuestionPersistencePort {

    private final SpringDataQuestionRepository questionRepository;

    public Question addQuestionToCategory(Question request) {

        return QuestionMapper.toDomainQuestion(
                questionRepository.save(QuestionMapper.toJpaQuestion(request))
        );
    }

    public Optional<List<Question>> getAllQuestions() {
        return Optional.of(QuestionMapper.toDomainQuestions(questionRepository.findAll()));
    }

    public Optional<List<Question>> searchQuestions(String query) {
        return Optional.of(QuestionMapper.toDomainQuestions(questionRepository.findAllByQuestionContainingIgnoreCase(query)));
    }
}
