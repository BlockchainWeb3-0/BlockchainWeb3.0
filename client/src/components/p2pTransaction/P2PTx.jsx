import React from "react";
import P2PTransaction from "./P2PTransaction";

const P2PTx = () => {
    return (
        <div>
            <P2PTransaction peer={3001} />
            <P2PTransaction peer={3002} />
            <P2PTransaction peer={3003} />
        </div>
    );
};

export default P2PTx;
