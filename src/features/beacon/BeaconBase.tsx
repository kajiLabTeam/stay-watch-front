import React from 'react'

type PropsType = {
  privateKey: string;
};

function BeaconBase({privateKey}: PropsType) {
  return (
    <div>
      BeaconBase
      {privateKey}
      
    </div>
  )
}

export default BeaconBase