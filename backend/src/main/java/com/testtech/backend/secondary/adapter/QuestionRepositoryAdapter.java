package com.testtech.backend.secondary.adapter;

import com.testtech.backend.domain.entity.Question;
import com.testtech.backend.domain.service.QuestionService;
import com.testtech.backend.secondary.mapper.QuestionMapper;
import com.testtech.backend.secondary.repository.SpringDataQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class QuestionRepositoryAdapter implements QuestionService {

    private final SpringDataQuestionRepository questionRepository;

    @Override
    public Question addQuestionToCategory(Question request) {

        return QuestionMapper.toDomainQuestion(
                questionRepository.save(QuestionMapper.toJpaQuestion(request))
        );
    }

    @Override
    public Optional<List<Question>> searchQuestions(String query) {
        if (query == null || query.isBlank()) {
            return Optional.of(QuestionMapper.toDomainQuestions(questionRepository.findAll()));
        }

        return Optional.of(QuestionMapper.toDomainQuestions(questionRepository.findAllByQuestionContainingIgnoreCase(query)));
    }
}
