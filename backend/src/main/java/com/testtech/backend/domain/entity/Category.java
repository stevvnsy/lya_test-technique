package com.testtech.backend.domain.entity;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class Category {
    private Long id;

    @NotEmpty(message = "Le nom de la catégorie est obligatoire.")
    private String name;

    @Max(message = "La description ne peut pas dépasser 255 caractères.", value = 255)
    private String description;

    private List<Question> questions;
}
