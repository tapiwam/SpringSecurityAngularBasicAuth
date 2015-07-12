package com.tmaruni.angular.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import com.tmaruni.angular.dao.AbstractDao;
import com.tmaruni.angular.dao.UserDao;
import com.tmaruni.angular.models.User;
import com.tmaruni.angular.models.UserRole;

@Repository
public class UserDaoImpl extends AbstractDao implements UserDao {

	@SuppressWarnings("unchecked")
	public User findByUserName(String username) {
		/*
		Criteria criteria = getSession().createCriteria(User.class);
		criteria.add(Restrictions.eq("username", username));
		criteria.setMaxResults(1);
		return (User) criteria.uniqueResult();
		*/
		
		List<User> users = new ArrayList<User>();

		users = getSession().createQuery("from User where username=:uname").setString("uname", username).list();

		if (users.size() > 0) {
			return users.get(0);
		} else {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	public User findByUserId(Integer id) {
		List<User> users = new ArrayList<User>();

		users = getSession().createQuery("from User where id=:id").setInteger("id", id).list();

		if (users.size() > 0) {
			return users.get(0);
		} else {
			return null;
		}
	}

	public void deleteUser(User user) {
		delete(user);
		flushSession();
	}

	@SuppressWarnings("unchecked")
	public List<User> findAllUsers() {
		Criteria criteria = getSession().createCriteria(User.class);
		return (List<User>) criteria.list();
	}
	
	public User saveUser(User user) {
		UserRole r = new UserRole(user, "STANDARD");
		user.addRole(r);
		
		save(user);
		flushSession();
		return user;
	}

	public User saveUser(User user, String role) {
		UserRole r = new UserRole(user, role);
		user.addRole(r);
		
		save(user);
		flushSession();
		return user;
	}

}