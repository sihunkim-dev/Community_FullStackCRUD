package com.community.backend.domain.category.service;

import com.community.backend.domain.category.Repository.CategoryRepository;
import com.community.backend.domain.category.dto.CategoryRequest;
import com.community.backend.domain.category.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    public Long createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Already Exists");
        }

        Category category = Category.builder()
                .name(request.getName())
                .description("")
                .build();

        return categoryRepository.save(category).getId();
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}