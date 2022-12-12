package com.capstone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.model.Address;
import com.capstone.model.User;
import com.capstone.payload.dto.AddressDto;
import com.capstone.repository.AddressRepository;

@Service
public class AddressService {
	@Autowired
	private AddressRepository repo;
	
	@Autowired
	private UserService userServ;
	
	public Address save(Address adr) {
		return repo.save(adr);
	}
	
	public List<Address> listAllAddresses(){
		return repo.findAll();
	}
	
	public List<Address> listAllAddressesByUser(String email){
		return repo.findAddressByUserEmail(email);
	}
	
	public Address addAddress(AddressDto adr, User user) {
		Address newAdr = new Address();
		newAdr.setStreet(adr.getStreet());
		newAdr.setCity(adr.getCity());
		newAdr.setState(adr.getState());
		newAdr.setCountry(adr.getCountry());
		newAdr.setZipcode(adr.getZipcode());
		newAdr.setPhone(adr.getPhone());
		newAdr.setUser(user);
		return repo.save(newAdr);
	}
	
	public Optional<Address> findByAddressId(Integer id){
		return repo.findById(id);
	}
	
	public void deleteAddressById(Integer id) {
		repo.deleteById(id);
	}
	
	public boolean addressExistsById(Integer id) {
		return repo.existsById(id);
	}

}
