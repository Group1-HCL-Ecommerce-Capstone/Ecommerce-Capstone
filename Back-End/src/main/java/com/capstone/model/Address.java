package com.capstone.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Addresses")
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "address_id")
	private int id;
	private String street;
	private String city;
	
	@Size(max = 6)
	private String state;
	
	@Size(max=3)
	private String country;
	
	@Size(max=15)
	private String zipcode;
	
	private String phone;
	
	@ManyToOne
	@JoinColumn(name ="user_id")
	private User user;
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "address")
	private List<Order> orders;

	public Address(String street, String city, @Size(max = 6) String state, @Size(max = 3) String country,
			@Size(max = 15) String zipcode, String phone, User user) {
		this.street = street;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipcode = zipcode;
		this.phone = phone;
		this.user = user;
	}
	
	
	
}
