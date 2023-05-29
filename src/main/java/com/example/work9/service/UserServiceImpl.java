package com.example.work9.service;

import com.example.work9.entity.User;
import com.example.work9.exception.ResourceNotFoundException;
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
    public User findUser(int id) {
        Optional<User> user = this.userMapper.findById(id);
        return user.orElseThrow(() -> new ResourceNotFoundException("id:" + id + ",resource not found"));
    }

    @Override
    public User createUser(String createUserName) {
        User user = new User(createUserName);
        userMapper.createUser(user);
        return user;
    }

    @Override
    public void update(int id, String name) throws Exception {

    }
}
