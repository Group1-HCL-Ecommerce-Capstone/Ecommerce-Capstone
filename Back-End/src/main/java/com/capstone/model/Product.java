package com.capstone.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//@ToString
@Entity
@Table(name="Products")
public class Product {
	@Id
	@Column(name = "prd_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String description;
	private String image;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(
			name = "Products_To_Categories",
			joinColumns = @JoinColumn(name = "prd_id"),
			inverseJoinColumns = @JoinColumn(name = "cat_id"))
	private Set<Category> categories = new HashSet<>();
	private double price;
	private int stock;
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private List<Cart> carts;
	
	
	public Product(String name, String description, String image, Set<Category> categories, double price, int stock) {
		this.name = name;
		this.description = description;
		this.image = image;
		this.categories = categories;
		this.price = price;
		this.stock = stock;
	}
	public Product(String name, String description, String image, double price, int stock) {
		this.name = name;
		this.description = description;
		this.image = image;
		this.price = price;
		this.stock = stock;
	}

}
