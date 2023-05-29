package com.example.work9.controller;

import com.example.work9.entity.User;
import com.example.work9.form.CreateForm;
import com.example.work9.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/users")
    public ResponseEntity<Map<String, String>> create(
            @RequestBody @Validated CreateForm form, UriComponentsBuilder uriBuilder) {
        User user = userService.createUser(form.createUserName());
        URI url = uriBuilder
                .path("/users/" + user.getId())
                .build()
                .toUri();
        return ResponseEntity.created(url).body(Map.of("message", "user successfully created"));
    }

}
