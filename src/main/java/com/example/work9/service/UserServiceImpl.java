package com.example.work9.service;

import com.example.work9.entity.User;
import com.example.work9.exception.ResourceNotFoundException;
import com.example.work9.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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
    public User createUser(String getName) {
        User user = new User(getName);
        userMapper.createUser(user);
        return user;
    }

    @Override
    public User updateUser(int id, String name) {
        User user = findUser(id);
        if (Objects.isNull(user)) {
            return user;
        }
        User updateUserName = new User(id, name);
        userMapper.updateUser(updateUserName);
        return updateUserName;
    }

    @Override
    public User deleteUser(int id) {
        User user = findUser(id);
        if (Objects.isNull(user)) {
            return user;
        }
        User deleteUser = new User(id);
        userMapper.deleteUser(id);
        return deleteUser;
    }
}
