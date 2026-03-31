package com.testtech.backend.primary.controller;

import com.testtech.backend.domain.entity.Question;
import com.testtech.backend.domain.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("/search")
    public ResponseEntity<Optional<List<Question>>> searchQuestions(@RequestParam(value = "q", required = false) String query) {
        Optional<List<Question>> questions = questionService.searchQuestions(query);

        return ResponseEntity.ok(questions);
    }
}
