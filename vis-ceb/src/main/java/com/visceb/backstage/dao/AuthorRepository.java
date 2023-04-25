package com.visceb.backstage.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.visceb.backstage.entity.Author;
import org.springframework.data.jpa.repository.Query;

/**
 * @author zy
 * @description
 * @date 2020/11/21 15:41
 */
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Author findByAuthorName(String author_name);
    @Query(value = "select author_name from author where author_id=?1", nativeQuery = true)
    String findByAuthor_id(String author_id);
}
