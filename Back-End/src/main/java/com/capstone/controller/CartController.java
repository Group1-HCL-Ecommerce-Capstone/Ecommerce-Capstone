package com.capstone.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.model.Cart;
import com.capstone.model.Product;
import com.capstone.model.User;
import com.capstone.payload.dto.AddToCartDto;
import com.capstone.payload.dto.CartDto;
import com.capstone.payload.dto.CartItemDto;
import com.capstone.repository.CartRepository;
import com.capstone.repository.UserRepository;
import com.capstone.service.CartService;
import com.capstone.service.ProductService;
import com.capstone.service.UserService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:4200/")
public class CartController {
	@Autowired
	CartService cartServ;
	
	@Autowired
	ProductService prdServ;
	
	@Autowired
	UserService usrServ;
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/list/{email}")
	public ResponseEntity<CartDto> showCart(@PathVariable String email) {
		try {
			CartDto currentCart = cartServ.listCartItems(email);
			return new ResponseEntity<>(currentCart, HttpStatus.OK);
		} catch (Exception e){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// i need to implement something so that when you add the same product it just adds to the quantity
	//SOLVED
	@PostMapping("/add/{email}")
	public ResponseEntity<Cart> addToCart(@RequestBody AddToCartDto cartAdd, @PathVariable String email){
		try {
			Cart newCart = null;
			Cart selected = null;
			Optional<Cart> item = cartServ.findCartByUserAndProductId(email,cartAdd.getProductId());
			if (item.isPresent()) {
				selected = item.get();
				int itemAmt = selected.getQuantity();
				int cartAmt = cartAdd.getQuantity();
				int newAmt = itemAmt+cartAmt;
				System.out.println(newAmt);
				
				selected.setQuantity(newAmt);
				cartServ.save(selected);
			}else {
				boolean emailExists = userRepo.existsByEmail(email);
				if (emailExists) {
					User user = userRepo.findByEmail(email).get();
					Product prd = prdServ.findByProductId(cartAdd.getProductId()).get();
					System.out.println(prd.getName());
					newCart = cartServ.addProductToCart(cartAdd, prd, user);
				}else {
					User newCustomer = new User();
					newCustomer.setEmail(email);
					usrServ.save(newCustomer);
					Product prd = prdServ.findByProductId(cartAdd.getProductId()).get();
					newCart = cartServ.addProductToCart(cartAdd, prd, newCustomer);
				}
			}
			if (newCart!=null&&selected==null) {
				return new ResponseEntity<>(newCart, HttpStatus.OK);
			} else if(newCart==null&&selected!=null) {
				return new ResponseEntity<>(selected, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
			}
		} catch (Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	//not working, need to change something in the service i believe
	// SOLVED
	@PutMapping("/update/{email}")
	public ResponseEntity<Cart> updateCartItem(@RequestBody AddToCartDto cartAdd, @PathVariable String email){
		try {
			Cart item = cartServ.findCartByUserAndProductId(email, cartAdd.getProductId()).get();
			
			//System.out.println(item.getProduct().getName());
			//System.out.println("quantity update: " + item.getQuantity());
			//System.out.println("product stock: " + item.getProduct().getStock());
			
			int stock = item.getProduct().getStock();
			int quantity = cartAdd.getQuantity();
			//System.out.println(quantity +"<="+stock );
			
			if (quantity <= stock) {
				item.setQuantity(cartAdd.getQuantity());
				cartServ.save(item);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
			}
			
			if (quantity<=0) {
				cartServ.deleteCartItem(item.getId());
			}
			return new ResponseEntity<>(item, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("/delete/{cartItemId}")
	public ResponseEntity<HttpStatus> deleteCartItem(@PathVariable Integer cartItemId) {
		try {
			cartServ.deleteCartItem(cartItemId);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (NoSuchElementException e) {
			System.out.println(e.getStackTrace());
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
