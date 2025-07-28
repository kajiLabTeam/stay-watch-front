import { Select } from '@mantine/core';
import React from 'react';
import { UserAttribute } from '@/types/user';

type UserSelecterProps = {
  users: UserAttribute[];
  handleUserID: (userId: string | null) => void; // eslint-disable-line
  paramsUserID: string | null;
};

const UserSelecter = ({ users, handleUserID, paramsUserID }: UserSelecterProps) => {
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
      onChange={handleUserID}
      value={paramsUserID}
    />
  );
};

export default UserSelecter;
