package com.example.users.mapper;

import com.example.users.entity.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
import java.util.Optional;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM names")
    List<User> findAll();

    @Select("SELECT * FROM names WHERE id = #{id}")
    Optional<User> findById(int id);

    @Insert("INSERT INTO names (name) VALUES (#{name})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void createUser(User user);

    @Update("UPDATE names SET name = #{name} WHERE id = #{id}")
    void updateUser(User user);

    @Delete("DELETE FROM names WHERE id = #{id}")
    void deleteUser(int id);
}
