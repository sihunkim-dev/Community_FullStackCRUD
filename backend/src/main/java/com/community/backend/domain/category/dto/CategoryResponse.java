package com.community.backend.domain.category.dto;

import com.community.backend.domain.category.entity.Category;
import lombok.Getter;

@Getter
public class CategoryResponse {
    private Long id;
    private String name;
    private String description;

    public CategoryResponse(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.description = category.getDescription();
    }
}
