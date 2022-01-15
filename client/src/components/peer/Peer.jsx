import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

const Peer = () => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [peerPort, setPeerPort] = useState("6001");

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params);
      setData(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  const getPeers = () => {
    const params = {
      method: "get",
      baseURL: "http://localhost:3001",
      url: "/peers",
    }
    const peers = fetchData(params);
    console.log("Connected peers : ", peers);
  }

  const addPeers = () => {
    const peerList = peerPort.split(" ");
    peerList.forEach(peer => {
      const params = {
        method: "post",
        baseURL: "http://localhost:3001",
        url: "/addPeer",
        data: {"data" : [`ws://localhost:${peer}`]}
      }
      const peers = fetchData(params);
      console.log("Connected peers : ", peers);
    });
  }

	const textOnChange = (e) => {
		setPeerPort(e.target.value);
	};
	
	return (
		<div>
			<h1>Peer page!</h1>
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

export default Peer;
