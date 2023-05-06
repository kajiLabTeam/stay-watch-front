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
    const beaconList: beaconSelector[] =
      // beaconTypesがundefinedの場合空の配列を返す
      beaconTypes?.map((beaconType) => ({
        label: beaconType.beaconName,
        value: beaconType.beaconName,
      })) || [];

    setBeaconSelector(beaconList);
  }, [beaconTypes]);

  return beaconSelector;
};
