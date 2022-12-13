package com.capstone.controller;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.model.Product;
import com.capstone.model.Role;
import com.capstone.model.RoleEnum;
import com.capstone.model.User;
import com.capstone.payload.MessageResponse;
import com.capstone.payload.RegisterRequest;
import com.capstone.repository.RoleRepository;
import com.capstone.repository.UserRepository;
import com.capstone.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "https://ecommerce-capstone-fe.azurewebsites.net/")
public class UserController {
	@Autowired
	UserService usrService;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	RoleRepository roleRepo;
	
	@Autowired
	PasswordEncoder encoder;
	
	@GetMapping("/allUsers")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<User>> listOfAllUsers(){
		try {
			List<User> allUsers = usrService.listAllUsers();
			if(allUsers.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(allUsers, HttpStatus.OK);
			}
		} catch(Exception e){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/find/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Optional<User>> selectUserById(@PathVariable Integer id){
		try {
			Optional<User> foundUser = usrService.getUserById(id);
			return new ResponseEntity<>(foundUser, HttpStatus.OK);
		} catch(NoSuchElementException e){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	//this has to be fixed, change it more like the register method that is available for everyone
	//to access
	//SOLVED
	@PostMapping("/addUser")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest register){
		if (userRepo.existsByEmail(register.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use"));
		}

		User user = new User(register.getEmail(), 
							 encoder.encode(register.getPassword()), 
							 register.getFirstName(), 
							 register.getLastName());
		Set<String> rolesString = register.getRole();
		Set<Role> roles = new HashSet<>();
		if(rolesString == null) {
			Role userRole = roleRepo.findByRoleType(RoleEnum.ROLE_USER)
					.orElseThrow(()-> new RuntimeException("Error: Role not found"));
			roles.add(userRole);
		} else {
			rolesString.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepo.findByRoleType(RoleEnum.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role not found"));
					roles.add(adminRole);
					break;
				case "manager":
					Role managerRole = roleRepo.findByRoleType(RoleEnum.ROLE_MANAGER)
							.orElseThrow(()-> new RuntimeException("Error: Role not found"));
					roles.add(managerRole);
					break;
				default:
					Role userRole = roleRepo.findByRoleType(RoleEnum.ROLE_USER)
					.orElseThrow(()-> new RuntimeException("Error: Role not found"));
					roles.add(userRole);
					break;

				}
			});
		}
		
		user.setRoles(roles);
		userRepo.save(user);
		return ResponseEntity.ok(new MessageResponse("Register Success!"));
	}
	
	@PatchMapping("/update/{id}")
	public ResponseEntity<User> updateUserDetails(@PathVariable Integer id, @RequestBody RegisterRequest usr){
		try {
			User databaseUser = usrService.getUserById(id).get();
			if(Objects.nonNull(usr.getEmail())) {
				databaseUser.setEmail(usr.getEmail());
			}
			/*
			if(Objects.nonNull(usr.getPassword())) {
				databaseUser.setPassword(encoder.encode(usr.getPassword()));
			}
			*/		
			if(Objects.nonNull(usr.getFirstName())) {
				databaseUser.setFirstName(usr.getFirstName());
			}
			if(Objects.nonNull(usr.getLastName())) {
				databaseUser.setLastName(usr.getLastName());
			}
			//this is not doing what i want, non null will take the roles available and change it
			//to what i input, so if i dont input anything the roles are removed
			//SOLVED
			System.out.println(usr.getRole());
			if(Objects.nonNull((usr.getRole()))){
				Set<String> rolesString = usr.getRole();
				Set<Role> roles = new HashSet<>();
				if(rolesString == null) {
					Role userRole = roleRepo.findByRoleType(RoleEnum.ROLE_USER)
							.orElseThrow(()-> new RuntimeException("Error: Role not found"));
					roles.add(userRole);
				} else {
					rolesString.forEach(role -> {
						switch (role) {
						case "admin":
							Role adminRole = roleRepo.findByRoleType(RoleEnum.ROLE_ADMIN)
									.orElseThrow(() -> new RuntimeException("Error: Role not found"));
							roles.add(adminRole);
							break;
						case "manager":
							Role managerRole = roleRepo.findByRoleType(RoleEnum.ROLE_MANAGER)
									.orElseThrow(()-> new RuntimeException("Error: Role not found"));
							roles.add(managerRole);
							break;
						default:
							Role userRole = roleRepo.findByRoleType(RoleEnum.ROLE_USER)
							.orElseThrow(()-> new RuntimeException("Error: Role not found"));
							roles.add(userRole);
							break;

						}
					});
					databaseUser.setRoles(roles);
				}
			}
			return new ResponseEntity<>(usrService.save(databaseUser), HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//this is not working for some reason, returning not found although id is in database
	// SOLVED, i had an extra parenthesis in the url pattern
	@DeleteMapping("/remove/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteUserById(@PathVariable Integer id){
		try {
			User usr = usrService.getUserById(id)
								 .orElseThrow(()-> new RuntimeException("Error: User not found"));
			// this gets rid of the foreign key constraint in the users_to_roles table
			// otherwise there is a SQL integrity constraint violation
			usr.setRoles(null);
			usrService.deleteUser(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
