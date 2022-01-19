import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Transaction from './Transaction';

const MempoolPeer = ({ data, handleOnClick, loading, start, intervalId }) => {
  return (
    <div className="mempool-peer">
      <div style={{ marginBottom: 20 }}>
        <Button variant="warning" onClick={handleOnClick}>
          Mining3001
        </Button>
        <Button onClick={start}>{intervalId ? 'Stop' : 'Start'}</Button>
      </div>
      <div>
        <h4>transaction List</h4>
        {loading ? <Spinner animation="border" variant="dark" /> : data.map((tx, index) => <Transaction key={tx.id} tx={tx} index={index} />)}
      </div>
    </div>
  );
};

export default MempoolPeer;
