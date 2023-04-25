package com.visceb.backstage.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
@Entity
@Table(name = "book")
public class Book implements Serializable {

    @Id
    private Long book_isbn;

    @Column(name = "book_name")
    private String bookName;

    @Column(name = "press_id")
    private int pressId;

    @Column(name = "type_id")
    private String typeId;

    @Column(name = "author_id")
    private String authorId;

    @Column(name = "book_intro")
    private String bookIntro;

    @Column(name = "is_recom")
    private String isRecom;

    @Column(name = "book_emotion")
    private String bookEmotion;

    @Column(name = "book_picture")
    private String bookPicture;

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

    public int getPressId() {
        return pressId;
    }

    public void setPressId(int pressId) {
        this.pressId = pressId;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getBookIntro() {
        return bookIntro;
    }

    public void setBookIntro(String bookIntro) {
        this.bookIntro = bookIntro;
    }

    public String getIsRecom() {
        return isRecom;
    }

    public void setIsRecom(String isRecom) {
        this.isRecom = isRecom;
    }

    public String getBookEmotion() {
        return bookEmotion;
    }

    public void setBookEmotion(String bookEmotion) {
        this.bookEmotion = bookEmotion;
    }

    public String getBookPicture() {
        return bookPicture;
    }

    public void setBookPicture(String bookPicture) {
        this.bookPicture = bookPicture;
    }
}
