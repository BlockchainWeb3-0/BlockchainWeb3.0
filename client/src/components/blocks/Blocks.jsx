import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';
import Block from './Block';
import "./Blocks.scss"

const Blocks = () => {
  const [blockData, setBlockData] = useState([{data: "empty"}]);
  const [mine, setMine] = useState(false)

  const { data, loading, error } = useAxios({
    method: "get",
    baseURL: "http://localhost:3001",
    url: "/blocks",
  });

  const onClick = () => {
    setMine(true)
    setMine(false)
  }
  
  if (!loading){
    console.log(data);
  }
  return (
    <div className='blocks-container'>
      <div>
        <Button>Mining</Button>
      </div>
      <div className='blockchain'>
        {loading ? <><h1>Loading...</h1></> : data.map((block, index)=><Block index={index} key={block.hash}>{block}</Block>)}
      </div>
    </div>
  )
}

const MinBlock = () => {
  const { data2, loading2, error2 } = useAxios({
    method: "post",
    baseURL: "http://localhost:3001",
    url: "/mineBlock",
    data: {data:[{tx:"test"}]}
  });
}

export default Blocks
