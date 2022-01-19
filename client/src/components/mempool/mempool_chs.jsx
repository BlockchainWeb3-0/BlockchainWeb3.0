import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";

import { useCookies } from "react-cookie";

import jwtDecode from "jwt-decode";
import _ from "lodash";

const Mempool = () => {
    const [tokenUser, setTokenUser, removeCookie] = useCookies(["x_auth"]);
    const [user, setUser] = useState("");

    const { data, loading, error } = useAxios({
        method: "get",
        baseURL: "http://localhost:3001",
        url: "/transactionPool",
    });

    if (_.isEmpty(tokenUser)) {
        return (
            <>
                <div>
                    <h1>로그인해라</h1>
                </div>
            </>
        );
    } else if (!_.isEmpty(tokenUser)) {
        const userData = jwtDecode(tokenUser.x_auth);
        console.log(userData);
        const paramsMining = {
            method: "post",
            baseURL: "http://localhost:3001",
            url: "/mineBlock",
            data: {
                address: userData.address,
            },
        };
        const paramsMining2 = {
            method: "post",
            baseURL: "http://localhost:3002",
            url: "/mineBlock",
            data: {
                address: userData.address,
            },
        };
        const paramsMining3 = {
            method: "post",
            baseURL: "http://localhost:3003",
            url: "/mineBlock",
            data: {
                address: userData.address,
            },
        };
        const mining = async (params) => {
            const result = await axios(params);
        };
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
                <div>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        data.map((tx, index) => (
                            <Transaction key={tx.id} tx={tx} />
                        ))
                    )}
                </div>
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
    }
};

const Transaction = ({ tx }) => {
    return <div>{tx.id}</div>;
};

export default Mempool;
