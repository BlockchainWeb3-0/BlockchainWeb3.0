import React, { useState } from 'react'
import useAxios from '../../hooks/useAxios';
import Block from './Block';
import "./Blocks.scss"
import Cube from './Cube';

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
      <>
        <div className='blocks-container'>
          <div className='blockchain'>
            {/* {data.map((block, index)=><Block index={index} key={block.hash}>{block}</Block>)} */}
            {data.map((block, index)=><Cube key={block.hash}/>)}
          </div>
        </div>
        
      </>
    )
  }
}


export default Blocks
