package com.example.work9.service;

import com.example.work9.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();

    Optional<User> findById(int id) throws Exception;

    void create(String name);

    void update(int id, String name) throws Exception;
}
