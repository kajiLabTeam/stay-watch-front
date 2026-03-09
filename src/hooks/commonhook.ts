import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { paths } from '@/utils/path';

type UseHeaderButtonColorReturn = {
  bgColors: Item;
  textColors: Item;
  iconColors: Item;
};

type Item = {
  stayer: string;
  roomHistory: string;
  userInformation: string;
  floorMap: string;
  SimulataneousStay: string;
  activityHeatmap: string;
};

const SELECTED = {
  bg: 'bg-staywatch-accent',
  text: 'text-white',
  icon: 'white',
} as const;

const UNSELECTED = {
  bg: '',
  text: 'text-staywatch-accent',
  icon: 'accent',
} as const;

const ITEM_KEYS: (keyof Item)[] = [
  'stayer',
  'roomHistory',
  'userInformation',
  'floorMap',
  'SimulataneousStay',
  'activityHeatmap',
];

const pathnameToKey: Record<string, keyof Item> = {
  [paths.root.$url().pathname]: 'stayer',
  [paths.stayer.$url().pathname]: 'stayer',
  [paths.roomHistory.$url().pathname]: 'roomHistory',
  [paths.userInformation.$url().pathname]: 'userInformation',
  [paths.floorMap.$url().pathname]: 'floorMap',
  [paths.simulataneousStay.$url().pathname]: 'SimulataneousStay',
  [paths.activityHeatmap.$url().pathname]: 'activityHeatmap',
};

const buildColors = (activeKey: keyof Item | undefined): UseHeaderButtonColorReturn => {
  const bgColors = {} as Item;
  const textColors = {} as Item;
  const iconColors = {} as Item;

  for (const key of ITEM_KEYS) {
    const isActive = key === activeKey;
    bgColors[key] = isActive ? SELECTED.bg : UNSELECTED.bg;
    textColors[key] = isActive ? SELECTED.text : UNSELECTED.text;
    iconColors[key] = isActive ? SELECTED.icon : UNSELECTED.icon;
  }

  return { bgColors, textColors, iconColors };
};

export const useHeaderButtonColor = (): UseHeaderButtonColorReturn => {
  const pathname = usePathname();

  return useMemo(() => {
    const activeKey = pathname ? pathnameToKey[pathname] : undefined;
    return buildColors(activeKey);
  }, [pathname]);
};
