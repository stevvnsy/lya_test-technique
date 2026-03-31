package com.testtech.backend.primary.mapper;

import com.testtech.backend.domain.entity.Category;
import com.testtech.backend.primary.dto.CreateCategoryRequest;
import org.springframework.stereotype.Component;

@Component
public class CategoryDtoMapper {

    public static Category toDomain(CreateCategoryRequest request) {
        return Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }
}
