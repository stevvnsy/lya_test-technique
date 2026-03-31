package com.testtech.backend.secondary.repository;

import com.testtech.backend.secondary.entity.QuestionJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpringDataQuestionRepository extends JpaRepository<QuestionJpaEntity, Long> {
    List<QuestionJpaEntity> findAllByQuestionContainingIgnoreCase(String query);
}
