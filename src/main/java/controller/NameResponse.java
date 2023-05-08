package controller;

import entity.Name;

public class NameResponse {
    private int id;
    private String name;

    // Name NameResponse
    public NameResponse(Name name) {
        this.id = name.getId();
        this.name = name.getName();
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
