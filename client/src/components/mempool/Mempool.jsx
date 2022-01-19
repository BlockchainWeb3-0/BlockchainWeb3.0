import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import './mempool.scss';
import MempoolPeer from './MempoolPeer';

const Mempool = () => {
  const paramsMining = {
    method: 'post',
    baseURL: 'http://localhost:3001',
    url: '/mineBlock',
    data: {
      address: '04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4',
    },
  };
  const paramsMining2 = {
    method: 'post',
    baseURL: 'http://localhost:3002',
    url: '/mineBlock',
    data: {
      address: '04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4',
    },
  };
  const paramsMining3 = {
    method: 'post',
    baseURL: 'http://localhost:3003',
    url: '/mineBlock',
    data: {
      address: '04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4',
    },
  };
  const mining = async (params) => {
    const result = await axios(params);
  };

  const txPool = useAxios({
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

  const [intervalId, setIntervalId] = useState(0);
  const start = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }
    const newIntervalId = setInterval(() => {
      handleOnClick();
    }, 1500);
    setIntervalId(newIntervalId);
  };

  const [intervalId2, setIntervalId2] = useState(0);
  const start2 = () => {
    if (intervalId2) {
      clearInterval(intervalId2);
      setIntervalId2(0);
      return;
    }
    const newIntervalId2 = setInterval(() => {
      handleOnClick2();
    }, 1500);
    setIntervalId2(newIntervalId2);
  };

  const [intervalId3, setIntervalId3] = useState(0);
  const start3 = () => {
    if (intervalId3) {
      clearInterval(intervalId3);
      setIntervalId3(0);
      return;
    }
    const newIntervalId3 = setInterval(() => {
      handleOnClick3();
    }, 1500);
    setIntervalId3(newIntervalId3);
  };

  return (
    <div className="mempool-container">
      <div>
        <h1>Mempool</h1>
        <h3>where to store Unconfirmed Transactions</h3>
      </div>
      <div className="mempool-peer-container">
        <MempoolPeer data={txPool.data} handleOnClick={handleOnClick} loading={txPool.loading} start={start} intervalId={intervalId} />
        <MempoolPeer data={txPool.data} handleOnClick={handleOnClick2} loading={txPool.loading} start={start2} intervalId={intervalId2} />
        <MempoolPeer data={txPool.data} handleOnClick={handleOnClick3} loading={txPool.loading} start={start3} intervalId={intervalId3} />
      </div>
    </div>
  );
};

export default Mempool;
