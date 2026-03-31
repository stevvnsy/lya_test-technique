package com.testtech.backend.domain.entity;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class Category {
    private Long id;
    private String name;
    private String description;
    private List<Question> questions;

    public void validate() {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Le nom de la catégorie est obligatoire.");
        }
        if (description != null && description.length() > 255) {
            throw new IllegalArgumentException("La description ne peut pas dépasser 255 caractères.");
        }
    }
}
