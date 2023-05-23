package com.example.work9.service;

import com.example.work9.entity.User;
import com.example.work9.form.CreateForm;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findUser(int id);

    User createUser(CreateForm form);

    void update(int id, String name) throws Exception;
}
