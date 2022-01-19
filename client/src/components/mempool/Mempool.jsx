import axios from "axios";
import React, { useEffect, useState } from "react";
import "./mempool.scss";
import MempoolPeer from "./MempoolPeer";

import _ from "lodash";

const Mempool = () => {
    const address1 =
        "04c34973f019445f48e2b6e05588006773c4daf404cf8803208ed8eac9f9b85be31d90f3d795bc23c6c92a95946b47b2e7a8d00f5a9b5c4e4968746813c3e1542e";
    const address2 =
        "0450987f08b0bc0b6edf7c484ae497b5fcfbf2ca7e6ac7efb87092df9d996ac9a23911824d377c07f14208e500005eb03526ffb8ad3ccfe3c0fe4d7a8157b2fb90";
    const address3 =
        "04edeaa78d807fe53ba04abdbd9fcd4de511675abfde44a0c4eca681a677911734dff709909cc7a928ead49e92791f8d2dd557682e11e309657cc2fb2a04fd117e";

    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [data2, setData2] = useState(undefined);
    const [loading2, setLoading2] = useState(true);
    const [data3, setData3] = useState(undefined);
    const [loading3, setLoading3] = useState(true);
    const [intervalId1, setIntervalId1] = useState(0);
    const [intervalId2, setIntervalId2] = useState(0);
    const [intervalId3, setIntervalId3] = useState(0);

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
    const start1 = (port, address, e) => {
        if (intervalId1) {
            clearInterval(intervalId1);
            setIntervalId1(0);
            return;
        }
        const newIntervalId = setInterval(() => {
            mining(getMiningParams(port, address));
        }, 1500);
        setIntervalId1(newIntervalId);
        e.preventDefault();
    };
    const start2 = (port, address, e) => {
        if (intervalId2) {
            clearInterval(intervalId2);
            setIntervalId2(0);
            return;
        }
        const newIntervalId = setInterval(() => {
            mining(getMiningParams(port, address));
        }, 1500);
        setIntervalId2(newIntervalId);
        e.preventDefault();
    };
    const start3 = (port, address, e) => {
        if (intervalId3) {
            clearInterval(intervalId3);
            setIntervalId3(0);
            return;
        }
        const newIntervalId = setInterval(() => {
            mining(getMiningParams(port, address));
        }, 1500);
        setIntervalId3(newIntervalId);
        e.preventDefault();
    };
    //clearInterval(intervalId);
    //console.log(intervalId);

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
                    start={start1}
                    address={address1}
                    intervalId={intervalId1}
                />

                <MempoolPeer
                    data={data2}
                    port={3002}
                    handleOnClick={() => miningClick(3002, address2)}
                    loading={loading2}
                    start={start2}
                    address={address2}
                    intervalId={intervalId2}
                />
                <MempoolPeer
                    data={data3}
                    port={3003}
                    handleOnClick={() => miningClick(3003, address3)}
                    loading={loading3}
                    start={start3}
                    address={address3}
                    intervalId={intervalId3}
                />
            </div>
        </div>
    );
};

export default Mempool;
