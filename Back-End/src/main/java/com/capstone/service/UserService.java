package com.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.model.User;
import com.capstone.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository repo;

	public User save(User user) {
		return repo.save(user);
	}
	
	public User registerUser(User user) {
		return repo.save(user);
	}
	
	public Optional<User> getUserById(Integer userId){
		return repo.findById(userId);
	}
	
	public Optional<User> findUserByEmail(String email){
		return repo.findByEmail(email);
	}
	
	public void deleteUser(Integer userId) {
		repo.deleteById(userId);
	}

	public List<User> listAllUsers() {
		return repo.findAll();
	}
}
