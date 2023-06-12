package com.pky.ecommerce.models;

public class CategoryDTO {
    private Integer categoryId;
    private String categoryName;

    
    public CategoryDTO(Category c) {
        this.categoryId = c.getCategoryId();
        this.categoryName = c.getCategoryName();
    }

    public Integer getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    public String getCategoryName() {
        return categoryName;
    }
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    
}
