package com.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.model.Product;
import com.capstone.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository repo;
	
	public Product save(Product prd) {
		return repo.save(prd);
	}
	
	public List<Product> listAllPrds(){
		return repo.findAll();
	}
	
	public Product addProduct(Product prd) {
		return repo.save(prd);
	}
	
	public Optional<Product> findByProductId(Integer id){
		return repo.findById(id);
	}
	
	public Product decreaseStock(Integer prdId, int quantity) {
		Product prd = repo.findById(prdId).get();
		System.out.println(prd.getName());
		int prdStock = prd.getStock();
		int newStock = prdStock - quantity;
		System.out.println("prdStock: "+prdStock+" new stock: "+newStock);
		System.out.println(newStock+">-1");
		if (newStock>-1) {
			prd.setStock(newStock);
			Product updatedPrd = repo.save(prd); 
			return updatedPrd;
		} else {
			return null;
		}
	}
	
	public Product increaseStock(Integer prdId, int quantity) {
		Product prd = repo.findById(prdId).get();
		int prdStock = prd.getStock();
		int newStock = prdStock + quantity;
		prd.setStock(newStock);
		return repo.save(prd);
	}
	
	public void deleteProductById(Integer id) {
		repo.deleteById(id);
	}
	
	public boolean productExistsById(Integer id) {
		return repo.existsById(id);
	}
}
