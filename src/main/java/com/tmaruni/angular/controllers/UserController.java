package com.tmaruni.angular.controllers;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.tmaruni.angular.models.User;
import com.tmaruni.angular.service.UserService;

@RestController
public class UserController {
	@Autowired
	UserService userService;

	@RequestMapping(value="/user", method=RequestMethod.GET)
	public Principal user(Principal user) {
		System.out.println(" --> USER:  "  + user);
		return user;
	}

	@RequestMapping(value={"/signup"}, method=RequestMethod.POST)
	public Map<String, Object> signup(@RequestBody User user) {
		
		System.out.println("===============================");
		System.out.println(" ----->> NEW USER : " + user);
		System.out.println("===============================\n");
		
		Map<String, Object> model = new HashMap<String, Object>();
		
		user.setEnabled(true);
		user = userService.saveUser(user);
		
		System.out.println("===============================");
		System.out.println(" ----->> SAVED USER : " + user);
		System.out.println("===============================");
		System.out.println("ALL USERS => " + userService.findAllUsers());
		System.out.println("===============================\n");
		
		try{
			if(user.getId() > 0){
				model.put("success", 1);
				model.put("user", user);
			} else {
				model.put("error", 1);
				model.put("user", user);
			}
		} catch (Exception e){
			model.put("error", 1);
			model.put("msg", "Error with insert for DB: " + e.getMessage());
			model.put("user", user);
		} 
		
		return model;
	}
}
