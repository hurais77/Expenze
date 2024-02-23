package com.expensetracker.backend.repository;

import com.expensetracker.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>
{
    public User findByUsername(String username);
    public User findByEmail(String email);
}
