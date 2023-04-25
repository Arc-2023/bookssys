package com.visceb.backstage.service;

import com.visceb.backstage.dao.EmbeddingRepository;
import com.visceb.backstage.entity.Embeddings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author zy
 * @description
 * @date 2021/1/20 15:20
 */
@Service
public class EmbeddingService {
    @Autowired
    private EmbeddingRepository embeddingRepository;

    public List<Embeddings> getAll() {
        return embeddingRepository.findAll();
    }
}
