package com.capstone.payload;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class RegisterRequest {
	@NotBlank
	@Email
	private String email;
	
	@NotBlank
	@Size(min = 6, max = 30)
	private String password;
	
	@NotBlank
	private String firstName;
	
	@NotBlank
	private String lastName;
	
	private Set<String> role;
}
