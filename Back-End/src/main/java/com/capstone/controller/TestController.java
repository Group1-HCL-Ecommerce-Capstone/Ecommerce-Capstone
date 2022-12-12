package com.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.service.EmailService;

@RestController
@RequestMapping("/test")
public class TestController {
	
	//added autowired for EmailService
	@Autowired
    private EmailService emailService;
	
	@GetMapping("/all")
	public String welcome() {
		return "Welcome to Spring Security Test 1";
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
	public String welcomeUser() {
		return "Hello user";
	}
	
	@GetMapping("/manag")
	@PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
	public String welcomeManager() {
		return "Hello manager";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String welcomeAdmin() {
		return "Hello admin";
	}
	
	//added mapping for to test sending an email via /test/sendemail
    @GetMapping(value = "/sendemail")
    public String sendmail() {

        emailService.sendMail("test@example.com", "Test Subject", "Test mail body");

        return "emailsent";
    }
}
