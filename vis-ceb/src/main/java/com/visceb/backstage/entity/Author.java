package com.visceb.backstage.entity;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author zy
 * @description
 * @date 2020/11/21 15:35
 */
@Entity
@Table(name = "author")
public class Author implements Serializable {
    @Id
    private String author_id;

   @Column(name = "author_name")
    private String authorName;

    @Column(name = "author_picture")
    private String authorPicture;

    @Column(name = "author_country")
    private String authorCountry;

    public String getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(String author_id) {
        this.author_id = author_id;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getAuthorPicture() {
        return authorPicture;
    }

    public void setAuthorPicture(String authorPicture) {
        this.authorPicture = authorPicture;
    }

    public String getAuthorCountry() {
        return authorCountry;
    }

    public void setAuthorCountry(String authorCountry) {
        this.authorCountry = authorCountry;
    }
}
