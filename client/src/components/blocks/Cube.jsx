import React from "react";
import "./Cube.scss"

const Cube = ({blockInfo}) => {
	return (
		<>
			<div className="cube">
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

export default Cube;
