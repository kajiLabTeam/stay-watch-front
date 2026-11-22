import { Select } from '@mantine/core';
import React from 'react';
import { UserAttribute } from '@/types/user';

type UserSelecterProps = {
  users: UserAttribute[];
  handleUserID: (userId: string | null) => void; // oxlint-disable-line
  paramsUserID: string | null;
};

export default function UserSelecter({ users, handleUserID, paramsUserID }: UserSelecterProps) {
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
}
