package com.capstone.payload;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
	private String name;
	private String description;
	private String image;
	private double price;
	private int stock;
	private Set<String> categories;

}
