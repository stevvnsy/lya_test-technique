package com.testtech.backend.domain.service;

import com.testtech.backend.domain.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    List<Category> getAllCategories();
}
