package com.example.work9.service;

import com.example.work9.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findUser(int id);

    User createUser(String getName);

    void update(int id, String name) throws Exception;
}
