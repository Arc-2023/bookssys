package com.visceb.backstage.controller;

import com.visceb.backstage.entity.Embeddings;
import com.visceb.backstage.service.EmbeddingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author zy
 * @description
 * @date 2021/1/20 15:19
 */
@RestController
@RequestMapping("embeddings")
@CrossOrigin()
public class EmbeddingController {
    @Autowired
    private EmbeddingService embeddingService;

    @RequestMapping("/getAll")
    @ResponseBody
    public List<Embeddings> getAll() {
        return embeddingService.getAll();
    }
}
