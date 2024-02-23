package com.expensetracker.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    public String name;

    public int userid;

    @Enumerated(EnumType.STRING)
    public Type type;
    public double cost;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    public Date date;

    public Expense(String name, Type type, double cost, Date date) {
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.date = date;
    }
}
