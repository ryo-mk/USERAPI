package com.example.work9.controller;

import com.example.work9.entity.User;
import com.example.work9.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<NameResponse> getAllUser() {
        return userService.findAll().stream().map(NameResponse::new).toList();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable("id") int id) {
        return userService.findUser(id);
    }

}
