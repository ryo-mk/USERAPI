package com.example.work9.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateForm {
    @NotBlank
    @Size(max = 20)
    private String name;

    public String getName() {
        return name;
    }
}
