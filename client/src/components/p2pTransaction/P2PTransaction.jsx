import "./P2PTransaction.scss";
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ec } from "elliptic";

const EC = new ec("secp256k1");

const P2PTransaction = ({ peer }) => {
    const port = peer[0];
    const initPublickey = peer[1];
    const initPrivatekey = peer[2];
	const [publickey, setPublickey] = useState(initPublickey);
	const [privatekey, setPrivatekey] = useState(initPrivatekey);
	const [receiverAddress, setReceiverAddress] = useState(1);
	const [amount, setAmount] = useState(1);
    
    const renewWalletKeys = () => {
        const peerWalletKeys = generatePeerWallet();
        setPublickey(peerWalletKeys[0])
        setPrivatekey(peerWalletKeys[1])
    }

	const params = {
		method: "post",
		baseURL: `http://localhost:${port}`,
		url: "/p2psendtransaction",
		data: {
			TxInAddress: publickey,
			TxOutAddress: receiverAddress,
			amount: amount,
			sign: privatekey,
		},
	};

	const addTx = async () => {
		const result = await axios.request(params);
	};

	const textOnPublickey = (e) => {
		setPublickey(e.target.value);
	};
    const textOnPrivateKey = (e) => {
        setPrivatekey(e.target.value);
    };
	const textOnReceiverAddress = (e) => {
		setReceiverAddress(parseInt(e.target.value));
	};
	const textOnAmount = (e) => {
		setAmount(parseInt(e.target.value));
	};

	return (
		<div className="transaction_container">
			<div className="transaction_title">Port {port}</div>
			<div className="transaction_textField">
				<TextField
					required
					label="Wallet Address"
					variant="standard"
					name="address"
					onChange={textOnPublickey}
					sx={{ width: "100%", displayPrint: "block" }}
                    value={publickey}
				/>
				<TextField
					required
					label="PrivateKey"
					variant="standard"
					name="privatekey"
					onChange={textOnPrivateKey}
					sx={{
						width: "100%",
						displayPrint: "block",
						marginTop: "20px",
					}}
                    value={privatekey}
				/>
				<TextField
					required
					label="ReceiverAddress"
					variant="standard"
					name="receiverAddress"
					onChange={textOnReceiverAddress}
					sx={{
						width: "100%",
						displayPrint: "block",
						marginTop: "20px",
					}}
				/>
				<TextField
					required
					label="Amount"
					variant="standard"
					name="amount"
					onChange={textOnAmount}
					sx={{
						width: 200,
						displayPrint: "block",
						marginTop: "20px",
					}}
				/>
				<Button onClick={addTx} className="transaction_submit_btn">
					Add Transaction
				</Button>
				<Button onClick={renewWalletKeys} variant="danger" className="transaction_renew_btn">
					New Wallet address
				</Button>
			</div>
		</div>
	);
};

const generatePeerWallet = () => {
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    const key = EC.keyFromPrivate(privateKey, "hex");
    const publicKey = key.getPublic().encode("hex", false);

    return [publicKey, privateKey];
}

export default P2PTransaction;
