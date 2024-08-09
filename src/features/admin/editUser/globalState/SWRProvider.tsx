"use client"

import { FC, ReactNode, memo } from "react"
import { RecoilRoot } from "recoil"
import { SWRConfig } from "swr"

type Props = {
  children: ReactNode
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const SWRProvider: FC<Props> = memo((props) => {
  const { children } = props

  return <SWRConfig value={{fetcher}}>{children}</SWRConfig>
})