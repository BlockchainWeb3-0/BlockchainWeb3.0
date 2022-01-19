import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import "./mempool.scss";
import MempoolPeer from "./MempoolPeer";

const Mempool = () => {
	const paramsMining = {
		method: "post",
		baseURL: "http://localhost:3001",
		url: "/mineBlock",
		data: {
			address:
				"04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4",
		},
	};
	const paramsMining2 = {
		method: "post",
		baseURL: "http://localhost:3002",
		url: "/mineBlock",
		data: {
			address:
				"04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4",
		},
	};
	const paramsMining3 = {
		method: "post",
		baseURL: "http://localhost:3003",
		url: "/mineBlock",
		data: {
			address:
				"04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4",
		},
	};
	const mining = async (params) => {
		const result = await axios(params);
	};

	const txPool = useAxios({
		method: "get",
		baseURL: "http://localhost:3001",
		url: "/transactionPool",
	});

	const handleOnClick = () => {
		mining(paramsMining);
    window.location.reload();
	};
  
	const handleOnClick2 = () => {
    mining(paramsMining2);
    window.location.reload();
	};
  
	const handleOnClick3 = () => {
    mining(paramsMining3);
    window.location.reload();
	};

	return (
		<div className="mempool-container">
			<div>
				<h1>Mempool</h1>
				<h3>where to store Unconfirmed Transactions</h3>
			</div>
			<div className="mempool-peer-container">
				<MempoolPeer data={txPool.data} handleOnClick={handleOnClick} loading={txPool.loading} />
				<MempoolPeer data={txPool.data} handleOnClick={handleOnClick2} loading={txPool.loading} />
				<MempoolPeer data={txPool.data} handleOnClick={handleOnClick3} loading={txPool.loading} />
			</div>
		</div>
	);
};



export default Mempool;
