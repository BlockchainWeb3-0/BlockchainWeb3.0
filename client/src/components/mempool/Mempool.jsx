import axios from "axios";
import React, { useEffect, useState } from "react";
import "./mempool.scss";
import MempoolPeer from "./MempoolPeer";

import _ from "lodash";

const Mempool = () => {
    const address1 = "042b69d0cfaadaa495939ba003a0e2ecc5789f45bf7acbcbacae6b12f715bf6723aee9e5394073da0d4aab396d45a95a8e2743555fd481628d5b2aab9260b7ca58"
    const address2 = "044c7119c90a9fd2d314cec6a6c709e69d2e05315a4a4319c00ad6446e4ba2358ecb4b80660912005555a9a8d20d4c6886003f093cb5fe7140f87ad04e1b1533b6"
    const address3 = "046e4f997621d59bd91768fababa987d13cafb73cb41a6c51fc736db383193b2f27f0d07c7f6a981f412505d79099f74dfffe830e0e212b275847e743b3e56262a"
    
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [data2, setData2] = useState(undefined);
    const [loading2, setLoading2] = useState(true);
    const [data3, setData3] = useState(undefined);
    const [loading3, setLoading3] = useState(true);
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
                    handleOnClick={() => miningClick(3001, address1)}
                    loading={loading}
                    start={start}
                />

                <MempoolPeer
                    data={data2}
                    port={3002}
                    handleOnClick={() => miningClick(3002, address2)}
                    loading={loading2}
                    start={start}
                />
                <MempoolPeer
                    data={data3}
                    port={3003}
                    handleOnClick={() => miningClick(3003, address3)}
                    loading={loading3}
                    start={start}
                />
            </div>
        </div>
    );
};

export default Mempool;
