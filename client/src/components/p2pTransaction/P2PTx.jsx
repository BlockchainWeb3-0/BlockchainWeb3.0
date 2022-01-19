import React from "react";
import P2PTransaction from "./P2PTransaction";
import { Accordion, Dropdown } from "react-bootstrap";


const P2PTx = () => {
    const peer1 = [
        3001,
        "042b69d0cfaadaa495939ba003a0e2ecc5789f45bf7acbcbacae6b12f715bf6723aee9e5394073da0d4aab396d45a95a8e2743555fd481628d5b2aab9260b7ca58",
        "86553614792039118642001270348255601479134702090617936093393646792708903149622",
    ]
    const peer2 = [
        3002,
        "044c7119c90a9fd2d314cec6a6c709e69d2e05315a4a4319c00ad6446e4ba2358ecb4b80660912005555a9a8d20d4c6886003f093cb5fe7140f87ad04e1b1533b6",
        "52447762678652654914796915985673390078711526330616609617610179370485350405474",
    ]
    const peer3 = [
        3003,
        "046e4f997621d59bd91768fababa987d13cafb73cb41a6c51fc736db383193b2f27f0d07c7f6a981f412505d79099f74dfffe830e0e212b275847e743b3e56262a",
        "46194838708066668511445521978793986733598376029259807422132755061347252520593",
    ]

    return (
			<div>
				<Accordion defaultActiveKey="0">
					<Accordion.Item eventKey="0">
						<Accordion.Header>Peer1</Accordion.Header>
						<Accordion.Body>
							<P2PTransaction peer={peer1} />
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1"> 
						<Accordion.Header>Peer2</Accordion.Header>
						<Accordion.Body>
							<P2PTransaction peer={peer2} />
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<Accordion.Header>Peer3</Accordion.Header>
						<Accordion.Body>
							<P2PTransaction peer={peer3} />
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</div>
		);
};

export default P2PTx;
