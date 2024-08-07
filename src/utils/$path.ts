export const pagesPath = {
  "admin": {
    "kesuyo": {
      $url: (url?: { hash?: string }) => ({ pathname: '/admin/kesuyo' as const, hash: url?.hash })
    }
  }
}

export type PagesPath = typeof pagesPath
