export const paths = {
  admin: {
    $url: (url?: { hash?: string }) => ({ pathname: '/admin' as const, hash: url?.hash }),
  },
  floorMap: {
    $url: (url?: { hash?: string }) => ({ pathname: '/floorMap' as const, hash: url?.hash }),
  },
  roomHistory: {
    $url: (url?: { hash?: string }) => ({ pathname: '/roomHistory' as const, hash: url?.hash }),
  },
  simulataneousStay: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/simulataneousStay' as const,
      hash: url?.hash,
    }),
  },
  stayer: {
    $url: (url?: { hash?: string }) => ({ pathname: '/stayer' as const, hash: url?.hash }),
  },
  userInformation: {
    $url: (url?: { hash?: string }) => ({ pathname: '/userInformation' as const, hash: url?.hash }),
  },
};

export type PagesPath = typeof paths;
