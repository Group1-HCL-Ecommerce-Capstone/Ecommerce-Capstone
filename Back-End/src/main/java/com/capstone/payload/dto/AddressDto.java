package com.capstone.payload.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
	
	private String street;
	private String city;
	
	@Size(max = 6)
	private String state;
	
	@Size(max=3)
	private String country;
	
	@Size(max=15)
	private String zipcode;
	private String phone;
}
