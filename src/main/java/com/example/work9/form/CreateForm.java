package com.example.work9.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateForm {
    private String name;

    @NotBlank
    @Size(max = 20)
    public String getName() {
        return name;
    }

}
