import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const Peer1 = () => {
    const [peerPort, setPeerPort] = useState("6003");
    const [statePeers, setStatePeers] = useState([]);

    const getPeers = async () => {
        const params = {
            method: "get",
            baseURL: "http://localhost:3002",
            url: "/peers",
        };
        const result = await axios.request(params);
        //console.log("Connected peers : ", result.data);
        setStatePeers(result.data);
    };
    console.log(statePeers);

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
        <div className="peer_container">
            <div className="peer_name">Peer2</div>
            <div className="peer_port">(Port: 3002, Peer: 6002)</div>
            <div className="peer_getPeers">
                <Button onClick={getPeers}>Get Peers</Button>
                {statePeers.join(" , ")}
            </div>
            <div className="peer_textField">
                <TextField
                    required
                    label="Peer Port default : 6003"
                    variant="standard"
                    helperText="Using space to add multiple peers (ex. 6001 6003)"
                    name="port"
                    onChange={textOnChange}
                />
                <Button onClick={addPeers}>Add Peers</Button>
            </div>
        </div>
    );
};

export default Peer1;
