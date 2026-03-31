package com.testtech.backend.primary.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CreateQuestionRequest {

    @NotBlank(message = "La question est obligatoire.")
    private String question;

    @NotBlank(message = "La réponse est obligatoire.")
    private String answer;
}
