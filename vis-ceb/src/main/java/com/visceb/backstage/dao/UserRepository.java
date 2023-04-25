package com.visceb.backstage.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import com.visceb.backstage.entity.Users;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/**
 * @author zy
 * @description
 * @date 2020/11/19 19:24
 */

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUserName(String user_name);
    List<Users> findAll();
    List<Users> findAllByIdentity(String identity);
    List<Users> findAllByUserName(String userName);
    int deleteByUserName(String userName);
    void deleteAll();
//    @Query(value = "select  user_name from user where  user_id=?1",nativeQuery = true)
//    String findByUserName(String user_name);
}
