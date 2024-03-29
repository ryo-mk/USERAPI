package com.example.users.controller;

import com.example.users.entity.User;

public class NameResponse {
    private int id;
    private String name;

    public NameResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
