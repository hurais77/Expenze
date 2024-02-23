import { createContext, useState } from 'react'
import axios from 'axios'


const ExpenseContext = createContext({
    expenses:[],
    getExpenses:()=>{}
})

export const ExpenseContextProvider = (props) =>
{
    const [expenses, setExpenses] = useState([])

  const getExpenses = async(year=2024)=>
  {
    const userId = localStorage.getItem("user_id")
    const res = await axios.get(`http://localhost:8080/expenses/users?userId=${userId}&year=${year}`)
    setExpenses(res.data)
  }

  return (
    <ExpenseContext.Provider value={{expenses:expenses, getExpenses:getExpenses}}>
        {props.children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseContext