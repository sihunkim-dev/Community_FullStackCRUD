package com.community.backend.domain.category.service;

import com.community.backend.domain.category.Repository.CategoryRepository;
import com.community.backend.domain.category.dto.CategoryRequest;
import com.community.backend.domain.category.dto.CategoryResponse;
import com.community.backend.domain.category.entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

        Category category = categoryRepository.save(request.toEntity());

        return category.getId();
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}