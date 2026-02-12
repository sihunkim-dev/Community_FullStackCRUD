package com.community.backend.domain.category.dto;

import com.community.backend.domain.category.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    private String name;
    private String description;

    public Category toEntity() {
        return Category.builder()
                .name(name)
                .description(description)
                .build();
    }
}
