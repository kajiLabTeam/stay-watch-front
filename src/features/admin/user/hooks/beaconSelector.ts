import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { BeaconType } from '@/types/beacon';
import { endpoints } from '@/utils/api';

type beaconSelector = {
  value: string;
  label: string;
};

export const useSelectBeacons = () => {
  const { data: beaconTypes } = useSWR<BeaconType[]>(`${endpoints.beacons}`);
  const [beaconSelector, setBeaconSelector] = useState<beaconSelector[]>([]);

  useEffect(() => {
    if (beaconTypes) {
      const beaconList: beaconSelector[] = beaconTypes.map((beaconType) => {
        return {
          label: beaconType.beaconName,
          value: beaconType.beaconName,
        };
      });
      setBeaconSelector([...beaconList]);
    }
  }, [beaconTypes]);

  return beaconSelector;
};
