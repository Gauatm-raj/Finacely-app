import { Row,Card } from 'antd'
import React, { useState } from 'react'
import Button from '../Button/Button'
import "./style.css";

const Cards = ({showIncome,showExpense,income,exp,totalInc}) => {
 

  return (
    <>
      <Row className='my-row'>
      <Card title="Current Balance" className="my-card">
      <p>Rs {totalInc}</p>
         <Button text={"Reset Balance"} blue={true}  />
       </Card>
       <Card title="Total Income" className="my-card">
      <p>Rs {income}</p>
         <Button text={"Add Income"} blue={true} onClick={showIncome} />
       </Card>
       <Card title="Total Expense" className="my-card">
      <p>Rs {exp}</p>
         <Button text={"Add Expense"} blue={true} onClick={showExpense} />
       </Card>
      </Row>
    </>
  )
}

export default Cards