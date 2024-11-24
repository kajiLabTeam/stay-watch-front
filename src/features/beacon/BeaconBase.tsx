import { SegmentedControl } from '@mantine/core';
import React, { useState } from 'react'
import BeaconRegisterForm from './BeaconRegisterForm';

type PropsType = {
  privateKey: string;
};

function BeaconBase({privateKey}: PropsType) {
  const [selectedMode, setSelectedMode] = useState('create')

  return (
    <div>
      <div className="mt-5 rounded-lg bg-slate-100 pt-2">
        <SegmentedControl
          fullWidth
          size='md'
          radius="xl"
          className='mx-10'
          value={selectedMode}
          onChange={setSelectedMode}
          data={[
            { label: '新規ユーザ', value: 'create'},
            { label: '既存ユーザ', value: 'edit'},
          ]}
        />
        {selectedMode === 'create' ? (
          <BeaconRegisterForm privateKey={privateKey}/>
        ): (
          <div>a</div>
        )}
      </div>
    </div>
  )
}

export default BeaconBase