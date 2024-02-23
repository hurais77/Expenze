import { useContext, useEffect, useState } from 'react';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';
import ExpenseContext from '../../store/expense-context';

const Expenses = () => {
  const expenseContext = useContext(ExpenseContext)
  const [filteredYear, setFilteredYear] = useState('2024');


  useEffect(()=>
  {
    expenseContext.getExpenses(filteredYear)
  },[expenseContext.expenses])

 


  const filterChangeHandler = (selectedYear) => {
    expenseContext.getExpenses(selectedYear)
    setFilteredYear(selectedYear)
  };

  return (

        <Card className="expenses">
      
      <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={expenseContext.expenses}/>
      {
      
      expenseContext.expenses.map((item)=>
      (
        <ExpenseItem
          key={item.id}
          name={item.name}
          cost={item.cost}
          date={item.date}
        />
      ))
}
    </Card>
  );
}

export default Expenses;
