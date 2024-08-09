"use client"

import { FC, ReactNode, memo } from "react"
import { RecoilRoot } from "recoil"

type Props = {
  children: ReactNode
}

export const RecoilProvider: FC<Props> = memo((props) => {
  const { children } = props

  return <RecoilRoot>{children}</RecoilRoot>
})