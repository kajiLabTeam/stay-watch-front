import React from 'react'

type Props = {
  name: string
}

export const Badge = ({name}: Props) => {
  return (
    <div className='h-fit rounded-full bg-staywatch-accent/10 px-2 text-base text-staywatch-accent'>
      {name}
    </div>
  )
}
