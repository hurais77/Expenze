import { useState } from 'react';
import axios from 'axios';
import './ExpenseForm.css';
import { ToastContainer, toast } from 'react-toastify';

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const typeChangeHandler = (event) => {
    setSelectedValue(event.target.value);
  };

  const saveData = async(expenseData) =>
  {
    console.log(expenseData)
    const res = await axios.post("http://localhost:8080/expenses", expenseData, {withCredentials:true})
    if (res.status === 200)
    {
      toast.success("Expense added Successfully")
      setEnteredTitle('');
      setEnteredAmount('');
      setEnteredDate('');
      setSelectedValue('')
    }
    
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      name: enteredTitle,
      cost: enteredAmount,
      date: new Date(enteredDate),
      type: selectedValue,
      userid : localStorage.getItem("user_id")
    }
    
    saveData(expenseData)
    
  };

  return (
    <div><form onSubmit={submitHandler}>
    <div className='new-expense__controls'>
      <div className='new-expense__control'>
        <label>Title</label>
        <input
          type='text'
          value={enteredTitle}
          onChange={titleChangeHandler}
        />
      </div>
      <div className='new-expense__control'>
        <label>Amount</label>
        <input
          type='number'
          min='0.01'
          step='0.01'
          value={enteredAmount}
          onChange={amountChangeHandler}
        />
      </div>
      <br/>

      <div className='new-expense__control'>
        <label>Type</label>
        <select value={selectedValue} onChange={typeChangeHandler}>
        <option value="" disabled></option>
       <option value="entertainment">Entertainment</option>
       <option value="food">Food</option>
       <option value="wearable">Wearable</option>
       <option value="vehicle">Vehicle</option>
       <option value="accessory">Accessory</option>
     </select>
      
      </div>
      <div className='new-expense__control'>
        <label>Date</label>
        <input
          type='date'
          min='2019-01-01'
          value={enteredDate}
          onChange={dateChangeHandler}
        />
      </div>
    </div>
    <div className='new-expense__actions'>
      <button type="button" onClick={props.onCancel}>Cancel</button>
      <button type='submit'>Add Expense</button>
    </div>
  </form>
  <ToastContainer/>
  
  </div>
    
  );
};

export default ExpenseForm;
