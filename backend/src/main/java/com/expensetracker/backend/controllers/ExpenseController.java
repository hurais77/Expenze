package com.expensetracker.backend.controllers;

import com.expensetracker.backend.entity.Expense;
import com.expensetracker.backend.entity.Type;
import com.expensetracker.backend.repository.ExpenseRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"},
        allowCredentials = "true",
        maxAge = 3600,
        allowedHeaders = "*",
        methods= {RequestMethod.GET,RequestMethod.POST,
                RequestMethod.DELETE, RequestMethod.PUT,
                RequestMethod.PATCH, RequestMethod.OPTIONS,
                RequestMethod.HEAD, RequestMethod.TRACE})
@RequestMapping("/expenses")
public class ExpenseController {
    ExpenseRepository expenseRepository;

    @Autowired
    ExpenseController(ExpenseRepository expenseRepository1)
    {
        expenseRepository=expenseRepository1;
    }

    @GetMapping("")
    public List<Expense> getExpenses(HttpServletResponse response)
    {
        Cookie cookie = new Cookie("hi","check");
        response.addCookie(cookie);

        return expenseRepository.findAllByOrderByDateDesc();
    }
    @PostMapping("")
    public Expense addExpense(@RequestBody Expense expense)
    {
        return expenseRepository.save(expense);
    }

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Integer id)
    {
        Optional<Expense> expense = expenseRepository.findById(id);
        if(expense.isPresent())
            return expense.get();
        else
            throw new RuntimeException("Couldn't find Employee with Id - "+id);

    }

    @GetMapping("/type={type}")
    public List<Expense> getExpensesByType(@PathVariable Type type)
    {
        return expenseRepository.findByType(type);
    }

    @GetMapping("/month={month}")
    public List<Expense> getExpensesByMonth(@PathVariable String month)
    {
        return expenseRepository.findByMonth(month);
    }
    @GetMapping("/year={year}")
    public List<Expense> getExpensesByYear(@PathVariable String year)
    {
        return expenseRepository.findByYear(year);
    }


    @GetMapping("/user/{user_id}")
    public List<Expense> getExpensesByUserId(@PathVariable("user_id") int userId)
    {
        return expenseRepository.findByUseridOrderByDateDesc(userId);
    }

    @GetMapping("/users")
    public List<Expense> getExpensesByMonthYear(@RequestParam String year, @RequestParam int userId)
    {
        return expenseRepository.findByUseridAndYearOrderByDateDesc(userId, year);
    }
    @GetMapping("/filter")
    public List<Expense> getExpensesByMonthYear(@RequestParam String month,
                                         @RequestParam String year)
    {
        return expenseRepository.findByYearAndMonth(year, month);
    }



}
