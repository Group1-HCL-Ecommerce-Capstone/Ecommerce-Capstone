package com.capstone.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.model.Category;
import com.capstone.model.Product;
import com.capstone.repository.CategoryRepository;
import com.capstone.repository.ProductRepository;
import com.capstone.service.CategoryService;
import com.capstone.service.ProductService;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "https://ecommerce-capstone-fe.azurewebsites.net/")
public class CategoryController {
	@Autowired
	CategoryService catService;
	
	@Autowired
	ProductService prdService;
	
	@Autowired
	private ProductRepository prdRepo;
	
	@Autowired
	private CategoryRepository catRepo;

	@GetMapping("/all")
	public ResponseEntity<List<Category>> listOfAllCategories(){
		try {
			List<Category> allCategories = catService.listAllCategories();
			if(allCategories.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(allCategories, HttpStatus.OK);
			}
		} catch(Exception e){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/product_categories/{prdId}")
	public ResponseEntity<List<Category>> findCategoriesUnderProductId(@PathVariable Integer prdId){
		try {
			List<Category> categories = catRepo.findCategoriesByProductsId(prdId);
			return new ResponseEntity<>(categories, HttpStatus.OK);
		}catch (NoSuchElementException e){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<Optional<Category>> findCategoriesById(@PathVariable Integer id){
		try {
			Optional<Category> categories = catService.findByCategoryId(id);
			return new ResponseEntity<>(categories, HttpStatus.OK);
		}catch (NoSuchElementException e){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/products_under_category/{catId}")
	public ResponseEntity<List<Product>> findProductsInCategory(@PathVariable Integer catId){
		try {
			List<Product> products = prdRepo.findProductsByCategoriesId(catId);
			return new ResponseEntity<>(products, HttpStatus.OK);
		} catch (NoSuchElementException e){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("remove/{id}")
	@PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteCategoryById(@PathVariable Integer id){
		try {
			// checks if the category is associated with any product before deleting
			if (prdRepo.findProductsByCategoriesId(id).isEmpty()==false) {
				return new ResponseEntity<>(HttpStatus.CONFLICT);
			} else {
				catService.deleteCategoryById(id);
				return new ResponseEntity<>(HttpStatus.OK);
			}
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
