package com.example.USERAPI.service;

import com.example.USERAPI.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findUser(int id);

    User createUser(String getName);

    User updateUser(int id, String name);

    User deleteUser(int id);
}
