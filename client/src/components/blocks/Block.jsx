import React from 'react'
import "./Blocks.scss"

const Block = ({index, children}) => {
  const block = children;
  console.log(block.data);
  return (
    <div className='block'>
      <div>
        index: {index}
      </div>
      <div>
        hash: {block.hash}
      </div>
      <div>
        prevHash: {block.header.prevHash}
      </div>
    </div>
  )
}

export default Block
