package com.capstone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{
	List<Order> findAllByUserUserIdOrderByDateOrderedDesc(Integer userId);
	List<Order> findAllByUserEmailOrderByDateOrderedDesc(String email);
}
