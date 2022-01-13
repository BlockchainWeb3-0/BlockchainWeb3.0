import React from 'react'
import "./Blocks.scss"

const Block = ({index, children}) => {
  return (
    <div className='block'>
      <div>
        index: {index}
      </div>
      <div>
        hash: {children.hash}
      </div>
      <div>
        prevHash: {children.header.prevHash}
      </div>
    </div>
  )
}

export default Block
