import BeaconRegisterForm from './BeaconCreateUserForm';
import BeaconEditUserForm from './BeaconEditUserForm';

interface BeaconUserFormProps {
  mode: string;
  privateKey: string;
}

export function BeaconUserForm({ mode, privateKey }: BeaconUserFormProps) {
  return mode === 'create' ? (
    <BeaconRegisterForm privateKey={privateKey} />
  ) : (
    <BeaconEditUserForm privateKey={privateKey} />
  );
}
