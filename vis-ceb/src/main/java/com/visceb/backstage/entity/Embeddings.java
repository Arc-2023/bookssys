package com.visceb.backstage.entity;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author zy
 * @description
 * @date 2021/1/20 15:12
 */

@Entity
@Table(name = "embeddings")
public class Embeddings {

    @Id
    private Long book_isbn;

    @Column(name = "embedding_x")
    private float embeddingX;

    @Column(name = "embedding_y")
    private float embeddingY;

    @Column(name = "category")
    private int category;

    public Long getBook_isbn() {
        return book_isbn;
    }

    public void setBook_isbn(Long book_isbn) {
        this.book_isbn = book_isbn;
    }

    public float getEmbeddingX() {
        return embeddingX;
    }

    public void setEmbeddingX(float embeddingX) {
        this.embeddingX = embeddingX;
    }

    public float getEmbeddingY() {
        return embeddingY;
    }

    public void setEmbeddingY(float embeddingY) {
        this.embeddingY = embeddingY;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }
}
