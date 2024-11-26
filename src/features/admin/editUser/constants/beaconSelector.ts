import { UI_DATA } from './uidata';

export const beaconSelector = [
  { value: UI_DATA.BEACON_NAME_FCS1301, label: UI_DATA.BEACON_NAME_FCS1301 },
  { value: UI_DATA.BEACON_NAME_ANDROID, label: UI_DATA.BEACON_NAME_ANDROID },
  { value: UI_DATA.BEACON_NAME_IPHONE, label: UI_DATA.BEACON_NAME_IPHONE },
  {
    value: UI_DATA.BEACON_NAME_STAYWATCHBEACON,
    label: UI_DATA.BEACON_NAME_STAYWATCHBEACON,
    disabled: true,
  },
] as const;
