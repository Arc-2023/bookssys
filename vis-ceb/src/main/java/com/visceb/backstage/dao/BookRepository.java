package com.visceb.backstage.dao;
import com.visceb.backstage.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByBookNameAndAuthorId(String bookName,String AuthorId);
//    Book findByAuthorId();
//    Book findByBookIntro(String bookIntro);
//    List<Book> findSameAuthor(int AuthorId);
//    List<Book> findSamePress();
//    List<Book> findSameEmotion();
//    Book findByAuthorId(
    @Query(nativeQuery = true,value = "select * from book where book_emotion like %?%")
    List<Book> findLikeEmotionBooks(String emotion);
    List<Book> findAllByAuthorId(String AuthorId);
    List<Book> findAllByPressId(int PressId);
    List<Book> findAllByBookEmotion(String bookEmotion);
    List<Book> findAllByIsRecom(String recom);
    int deleteByBookName(String bookName);
    Book findByBookName(String bookName);
    @Query(value = "select * from book where book_isbn=?1", nativeQuery = true)
    Book findByBook_isbn(Long isbn);
    List<Book> findByIsRecom(String stage);

    void deleteAll();
}
