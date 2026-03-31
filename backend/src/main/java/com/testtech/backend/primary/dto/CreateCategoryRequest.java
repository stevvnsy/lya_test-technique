package com.testtech.backend.primary.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateCategoryRequest {

    @NotNull(message = "Le nom de la catégorie est obligatoire.")
    @Size(min = 3, max = 50, message = "Le nom de la catégorie doit contenir entre 3 et 50 caractères.")
    private String name;

    @Size(max = 255, message = "La description ne doit pas dépasser 255 caractères.")
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
