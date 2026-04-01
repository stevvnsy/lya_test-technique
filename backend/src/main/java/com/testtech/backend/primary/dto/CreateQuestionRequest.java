package com.testtech.backend.primary.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class CreateQuestionRequest {

    @NotBlank(message = "La question est obligatoire.")
    @Size(min = 3, max = 50, message = "La question doit contenir entre 3 et 50 caractères.")
    private String question;

    @NotBlank(message = "La réponse est obligatoire.")
    @Size(min = 3, max = 255, message = "La réponse doit contenir minimum 3 caractères et ne doit pas dépasser 255 caractères.")
    private String answer;
}
