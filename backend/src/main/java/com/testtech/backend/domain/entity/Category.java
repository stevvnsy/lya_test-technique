package com.testtech.backend.domain.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class Category {
    private Long id;

    @NotEmpty(message = "Le nom de la catégorie est obligatoire.")
    @Size(min = 3, max = 50, message = "Le nom de la catégorie doit contenir entre 3 et 50 caractères.")
    private String name;

    @NotBlank(message = "La description est obligatoire.")
    @Size(min = 3, max = 255, message = "La description doit contenir minimum 3 caractères et ne doit pas dépasser 255 caractères.")
    private String description;

    private List<Question> questions;
}
