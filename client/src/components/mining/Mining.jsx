import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';

const Mining = () => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const params = {
    method: "post",
    baseURL: "http://localhost:3001",
    url: "/mineBlock",
    data: {data:[{tx:"test"}]}
  }

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
    <div>
      <Button onClick={handleOnClick}>Mining</Button>
      <div>
        <h1>Transaction List</h1>
      </div>
    </div>
  )
}

export default Mining
