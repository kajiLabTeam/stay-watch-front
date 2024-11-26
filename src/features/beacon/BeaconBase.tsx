import { Alert, SegmentedControl } from '@mantine/core';
import React, { useState } from 'react';
import { useAlertModeState } from '../admin/editUser/globalState/alertModeState';
import BeaconRegisterForm from './BeaconCreateUserForm';
import BeaconEditUserForm from './BeaconEditUserForm';
import { useUserRoleState } from '@/globalStates/userRoleState';

type PropsType = {
  privateKey: string;
};

function BeaconBase({ privateKey }: PropsType) {
  const userRole = useUserRoleState();
  const [selectedMode, setSelectedMode] = useState('create');
  const { alertMode } = useAlertModeState();

  if (userRole == null || userRole < 2) return <div>権限がありません</div>;
  return (
    <div>
      <div className='mt-5 rounded-lg bg-slate-100 pt-2'>
        <SegmentedControl
          fullWidth
          size='md'
          radius='xl'
          className='mx-10'
          value={selectedMode}
          onChange={setSelectedMode}
          data={[
            { label: '新規ユーザ', value: 'create' },
            { label: '既存ユーザ', value: 'edit' },
          ]}
        />
        {selectedMode === 'create' ? (
          <BeaconRegisterForm privateKey={privateKey} />
        ) : (
          <BeaconEditUserForm privateKey={privateKey} />
        )}
        {alertMode > 0 && (
          <Alert title='成功' color='green'>
            {alertMode === 1 && 'ユーザが新しく登録されました'}
            {alertMode === 2 && 'ユーザ情報が更新されました'}
            {alertMode === 3 && '1名のユーザが削除されました'}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default BeaconBase;
