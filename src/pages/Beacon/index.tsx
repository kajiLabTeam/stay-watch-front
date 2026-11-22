import { useState } from 'react';
import { BeaconModeSelector } from './components/BeaconModeSelector';
import { BeaconPanel } from './components/BeaconPanel';
import { BeaconSuccessAlert } from './components/BeaconSuccessAlert';
import { BeaconUserForm } from './components/BeaconUserForm';
import { useAlertModeState } from '@/atoms/alertModeAtom';
import { useUserRoleState } from '@/atoms/userRoleAtom';

interface BeaconBaseProps {
  privateKey: string;
}

function BeaconBase({ privateKey }: BeaconBaseProps) {
  const userRole = useUserRoleState();
  const [selectedMode, setSelectedMode] = useState('create');
  const { alertMode } = useAlertModeState();

  if (userRole == null || userRole < 2) return <div>権限がありません</div>;

  return (
    <BeaconPanel>
      <BeaconModeSelector mode={selectedMode} onModeChanged={setSelectedMode} />
      <BeaconUserForm mode={selectedMode} privateKey={privateKey} />
      <BeaconSuccessAlert alertMode={alertMode} />
    </BeaconPanel>
  );
}

export default BeaconBase;
