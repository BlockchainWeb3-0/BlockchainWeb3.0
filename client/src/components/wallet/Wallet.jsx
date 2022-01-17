import React, { useState } from "react";

const Wallet = ({ address }) => {
    const [walletAddress, setWalletAddress] = useState(address);

    return (
        <>
            <h1>Wallet</h1>
            <h2>Address</h2>
            {walletAddress}
            <h2>Balance</h2>
            <h2>Recent TX history</h2>
        </>
    );
};

export default Wallet;
