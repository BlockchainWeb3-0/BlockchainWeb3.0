import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';

const Mempool = () => {

  const paramsMining = {
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: '/mineBlock',
    data : { address: "04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4"},
  };
  const paramsMining2 = {
    method: 'post',
    baseURL: 'http://localhost:3002',
    url: '/mineBlock',
    data : { address: "04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4"},
  };
  const paramsMining3 = {
    method: 'post',
    baseURL: 'http://localhost:3003',
    url: '/mineBlock',
    data : { address: "04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4"},
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
