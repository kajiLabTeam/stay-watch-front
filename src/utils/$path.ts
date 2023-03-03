export const pagesPath = {
  "admin": {
    $url: (url?: { hash?: string }) => ({ pathname: '/admin' as const, hash: url?.hash })
  },
  "floorMap": {
    $url: (url?: { hash?: string }) => ({ pathname: '/floorMap' as const, hash: url?.hash })
  },
  "roomHistory": {
    $url: (url?: { hash?: string }) => ({ pathname: '/roomHistory' as const, hash: url?.hash })
  },
  "simulataneousStay": {
    $url: (url?: { hash?: string }) => ({ pathname: '/simulataneousStay' as const, hash: url?.hash })
  },
  "submitSampledata": {
    $url: (url?: { hash?: string }) => ({ pathname: '/submitSampledata' as const, hash: url?.hash })
  },
  "userInformation": {
    $url: (url?: { hash?: string }) => ({ pathname: '/userInformation' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
