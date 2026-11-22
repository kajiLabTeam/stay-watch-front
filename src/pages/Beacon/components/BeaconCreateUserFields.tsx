import { Select, TagsInput, TextInput } from '@mantine/core';
import { BeaconCreateForm } from '../hooks/useBeaconCreateForm';
import { roleSelector } from '@/constants/roleSelector';
import { useSelectTags } from '@/hooks/tagSelector';

interface BeaconCreateUserFieldsProps {
  form: BeaconCreateForm;
}

export function BeaconCreateUserFields({ form }: BeaconCreateUserFieldsProps) {
  const selectTags = useSelectTags();

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
