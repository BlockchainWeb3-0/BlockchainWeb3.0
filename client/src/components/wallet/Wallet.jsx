import React, { useState } from "react";

const Wallet = ({ address, balance }) => {
    const [walletAddress, setWalletAddress] = useState(address);
    const [walletBalance, setWalletBalance] = useState(balance);

    return (
        <>
            <h1>Wallet</h1>
            <h2>Address</h2>
            {walletAddress}
            <h2>Balance</h2>
            {walletBalance}
        </>
    );
};

export default Wallet;
