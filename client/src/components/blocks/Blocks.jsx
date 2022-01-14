import React, { useState } from 'react'
import useAxios from '../../hooks/useAxios';
import Block from './Block';
import "./Blocks.scss"

const Blocks = () => {
  const [blockData, setBlockData] = useState([{data: "empty"}]);

  const { data, loading, error } = useAxios({
    method: "get",
    baseURL: "http://localhost:3001",
    url: "/blocks",
  });
  
  if (loading){
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  } else {
    return (
      <div className='blocks-container'>
        <div className='blockchain'>
          {data.map((block, index)=><Block index={index} key={block.hash}>{block}</Block>)}
        </div>
      </div>
    )
  }
}


export default Blocks
