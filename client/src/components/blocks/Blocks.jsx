import React, { useState } from 'react'
import useAxios from '../../hooks/useAxios';
import "./Blocks.scss"
import Cube from './Cube';
import GenesisBlock from './GenesisBlock';

const Blocks = () => {
  const { data, loading, error } = useAxios({
    method: "get",
    baseURL: "http://localhost:3001",
    url: "/blocks",
  });

  const txDataList = [{tx:"test"}];
  
  if (loading){
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  } else {
    const genesisBlock = data[0];
    const restBlocks = data.slice(1);
    return (
      <>
        <div className='blocks-container'>
          <div className='blockchain'>
            <GenesisBlock blockInfo={genesisBlock}/>
            {restBlocks.map((block, index)=><Cube key={block.hash} blockInfo={block} txData={txDataList}/>)}
          </div>
        </div>
        
      </>
    )
  }
}


export default Blocks
