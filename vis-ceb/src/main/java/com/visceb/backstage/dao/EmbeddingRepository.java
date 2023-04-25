package com.visceb.backstage.dao;

import com.visceb.backstage.entity.Book;
import com.visceb.backstage.entity.Embeddings;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author zy
 * @description
 * @date 2021/1/20 15:17
 */
public interface EmbeddingRepository extends JpaRepository<Embeddings, Long> {
}
