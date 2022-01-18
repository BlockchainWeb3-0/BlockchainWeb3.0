import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';

const Mempool = ({ txData }) => {
  const paramsMining = {
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: '/mineBlock',
    data: { data: [{ tx: 'test' }] },
  };
  const paramsMining2 = {
    method: 'post',
    baseURL: 'http://localhost:3002',
    url: '/mineBlock',
    data: { data: [{ tx: 'asdf' }] },
  };
  const paramsMining3 = {
    method: 'post',
    baseURL: 'http://localhost:3003',
    url: '/mineBlock',
    data: { data: [{ tx: 'third' }] },
  };
  const mining = async (params) => {
    const result = await axios(params);
  };

  const { data, loading, error } = useAxios({
    method: 'get',
    baseURL: 'http://localhost:3001',
    url: '/transactionPool',
  });

  const handleOnClick = () => {
    mining(paramsMining);
  };

  const handleOnClick2 = () => {
    mining(paramsMining2);
  };

  const handleOnClick3 = () => {
    mining(paramsMining3);
  };

  return (
    <div className="mempool-container">
      <div>
        <h1>Mempool</h1>
        <h3>where to store Unconfirmed Transactions</h3>
      </div>
      <div>{loading ? <h1>Loading...</h1> : data.map((tx, index) => <Transaction key={tx.id} tx={tx} />)}</div>
      <div style={{ marginBottom: 20 }}>
        <Button onClick={handleOnClick}>Mining3001</Button>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Button onClick={handleOnClick2}>Mining3002</Button>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Button onClick={handleOnClick3}>Mining3003</Button>
      </div>
    </div>
  );
};

const Transaction = ({ tx }) => {
  return <div>{tx.id}</div>;
};

export default Mempool;
