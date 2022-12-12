package com.capstone.controller;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.model.Category;
import com.capstone.model.Product;
import com.capstone.payload.ProductRequest;
import com.capstone.repository.CategoryRepository;
import com.capstone.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200/")
public class ProductController {
	@Autowired
	ProductService prdService;
	@Autowired
	CategoryRepository catRepo;

	@GetMapping("/all")
	//@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Product>> listOfAllProducts() {
		try {
			List<Product> allProducts = prdService.listAllPrds();
			if (allProducts.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(allProducts, HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/find/{id}")
	public ResponseEntity<Optional<Product>> selectProductById(@PathVariable Integer id) {
		try {
			Optional<Product> foundProduct = prdService.findByProductId(id);
			return new ResponseEntity<>(foundProduct, HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/add")
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<Product> registerProduct(@RequestBody ProductRequest prdReq) {
		try {
			Product registeredProduct = new Product(prdReq.getName(), prdReq.getDescription(), prdReq.getImage(),
					prdReq.getPrice(), prdReq.getStock());
			Set<String> catRequest = prdReq.getCategories();
			Set<Category> categories = new HashSet<>();
			if (catRequest == null) {
				registeredProduct.setCategories(categories);
			} else {
				catRequest.forEach(cat -> {
					// System.out.println(cat);
					if (catRepo.existsByCategoryName(cat)) {
						Category existingCat = catRepo.findByCategoryName(cat);
						categories.add(existingCat);
					} else {
						Category newCat = new Category(cat);
						categories.add(newCat);
					}
				});
			}
			registeredProduct.setCategories(categories);
			prdService.addProduct(registeredProduct);
			return new ResponseEntity<>(registeredProduct, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PatchMapping("/update/{id}")
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody ProductRequest prdReq) {
		try {
			Product databaseProduct = prdService.findByProductId(id).get();
			if (Objects.nonNull(prdReq.getName())) {
				databaseProduct.setName(prdReq.getName());
			}
			if (Objects.nonNull(prdReq.getDescription())) {
				databaseProduct.setDescription(prdReq.getDescription());
			}
			if (Objects.nonNull(prdReq.getImage())) {
				databaseProduct.setImage(prdReq.getImage());
			}
			// This is not working the way i like, since the default for double,
			// ints (and sets i presume) is not null, if i dont fill out the
			// request, it changes the values to the defaults
			// SOLVED

			// with the way i have it, you cannot update the price to be $0 or have 0 stock
			if (Objects.nonNull(prdReq.getPrice()) && prdReq.getPrice()>0.0) {
				databaseProduct.setPrice(prdReq.getPrice());
			}
			if (Objects.nonNull(prdReq.getStock()) && prdReq.getStock()>0) {
					databaseProduct.setStock(prdReq.getStock());
			}
			// need to implement category updating
			// SOLVED
			if (Objects.nonNull(prdReq.getCategories())&& !prdReq.getCategories().isEmpty()) {
				Set<String> catRequest = prdReq.getCategories();
				Set<Category> categories = new HashSet<>();
				if (catRequest != null) {
					catRequest.forEach(cat -> {
						if (catRepo.existsByCategoryName(cat)) {
							Category existingCat = catRepo.findByCategoryName(cat);
							categories.add(existingCat);
						} else {
							Category newCat = new Category(cat);
							categories.add(newCat);
						}
					});
					databaseProduct.setCategories(categories);
				}
			}
			return new ResponseEntity<>(prdService.save(databaseProduct), HttpStatus.OK);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasAuthority('Admin')")
	public ResponseEntity<HttpStatus> deleteProductById(@PathVariable Integer id) {
		try {
			Product prd = prdService.findByProductId(id)
									.orElseThrow(()-> new RuntimeException("Error: Product not found"));
			prd.setCategories(null);
			prdService.deleteProductById(id);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (NoSuchElementException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
