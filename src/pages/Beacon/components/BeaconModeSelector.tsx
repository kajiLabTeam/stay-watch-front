import { SegmentedControl } from '@mantine/core';

const MODE_OPTIONS = [
  { label: '新規ユーザ', value: 'create' },
  { label: '既存ユーザ', value: 'edit' },
];

interface BeaconModeSelectorProps {
  mode: string;
  onModeChanged: (mode: string) => void;
}

export default function BeaconModeSelector({ mode, onModeChanged }: BeaconModeSelectorProps) {
  return (
    <SegmentedControl
      fullWidth
      size='md'
      radius='xl'
      className='mx-10'
      value={mode}
      onChange={onModeChanged}
      data={MODE_OPTIONS}
    />
  );
}
