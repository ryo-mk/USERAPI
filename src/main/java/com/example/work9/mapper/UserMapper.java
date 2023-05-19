package com.example.work9.mapper;

import com.example.work9.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM names")
    List<User> findAll();

    @Select("SELECT * FROM names WHERE id = #{id}")
    Optional<User> findById(int id);
}
