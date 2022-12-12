package com.capstone.payload.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {
	private List<CartItemDto> cartItems;
	private int totalQuantity;
	private double totalPrice;
}
