package com.visceb.backstage.entity;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "userbook")
public class UserBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userbook_id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "book_isbn")
    private Long book_isbn;

    @Column(name = "book_name")
    private String bookName;

    @Column(name = "book_emotion")
    private String bookEmotion;

    @Column(name = "book_grade")
    private String isRecom;

    public int getUserbook_id() {
        return userbook_id;
    }

    public void setUserbook_id(int userbook_id) {
        this.userbook_id = userbook_id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getBook_isbn() {
        return book_isbn;
    }

    public void setBook_isbn(Long book_isbn) {
        this.book_isbn = book_isbn;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookEmotion() {
        return bookEmotion;
    }

    public void setBookEmotion(String bookEmotion) {
        this.bookEmotion = bookEmotion;
    }

    public String getIsRecom() {
        return isRecom;
    }

    public void setIsRecom(String isRecom) {
        this.isRecom = isRecom;
    }
}
