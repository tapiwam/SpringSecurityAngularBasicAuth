package com.tmaruni.angular.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
 
@Transactional
public abstract class AbstractDao {
 
    @Autowired
    private SessionFactory sessionFactory;
 
    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }
 
    public void persist(Object entity) {
        getSession().persist(entity);
    }
    
    public void save(Object entity) {
        getSession().saveOrUpdate(entity);
    }
 
    public void delete(Object entity) {
        getSession().delete(entity);
    }
    
    public void flushSession() {
        getSession().flush();
    }
}