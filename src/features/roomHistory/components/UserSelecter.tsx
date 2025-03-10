import { Select } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useHandleUserChange } from '../roomHistoryhook';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useGetAPI } from '@/hooks/useGetAPI';
import { UserAttribute } from '@/types/user';
import { endpoints } from '@/utils/endpoint';

// eslint-disable-next-line no-unused-vars
const UserSelecter = (selectedUserID?: string) => {
  const handleUserChange = useHandleUserChange();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: users, error, isLoading } = useGetAPI<UserAttribute[]>(`${endpoints.users}`);
  const [selectedUser, setSelectedUser] = useState<string | null>(selectedUserID || null);

  useEffect(() => {
    setSelectedUser(selectedUserID || null);
  }, [selectedUserID]);

  if (isLoading) return <Loading message='利用者情報取得中' />;
  if (error) return <Error message='利用者情報取得失敗' />;
  if (users)
    return (
      <Select
        placeholder='user name'
        data={
          users
            ? users.map((user) => ({
                value: user.id.toString(),
                label: user.name,
              }))
            : []
        }
        searchable
        nothingFoundMessage='ユーザが見つかりません'
        onChange={handleUserChange}
        value={selectedUser}
      />
    );
};

export default UserSelecter;
