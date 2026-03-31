package com.testtech.backend.primary.controller;

import com.testtech.backend.domain.entity.Category;
import com.testtech.backend.domain.entity.Question;
import com.testtech.backend.domain.exception.category.CategoryNotFoundException;
import com.testtech.backend.domain.service.CategoryService;
import com.testtech.backend.domain.service.QuestionService;
import com.testtech.backend.primary.dto.CreateCategoryRequest;
import com.testtech.backend.primary.dto.CreateQuestionRequest;
import com.testtech.backend.primary.mapper.CategoryDtoMapper;
import com.testtech.backend.primary.mapper.QuestionDtoMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final QuestionService questionService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        return ResponseEntity.ok(category);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody @Valid CreateCategoryRequest request) {
        Category category = CategoryDtoMapper.toDomain(request);

        Category createdCategory = categoryService.createCategory(category);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @PostMapping("/{id}/questions")
    public ResponseEntity<Question> addQuestionToCategory(@PathVariable Long id, @RequestBody @Valid CreateQuestionRequest request) {
        Category category = categoryService.getCategoryById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        Question question = QuestionDtoMapper.toDomain(category, request);

        Question createdQuestion = questionService.addQuestionToCategory(question);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestion);
    }
}
