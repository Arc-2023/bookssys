package com.visceb.backstage.entity;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "press")
public class Press {
    @Id
    private int press_id;

    @Column(name = "press_name")
    private String pressName;

    public int getPress_id() {
        return press_id;
    }

    public void setPress_id(int press_id) {
        this.press_id = press_id;
    }

    public String getPressName() {
        return pressName;
    }

    public void setPressName(String pressName) {
        this.pressName = pressName;
    }
}
