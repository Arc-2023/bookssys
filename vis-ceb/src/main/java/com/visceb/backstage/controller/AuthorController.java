package com.visceb.backstage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.visceb.backstage.dao.AuthorRepository;
import com.visceb.backstage.entity.Author;
/**
 * @author zy
 * @description
 * @date 2020/11/21 15:45
 */
@RestController
@CrossOrigin
@RequestMapping("author")
public class AuthorController {
    @Autowired
    private AuthorRepository authorrepository;

    @RequestMapping(value = "/saveAuthor", method = RequestMethod.POST)
//    @ResponseBody
    public Author saveAuthor(@RequestBody Author authors) {
        return authorrepository.save(authors);
    }
}
