import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import "./mempool.scss";
import MempoolPeer from "./MempoolPeer";

import { useCookies } from "react-cookie";

import jwtDecode from "jwt-decode";
import _ from "lodash";

const Mempool = () => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [data2, setData2] = useState(undefined);
    const [loading2, setLoading2] = useState(true);
    const [data3, setData3] = useState(undefined);
    const [loading3, setLoading3] = useState(true);
    const [tokenUser, setTokenUser, removeCookie] = useCookies(["x_auth"]);
    const [miningMode, setMiningMode] = useState(false);
    const [intervalId, setIntervalId] = useState(0);

    const txPool = async () => {
        const txPoolData = await axios(getTxPoolParams(3001));
        setData(txPoolData.data);
        setLoading(false);
    };
    const txPool2 = async () => {
        const txPoolData = await axios(getTxPoolParams(3002));
        setData2(txPoolData.data);
        setLoading2(false);
    };
    const txPool3 = async () => {
        const txPoolData = await axios(getTxPoolParams(3003));
        setData3(txPoolData.data);
        setLoading3(false);
    };

    useEffect(() => {
        txPool();
        txPool2();
        txPool3();
    }, []);

    if (_.isEmpty(tokenUser)) {
        return (
            <>
                <div>
                    <h1>로그인해라</h1>
                </div>
            </>
        );
    }
    const userData = jwtDecode(tokenUser.x_auth);
    const address = userData.address;
    const getMiningParams = (port, addr) => {
        return {
            method: "post",
            baseURL: `http://localhost:${port}`,
            url: "/mineBlock",
            data: {
                address: addr,
            },
        };
    };
    const getTxPoolParams = (port) => {
        return {
            method: "get",
            baseURL: `http://localhost:${port}`,
            url: "/transactionPool",
        };
    };

    const mining = async (params) => {
        await axios(params);
    };
    const start = (port, e) => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(0);
            return;
        }
        const newIntervalId = setInterval(() => {
            mining(getMiningParams(port, address));
        }, 1500);
        setIntervalId(newIntervalId);
        e.preventDefault();
    };
    //clearInterval(intervalId);

    const miningClick = (port, address) => {
        mining(getMiningParams(port, address));
        window.location.reload();
    };

    return (
        <div className="mempool-container">
            <div>
                <h1>Mempool</h1>
                <h3>where to store Unconfirmed Transactions</h3>
            </div>
            <div className="mempool-peer-container">
                <MempoolPeer
                    data={data}
                    port={3001}
                    handleOnClick={() => miningClick(3001, address)}
                    loading={loading}
                    start={start}
                />

                <MempoolPeer
                    data={data2}
                    port={3002}
                    handleOnClick={() => miningClick(3002, address)}
                    loading={loading2}
                    start={start}
                />
                <MempoolPeer
                    data={data3}
                    port={3003}
                    handleOnClick={() => miningClick(3003, address)}
                    loading={loading3}
                    start={start}
                />
            </div>
        </div>
    );
};

export default Mempool;
