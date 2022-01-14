import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';

const Mempool = ({txData}) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const params = {
    method: "post",
    baseURL: "http://localhost:3001",
    url: "/mineBlock",
    data: {data:[{tx:"test"}] }
  }
  // data: {data:[{tx:"test"}]}

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params);
      setData(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleOnClick = () => {
    console.log("Clicked!");
    fetchData(params)
  }

  return (
    <div className='mempool-container'>
      <div>
        <h1>Mempool</h1>
        <h3>where to store Unconfirmed Transactions</h3>
      </div>
      <div>
        <Button onClick={handleOnClick}>Mining</Button>
      </div>
    </div>
  )
}

export default Mempool
