package com.tmaruni.angular.service;

import java.security.Principal;
import java.util.List;

import com.tmaruni.angular.models.User;

public interface UserService {

	public List<User> findAllUsers();
	public User saveUser(User user);
	public void deleteUser(User user);
	public Principal saveUserAndLogin(User user);
}