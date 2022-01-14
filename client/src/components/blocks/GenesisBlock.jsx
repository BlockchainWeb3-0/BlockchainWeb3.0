import React from "react";
import "./GenesisBlock.scss"

const GenesisBlock = ({blockInfo}) => {
	return (
		<>
			<div className="genesisBlock">
        {blockInfo.header.index}
				<div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</>
	);
};

export default GenesisBlock;
