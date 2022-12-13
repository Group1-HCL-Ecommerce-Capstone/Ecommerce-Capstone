package com.capstone.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.model.Address;
import com.capstone.model.Order;
import com.capstone.model.Product;
import com.capstone.model.User;
import com.capstone.payload.dto.AddressDto;
import com.capstone.repository.UserRepository;
import com.capstone.service.AddressService;
import com.capstone.service.UserService;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = "https://ecommerce-capstone-fe.azurewebsites.net/")
public class AddressController {
	@Autowired
	AddressService adrService;
	
	@Autowired
	UserService usrServ;
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/all/{email}")
	public ResponseEntity<List<Address>> findAddressesByUserId(@PathVariable String email) {
		try {
			List<Address> adrs = adrService.listAllAddressesByUser(email);
			if (adrs.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(adrs, HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add/{email}")
	public ResponseEntity<Address> addAddress(@PathVariable String email, @RequestBody AddressDto adr) {
		try {
			Address adrAdded = null;
			boolean emailExists = userRepo.existsByEmail(email);
			if (emailExists) {
				User user = usrServ.findUserByEmail(email).get();
				System.out.println(user.getUserId());
				adrAdded = adrService.addAddress(adr, user);
			}else {
				
				User newCustomer = new User();
				newCustomer.setEmail(email);
				usrServ.save(newCustomer);
				adrAdded = adrService.addAddress(adr, newCustomer);
			}
			return new ResponseEntity<>(adrAdded, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PatchMapping("/update/{addressId}")
	public ResponseEntity<Address> updateAddress(@PathVariable Integer addressId, @RequestBody Address adr) {
		try {
			Address databaseAdr = adrService.findByAddressId(addressId).get();

			if (Objects.nonNull(adr.getStreet())) {
				databaseAdr.setStreet(adr.getStreet());
			}
			if (Objects.nonNull(adr.getCity())) {
				databaseAdr.setCity(adr.getCity());
			}
			if (Objects.nonNull(adr.getState())) {
				databaseAdr.setState(adr.getState());
			}
			if (Objects.nonNull(adr.getCountry())) {
				databaseAdr.setCountry(adr.getCountry());
			}
			if (Objects.nonNull(adr.getZipcode())) {
				databaseAdr.setZipcode(adr.getZipcode());
			}
			if (Objects.nonNull(adr.getPhone())) {
				databaseAdr.setPhone(adr.getPhone());
			}
			return new ResponseEntity<>(adrService.save(databaseAdr), HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/find/{adrId}")
	public ResponseEntity<Optional<Address>> findAddressById(@PathVariable Integer adrId){
		try {
			Optional<Address> address = adrService.findByAddressId(adrId);
			return new ResponseEntity<>(address, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete/{addressId}")
	public ResponseEntity<HttpStatus> deleteAddress(@PathVariable Integer addressId) {
		try {
			adrService.deleteAddressById(addressId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
