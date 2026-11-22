import { Select, TagsInput, TextInput } from '@mantine/core';
import { UserForm } from '../../hooks/useUserForm';
import { roleSelector } from '@/constants/roleSelector';
import { useSelectTags } from '@/hooks/tagSelector';
import { BeaconType } from '@/pages/Admin/types/beacon';

interface UserFormFieldsProps {
  form: UserForm;
  beaconTypes: readonly BeaconType[];
}

export default function UserFormFields({ form, beaconTypes }: UserFormFieldsProps) {
  const selectTags = useSelectTags();
  const beaconSelector = [
    ...beaconTypes.map((beaconType) => ({
      value: beaconType.beaconName,
      label: beaconType.beaconName,
      disabled: beaconType.uuidEditable,
    })),
    {
      value: '',
      label: '未所持',
      disabled: false,
    },
  ];

  return (
    <>
      <TextInput placeholder='tarou' label='名前' {...form.getInputProps('name')} />
      <TextInput
        label='Gメールアドレス（任意）'
        placeholder='your@gmail.com'
        {...form.getInputProps('email')}
      />
      <div className='flex space-x-4'>
        <Select
          className='w-1/2'
          label='ビーコンの形態'
          placeholder='ビーコンの形態を選択してください'
          data={beaconSelector}
          {...form.getInputProps('beaconName')}
        />
        <Select
          label='権限'
          className='w-1/2'
          placeholder='権限レベルを選択してください'
          data={roleSelector}
          {...form.getInputProps('role')}
        />
      </div>
      <TagsInput
        label='タグ'
        placeholder='タグを選択してください'
        data={selectTags}
        {...form.getInputProps('tagNames')}
      />
    </>
  );
}
