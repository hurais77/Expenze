package com.expensetracker.backend.repository;

import com.expensetracker.backend.entity.Expense;
import com.expensetracker.backend.entity.Type;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    public List<Expense> findByType(Type type);
    public List<Expense> findAllByOrderByDateDesc();

    public List<Expense> findByUseridOrderByDateDesc(Integer userid);

    @Query("SELECT e FROM Expense e WHERE YEAR(date)=:year AND userid=:userId ORDER BY date DESC")
    public List<Expense> findByUseridAndYearOrderByDateDesc(@Param("userId") int userId, @Param("year") String year);

    @Query("SELECT e FROM Expense e WHERE MONTH(date)=:month")
    public List<Expense> findByMonth(@Param("month") String month);

    @Query("SELECT e FROM Expense e WHERE YEAR(date)=:year")
    public List<Expense> findByYear(@Param("year") String year);

    @Query("SELECT e FROM Expense e WHERE YEAR(date)=:year AND MONTH(date)=:month")
    public List<Expense> findByYearAndMonth(@Param("year") String year, @Param("month") String month);

}
