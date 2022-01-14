import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';

const Mempool = ({txData}) => {
  const paramsMining = {
    method: "post",
    baseURL: "http://localhost:3001",
    url: "/mineBlock",
    data: {data:[{tx:"test"}] }
  }
  const mining = async (params) => {
    const result = await axios(params);
  };
  
  const { data, loading, error } = useAxios({
    method: "get",
    baseURL: "http://localhost:3001",
    url: "/transactionPool",
  });
  
  const handleOnClick = () => {
    mining(paramsMining);
  }


  return (
    <div className='mempool-container'>
      <div>
        <h1>Mempool</h1>
        <h3>where to store Unconfirmed Transactions</h3>
      </div>
      <div>
        {loading? <h1>Loading...</h1> : data.map((tx, index) => <Transaction key={tx.id} tx={tx}/>)}
      </div>
      <div>
        <Button onClick={handleOnClick}>Mining</Button>
      </div>
    </div>
  )
}

const Transaction = ({tx}) => {
  return (
    <div>
      {tx.id}
    </div>
  )
}


export default Mempool
