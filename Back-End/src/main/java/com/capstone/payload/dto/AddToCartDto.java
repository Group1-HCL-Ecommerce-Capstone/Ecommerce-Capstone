package com.capstone.payload.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.capstone.model.Cart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddToCartDto {
	private int id;
	private @NotNull int quantity;
	private @NotNull int productId;
	
}