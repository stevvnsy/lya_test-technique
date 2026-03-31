package com.testtech.backend.domain.entity;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Question {
    private Long id;
    private String question;
    private String answer;
}
