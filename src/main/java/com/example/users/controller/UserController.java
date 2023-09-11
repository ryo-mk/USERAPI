package com.example.users.controller;

import com.example.users.entity.User;
import com.example.users.form.CreateForm;
import com.example.users.form.UpdateForm;
import com.example.users.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
        User user = userService.createUser(form.getName());
        URI url = uriBuilder
                .path("/users/" + user.getId())
                .build()
                .toUri();
        return ResponseEntity.created(url).body(Map.of("message", "user successfully created"));
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<User> update(
            @PathVariable("id") int id, @RequestBody @Validated UpdateForm form) {
        User user = userService.updateUser(id, form.getName());
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "successfully deleted user with id : " + id));
    }
}
