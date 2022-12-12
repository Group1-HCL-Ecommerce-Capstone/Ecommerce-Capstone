package com.capstone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
	List<Category> findCategoriesByProductsId(Integer productId);
	Category findByCategoryName(String category);
	boolean existsByCategoryName(String category);
}
