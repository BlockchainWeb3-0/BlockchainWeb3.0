import React from 'react'
import { Button } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';

const Blocks = () => {
  const { data, loading, error } = useAxios({
    method: "get",
    baseURL: "http://localhost:3001",
    url: "/blocks",
  });
  if (!loading){
    console.log(data);
  }
  return (
    <>
      <Button>get Block</Button>
    </>
  )
}

export default Blocks
