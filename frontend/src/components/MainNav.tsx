import React from 'react'
import { Button } from './ui/button'

type Props = {}

export default function MainNav({}: Props) {
  return (
    <Button variant="ghost" className='font-bold hover:text-orange-500 hover:bg-white'>Login In</Button>
  )
}