import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const Yourkey = () => {
    const [privatekey, setPrivatekey] = useState("");
    useEffect(async () => {
        const response = await axios.get("/api/user/privatekey");
        setPrivatekey(response.data.key);
    });
    return (
        <>
            <div>This is your private key!</div>
            <div>aa</div>
        </>
    );
};

export default Yourkey;
