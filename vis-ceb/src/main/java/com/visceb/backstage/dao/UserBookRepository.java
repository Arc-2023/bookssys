package com.visceb.backstage.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import com.visceb.backstage.entity.UserBook;

import java.util.List;

public interface UserBookRepository extends JpaRepository<UserBook, Long>{
    void deleteAllByUserName(String username);
    List<UserBook> findByIsRecom(String bookgrade);
    List<UserBook> findByUserName(String username);
    List<UserBook> findByUserNameAndIsRecom(String username, String bookgrade);
    boolean existsByUserName(String username);
}
