package com.capstone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.model.Address;

public interface AddressRepository extends JpaRepository<Address, Integer>{
	List<Address> findAddressByUserEmail(String email);
	Optional<Address> findByStreetAndCityAndState(String street, String city, String state);
}
