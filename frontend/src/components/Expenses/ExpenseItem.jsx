import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{props.name}</h2>
        <div className='expense-item__price'>Rs.{props.cost}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
