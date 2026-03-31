package com.testtech.backend.secondary.adapter;

import com.testtech.backend.domain.entity.Question;
import com.testtech.backend.domain.service.QuestionService;
import com.testtech.backend.secondary.mapper.QuestionMapper;
import com.testtech.backend.secondary.repository.SpringDataQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

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
}
