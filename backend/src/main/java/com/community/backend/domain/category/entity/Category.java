package com.community.backend.domain.category.entity;

import com.community.backend.global.entity.BaseTimeEntity; // 👈 Post에서 썼던 그거 가져오기
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "categories")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 👈 아무나 new Category() 못하게 막음 (안전성)
public class Category extends BaseTimeEntity { // 👈 시간 관리는 상속으로 해결!

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 255)
    private String description;

    // createdDate 필드는 BaseTimeEntity에 있으므로 삭제!

    // 👇 생성자 대신 빌더 패턴 사용
    @Builder
    public Category(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // 👇 이름과 설명을 동시에 수정하거나, 필요한 것만 수정하는 메서드
    public void update(String name, String description) {
        this.name = name;
        this.description = description;
    }
}