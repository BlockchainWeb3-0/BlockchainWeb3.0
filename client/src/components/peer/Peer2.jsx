import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const Peer2 = () => {
	const [peerPort, setPeerPort] = useState("6001");

	const getPeers = async () => {
		const params = {
			method: "get",
			baseURL: "http://localhost:3002",
			url: "/peers",
		};
		const result = await axios.request(params);
		console.log("Connected peers : ", result.data);
	};

	const addPeers = () => {
		const peerList = peerPort.split(" ");
		peerList.forEach(async (peer) => {
			const params = {
				method: "post",
				baseURL: "http://localhost:3002",
				url: "/addPeer",
				data: { data: [`ws://localhost:${peer}`] },
			};
			const result = await axios.request(params);
			console.log("Add peers : ", result.data);
		});
	};

	const textOnChange = (e) => {
		setPeerPort(e.target.value);
	};

	return (
		<div>
			<h1>Peer2 (Port: 3002, 6002)</h1>
			<div>
				<Button onClick={getPeers}>Get Peers</Button>
			</div>
			<div>
				<TextField
					required
					label="Peer Port"
					variant="standard"
					helperText="Using space to add multiple peers (ex. 6002 6003)"
					name="port"
					onChange={textOnChange}
				/>
				<Button onClick={addPeers}>Add Peers</Button>
			</div>
		</div>
	);
};

export default Peer2;
