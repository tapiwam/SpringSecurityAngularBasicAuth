package com.tmaruni.angular.dao;

import java.util.List;

import com.tmaruni.angular.models.User;

public interface UserDao {
	List<User> findAllUsers();
	User findByUserName(String username);
	User findByUserId(Integer id);
	User saveUser(User user);
	User saveUser(User user, String role);
	void deleteUser(User user);
	
}
