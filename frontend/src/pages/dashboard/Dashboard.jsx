import { useEffect, useContext } from 'react';

import Expenses from '../../components/Expenses/Expenses';
import NewExpense from '../../components/NewExpense/NewExpense'
import AuthContext from '../../store/auth-context'
import { useNavigate } from 'react-router-dom'
import { ExpenseContextProvider } from '../../store/expense-context';

const App = () => {

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    useEffect(()=>{
        if(authContext.isLoggedIn === false)
        {
            navigate('/')
        }
    },[authContext.isLoggedIn])


  return (
    <ExpenseContextProvider>
      <NewExpense/>
      <Expenses/>
    </ExpenseContextProvider>
  );
}

export default App;
