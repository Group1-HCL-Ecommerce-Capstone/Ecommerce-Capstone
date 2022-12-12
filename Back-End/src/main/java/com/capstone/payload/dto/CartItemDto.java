package com.capstone.payload.dto;

import java.util.Set;

import javax.validation.constraints.NotNull;

import com.capstone.model.Cart;
import com.capstone.model.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
	private int id;
	private @NotNull int quantity;
	private @NotNull Product product;

	public CartItemDto(Cart cart) {
		this.setId(cart.getId());
		this.setQuantity(cart.getQuantity());
		this.setProduct(cart.getProduct());
	}
	
	@Override
	public String toString() {
		return "CartRequest{" +
			   "id="+id+
			   ", quantity="+quantity+
			   ", productName="+product.getName()+
			   "}";
	}
}
