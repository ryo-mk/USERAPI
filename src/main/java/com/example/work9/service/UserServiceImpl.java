package com.example.work9.service;

import com.example.work9.entity.User;
import com.example.work9.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }

    @Override
    public Optional<User> findById(int id) throws Exception {
        return userMapper.findById(id);
    }

    @Override
    public void create(String name) {

    }

    @Override
    public void update(int id, String name) throws Exception {

    }
}
