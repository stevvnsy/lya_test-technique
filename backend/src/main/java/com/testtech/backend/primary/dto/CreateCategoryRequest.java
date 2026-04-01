package com.testtech.backend.primary.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class CreateCategoryRequest {

    @NotBlank(message = "Le nom de la catégorie est obligatoire.")
    @Size(min = 3, max = 50, message = "Le nom de la catégorie doit contenir entre 3 et 50 caractères.")
    private String name;

    @NotBlank(message = "La description est obligatoire.")
    @Size(min = 3, max = 255, message = "La description doit contenir minimum 3 caractères et ne doit pas dépasser 255 caractères.")
    private String description;
}
