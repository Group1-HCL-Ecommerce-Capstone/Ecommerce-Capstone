package com.capstone.payload.dto;

import java.util.List;

import com.capstone.model.Address;
import com.capstone.model.Cart;
import com.capstone.model.OrderItem;
import com.capstone.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
	private int id;
	private double totalPrice;
	private int totalQuantity;
	private Address address;
	private User user;
	private List<Cart> carts;
	private List<OrderItem> orderedItems;
}
