package com.capstone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.model.Cart;
import com.capstone.model.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer>{
	List<Cart> findAllByUserEmail(String email);
	List<Cart> deleteByUserUserId(Integer userId);
	Optional<Cart> findCartByUserEmailAndProductId(String email, Integer prdId);
}