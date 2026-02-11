package com.community.backend.domain.category.Repository;

import com.community.backend.domain.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository  extends JpaRepository<Category, Long> {
    Boolean existsByName(String name);
}
