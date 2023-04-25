package com.visceb.backstage.service;

import com.visceb.backstage.entity.Users;

public interface userService {
    Users findByUserGrade(String userGrade);
}
