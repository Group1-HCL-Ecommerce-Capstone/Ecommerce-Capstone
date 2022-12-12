package com.capstone.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.model.Order;
import com.capstone.model.OrderItem;
import com.capstone.model.Product;
import com.capstone.model.User;
import com.capstone.payload.dto.CartDto;
import com.capstone.payload.dto.CartItemDto;
import com.capstone.repository.AddressRepository;
import com.capstone.repository.OrderItemRepository;
import com.capstone.repository.OrderRepository;
import com.capstone.repository.UserRepository;

@Service
public class OrderService {
	@Autowired
	OrderRepository orderRepo;
	
	@Autowired
	CartService cartService;
	
	@Autowired
	AddressRepository adrRepo;
	
	@Autowired
	OrderItemRepository itemRepo;
	
	@Autowired
	ProductService prdServ;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepo;
	
	// this is not working somewhere
	// SOLVED
	public Order createOrder(String email, Integer addressId) {
		CartDto cart = cartService.listCartItems(email);
		System.out.println(cart.getTotalPrice());
		List<CartItemDto> cartItems = cart.getCartItems();	
		System.out.println(cartItems.get(0));
		
		Order newOrder = new Order();
		newOrder.setDateOrdered(new Date());
		newOrder.setAddress(adrRepo.findById(addressId).get());
		newOrder.setUser(userRepo.findByEmail(email).get());
		newOrder.setStatus("ordered");
		newOrder.setTotalPrice(cart.getTotalPrice());
		newOrder.setTotalQuantity(cart.getTotalQuantity());
		newOrder.setCarts(cartService.findAllByEmail(email));
		Order savedOrder = orderRepo.save(newOrder);
		System.out.println(newOrder.toString());
		
		List<OrderItem> orderedItems = new ArrayList<>();
		for (CartItemDto item: cartItems) {
			
			System.out.println(item.getProduct().getId());
			System.out.println(item.getQuantity());
			
			Product inStock = prdServ.decreaseStock(item.getProduct().getId(), item.getQuantity());
			System.out.println(inStock.getName());
			if (inStock !=null) {
				OrderItem orderItems = new OrderItem();
				orderItems.setQuantity(item.getQuantity());
				orderItems.setProductId(item.getProduct().getId());
				orderItems.setOrder(newOrder);
				itemRepo.save(orderItems);
				orderedItems.add(orderItems);
				System.out.println(orderItems.getProductId());
			}			
		}
		
		newOrder.setOrderItems(orderedItems);
		User user = userRepo.findByEmail(email).get();
		//System.out.println(savedOrder.toString());
		cartService.deleteUserCartItemsbyId(user.getUserId());
		return savedOrder;
	}
	
	public Order save(Order order) {
		return orderRepo.save(order);
	}
	
	public List<Order> listOrders(String email){
		return orderRepo.findAllByUserEmailOrderByDateOrderedDesc(email);
	}

	public List<Order> listAllOrders(){
		return orderRepo.findAll();
	}
	
	public Order findOrder(Integer orderId) throws IllegalArgumentException {
		Optional<Order> order = orderRepo.findById(orderId);
		if (order.isPresent()) {
			return order.get();
		}
		throw new IllegalArgumentException("Order not found");
	}
}
