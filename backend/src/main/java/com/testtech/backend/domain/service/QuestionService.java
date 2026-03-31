package com.testtech.backend.domain.service;

import com.testtech.backend.domain.entity.Question;
import org.springframework.stereotype.Service;

@Service
public interface QuestionService {

    Question addQuestionToCategory(Question request);
}
