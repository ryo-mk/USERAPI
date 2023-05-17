package com.example.work9.controller;

import com.example.work9.entity.User;
import com.example.work9.service.UserService;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<NameResponse> getAllUsers() {
        return userService.findAll().stream().map(NameResponse::new).toList();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUsers(@PathVariable("id") int id) throws Exception {
        return Optional.ofNullable(userService.findById(id).orElseThrow(() -> new NotFoundException(id + " does not exist")));
    }

}
