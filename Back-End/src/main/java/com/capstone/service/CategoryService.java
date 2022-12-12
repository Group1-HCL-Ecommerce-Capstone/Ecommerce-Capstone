package com.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.model.Category;
import com.capstone.model.Product;
import com.capstone.repository.CategoryRepository;
import com.capstone.repository.ProductRepository;

@Service
public class CategoryService {
	@Autowired
	private CategoryRepository repo;
	
	public Category save(Category cat) {
		return repo.save(cat);
	}
	
	public List<Category> listAllCategories(){
		return repo.findAll();
	}
	
	public Category addCategory(Category cat) {
		return repo.save(cat);
	}
	
	public Optional<Category> findByCategoryId(Integer id){
		return repo.findById(id);
	}
	
	public void deleteCategoryById(Integer id) {
		repo.deleteById(id);
	}
	
	public boolean categoryExistsById(Integer id) {
		return repo.existsById(id);
	}
	
	
}
