package com.testtech.backend.domain.entity;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Question {
    private Long id;

    @NotEmpty(message = "La question est obligatoire.")
    private String question;

    @NotEmpty(message = "La réponse est obligatoire.")
    private String answer;

    @NotNull(message = "L'id de la catégorie est obligatoire.")
    private Long categoryId;
}
