import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import "./mempool.scss";
import MempoolPeer from "./MempoolPeer";

import { useCookies } from "react-cookie";

import jwtDecode from "jwt-decode";
import _ from "lodash";

const Mempool = () => {
    const [tokenUser, setTokenUser, removeCookie] = useCookies(["x_auth"]);
    const [user, setUser] = useState("");
    const address =
        "04875a5ee53110a1ce856f2fc549671456afcc62a510d96cb8e05ca0cb65f78c0b1fb880db8ac195cee93d2d6eff917e795f224d63a2c73319b1ce1e42f27395a4";
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
        const result = await axios(params);
    };

    const getTxPool = async (port) => {
        const params = getTxPoolParams(port);
        const txPoolData = await axios(params);
        return txPoolData.data;
    };

	const txPool = useAxios(getTxPoolParams(3001));
	const txPool2 = useAxios(getTxPoolParams(3002));
	const txPool3 = useAxios(getTxPoolParams(3003));

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
                    data={txPool.data}
                    port={3001}
                    handleOnClick={() => miningClick(3001, address)}
                    loading={txPool.loading}
                />
                <MempoolPeer
                    data={txPool2.data}
                    port={3002}
                    handleOnClick={() => miningClick(3002, address)}
                    loading={txPool2.loading}
                />
                <MempoolPeer
                    data={txPool3.data}
                    port={3003}
                    handleOnClick={() => miningClick(3002, address)}
                    loading={txPool3.loading}
                />
            </div>
        </div>
    );
};

export default Mempool;
