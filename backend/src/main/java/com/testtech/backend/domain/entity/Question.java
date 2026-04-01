package com.testtech.backend.domain.entity;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Question {
    private Long id;

    @NotEmpty(message = "La question est obligatoire.")
    @Size(min = 3, max = 50, message = "La question doit contenir entre 3 et 50 caractères.")
    private String question;

    @NotEmpty(message = "La réponse est obligatoire.")
    @Size(min = 3, max = 255, message = "La réponse doit contenir minimum 3 caractères et ne doit pas dépasser 255 caractères.")
    private String answer;

    @NotNull(message = "L'id de la catégorie est obligatoire.")
    private Long categoryId;
}
