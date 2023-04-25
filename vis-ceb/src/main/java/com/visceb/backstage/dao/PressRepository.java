package com.visceb.backstage.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import com.visceb.backstage.entity.Press;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface PressRepository extends JpaRepository<Press, Long>{
    @Query(value = "select press_name from press where press_id=?1", nativeQuery = true)
    String findByPress_id(int pressid);
}
