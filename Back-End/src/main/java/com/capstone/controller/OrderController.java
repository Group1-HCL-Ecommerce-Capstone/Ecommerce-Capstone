package com.capstone.controller;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.model.Address;
import com.capstone.model.Order;
import com.capstone.model.Product;
import com.capstone.model.User;
import com.capstone.payload.dto.AddressDto;
import com.capstone.repository.AddressRepository;
import com.capstone.repository.UserRepository;
import com.capstone.service.AddressService;
import com.capstone.service.EmailService;
import com.capstone.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200/")
public class OrderController {
	@Autowired
	OrderService orderServ;
	
	//added auto-wired for EmailService
	@Autowired
	private EmailService emailService;
	@Autowired
	UserRepository userRepo;
	@Autowired
	AddressRepository addressRepo;
	@Autowired
	AddressService addressServ;
	
	@GetMapping("/all")
	public ResponseEntity<List<Order>> allOrders(){
		try {
			List<Order> allOrders = orderServ.listAllOrders();
			if (allOrders.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(allOrders, HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	// i need to put in a check to make sure the address is associated with the user
	//added LoginRequest login and Integer orderId objects to get order number confirmation and email sent to the right email address
	@PostMapping("/add/{email}")
	public ResponseEntity<Order> placeOrder(@PathVariable String email, @RequestBody AddressDto address){
		try {	
			Optional<Address> databaseAdr = addressRepo.findByStreetAndCityAndState(address.getStreet(), address.getCity(), address.getState());
			User user = userRepo.findByEmail(email).get();
			int addressId = 0;
			if (databaseAdr.isPresent()) {
				addressId = databaseAdr.get().getId();
			} else {
				Address newAdr = addressServ.addAddress(address, user);
				addressId = newAdr.getId();
			}
			
			if (addressId!=0) {
				Order placedOrder = orderServ.createOrder(email, addressId);
				//String userEmail = email;
				String userStreet = addressRepo.findById(addressId).get().getStreet();
				String userState = addressRepo.findById(addressId).get().getCity();
				String userCountry = addressRepo.findById(addressId).get().getCountry();
				String userZip = addressRepo.findById(addressId).get().getZipcode();
				
				//adding email confirmation and order number for confirmation
				emailService.sendMail(email , "Order placed! Order number: "+ placedOrder.getId(), "Thank you for placing an order with us! Here's your order details: " 
				+ "\n"  + "Order Status: " + placedOrder.getStatus() + "\n" + "Shipping Address: " + userStreet + ", " + userState + " " + userZip + " " + userCountry +
				"\n" + "Total Order Price: $" + placedOrder.getTotalPrice());
				return new ResponseEntity<>(placedOrder, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/all/{email}")
	public ResponseEntity<List<Order>> getAllUserOrders(@PathVariable String email){
		try {
			List<Order> allOrders = orderServ.listOrders(email);
			return new ResponseEntity<>(allOrders, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/find/{orderId}")
	public ResponseEntity<Order> findOrderById(@PathVariable Integer orderId){
		try {
			Order order = orderServ.findOrder(orderId);
			return new ResponseEntity<>(order, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// there is a better way to do this using the enum stuff like in roles but maybe it can be implemented later
	@PatchMapping("/updatestatus/{orderId}")
	@PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
	public ResponseEntity<Order> updateOrderStatus(@PathVariable Integer orderId, @RequestBody Order order){
		try {
			Order databaseOrder = orderServ.findOrder(orderId);
			String status = order.getStatus();		
			
			if (Objects.nonNull(status)&&status.equalsIgnoreCase("shipped")) {
				databaseOrder.setStatus(status);
			} else if(Objects.nonNull(status)&&status.equalsIgnoreCase("delivered")) {
				databaseOrder.setStatus(status);
			}
			int userId = databaseOrder.getUser().getUserId();
			
			//push email status of order update
			User user = userRepo.findById(userId).get();
			String email = user.getEmail();
			Address address = databaseOrder.getAddress();
			String street = address.getStreet();
			String city = address.getCity();
			String state = address.getState();
			String zip = address.getZipcode();
			String country = address.getCountry();
			emailService.sendMail(email , "Order Update! Order number: "+ orderId, "Thank you for your patience! Here's your updated order details: "
			+ "\n" + "Order Status: " + status + "\n" + "Shipping Address: " + street + ", " + city + " " + state + " " 
					+ zip + " "+ country + "\n" + "Total Order Price: $"+ databaseOrder.getTotalPrice());
			 
			return new ResponseEntity<>(orderServ.save(databaseOrder), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}