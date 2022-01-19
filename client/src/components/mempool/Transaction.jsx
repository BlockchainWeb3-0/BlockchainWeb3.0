import React from 'react'
import { Accordion } from 'react-bootstrap'
import TxIn from './TxIn'
import TxOut from './TxOut'

const Transaction = ({tx, index}) => {
  return (
    <Accordion defaultActiveKey="0" >
			<Accordion.Item eventKey={index}>
				<Accordion.Header>Transaction #{index}</Accordion.Header>
				<Accordion.Body>
					Transaction Id : {tx.id}
          <h3>Transaction Inputs</h3>
          {tx.txIns.map((txIn, index) => <TxIn key={index} txIn={txIn} index={index}/> )}
          <h3>Transaction Outputs</h3>
          {tx.txOuts.map((txOut, index) => <TxIn key={index} txOut={txOut}/> )}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
  )
}

export default Transaction
