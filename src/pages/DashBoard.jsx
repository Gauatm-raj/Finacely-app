import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Card from '../component/Cards/Cards'
import { auth, db } from "../firebase";
import AddIncome from '../component/Modals/AddIncome';
import AddExpense from '../component/Modals/AddExpense';
import moment from 'moment/moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, getDoc, getDocs, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import TransactionTable from '../component/TransactionTables/TransactionTable';
import Chart from '../component/Charts/Chart';

const DashBoard = () => {
  const[transaction,setTransaction]=useState([]);
  const [loading,setLoading]=useState(false);
  const [user]=useAuthState(auth);
  const[isExpanse,setExpanse]=useState(false);
  const[isIncome,setIncome]=useState(false);
  const[income,setInc]=useState(0);
  const[exp,setExp]=useState(0);
  const[totalInc,setTotalInc]=useState(0);

  const showExpense=()=>{
    setExpanse(true);
  }
  const CancelExpense=()=>{
    setExpanse(false);
  }

  const showIncome=()=>{
    setIncome(true);
  }
  const CancelIncome=()=>{
    setIncome(false);
  }
  const onFinish=(values,type)=>{
    const newTransaction={
      type:type,
      date:values.date.format("YYYY-MM-DD"),
      amount:parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    }
    addTransaction(newTransaction)
  }
  async function addTransaction(transaction,many){
    try {
      const docRef= await addDoc(
        collection(db,`users/${user.uid}/transactions`),
        transaction
      );
      console.log(docRef.id);
      let newArr=[];
      newArr.push(transaction);
      setTransaction(newArr);
      calcTotalBalance();
      if(!many)toast.success("Transaction added");
    } catch (error) {
      if(!many)toast.error(error);
    }
  }
  useEffect(()=>{
    fetchTransaction();
  },[user])

  function calcTotalBalance(){
    let incTotal=0;
    let expTotal=0;

    transaction.forEach((t)=>{
      if(t.type==="income"){
        incTotal+=t.amount;
      }else{
        expTotal+=t.amount;
      }
    })

    setInc(incTotal);
    setExp(expTotal);
    setTotalInc(incTotal-expTotal);
  }

  useEffect(()=>{
    calcTotalBalance();
  },[transaction])


  async function fetchTransaction(){
    setLoading(true);
    if(user){
      const q=query(collection(db,`users/${user.uid}/transactions`));
      const querySnapshot= await getDocs(q);
      let transactionArray=[];
      querySnapshot.forEach((doc)=>{
        transactionArray.push(doc.data());
      });
      console.log(transactionArray);
      setTransaction(transactionArray);
      toast.success("transaction fetched")
    }else{
      toast.error("No User");
    }
    setLoading(false);
  }
  let sortedTrans=transaction.sort((a,b)=>{
    return new Date(a.date) - new Date(b.date);
  })

  return (
    <div><Header/>
    <>
    {loading?(<p>Loading.....</p>):
    (<><Card income={income}
     totalInc={totalInc} exp={exp} showExpense={showExpense} showIncome={showIncome}/>
     {transaction.length!=0 ? <Chart sortedTrans={sortedTrans}/>:<></>}
     <br />
    <AddIncome isIncome={isIncome} onFinish={onFinish} CancelIncome={CancelIncome}/>
    <AddExpense isExpanse={isExpanse} onFinish={onFinish} CancelExpense={CancelExpense}/></>)
    }
    </>
    {transaction.length>0 ? ( <TransactionTable transaction={transaction}
    addTransaction={addTransaction} fetchTransaction={fetchTransaction}/>):(<p></p>)}
   
    </div>
  )
}

export default DashBoard