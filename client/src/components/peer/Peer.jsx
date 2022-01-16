import React from 'react'
import Peer1 from './Peer1'
import Peer2 from './Peer2'
import "./Peer.scss"

const Peer = () => {
  return (
    <div className='peer-container'>
      <Peer1/>
      <Peer2/>
    </div>
  )
}

export default Peer
