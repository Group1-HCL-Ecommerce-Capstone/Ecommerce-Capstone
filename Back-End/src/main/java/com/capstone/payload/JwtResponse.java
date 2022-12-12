package com.capstone.payload;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private int userId;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private List<String> roles;
	
	public JwtResponse(String token, int userId, String email, String password, String firstName, String lastName,
			List<String> roles) {
		this.token = token;
		this.userId = userId;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.roles = roles;
	}
	
	
	
}
