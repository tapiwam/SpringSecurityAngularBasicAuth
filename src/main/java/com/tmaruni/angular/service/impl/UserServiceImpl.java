package com.tmaruni.angular.service.impl;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tmaruni.angular.dao.UserDao;
import com.tmaruni.angular.models.User;
import com.tmaruni.angular.service.UserService;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {
 
	@Autowired
	private UserDao userDao;
	
	@Autowired
	@Qualifier("userDetailsService")
	UserDetailsService userDetailsService;

	public User saveUser(User user){
		return userDao.saveUser(user);
	}

	public void deleteUser(User user) {
		// TODO Auto-generated method stub
		
	}

	public Principal saveUserAndLogin(User user) {
		// TODO Auto-generated method stub
		
		// saveUser(user);
		// userDetailsService.loadUserByUsername(user.getUsername());
		return null;
	}

	@Override
	public List<User> findAllUsers() {
		return userDao.findAllUsers();
	}
	
	
 
}