import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

type Props = {}

export default function MobileNav({ }: Props) {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='text-orange-500' />
            </SheetTrigger>
            <SheetContent className='space-y-3'>
                <SheetTitle>
                    <span>Welcome to MUFU.come!</span>
                </SheetTitle>
                <Separator />
                <SheetDescription className='flex'>
                    <Button className='flex-1 font-bold bg-orange-500'>Log In</Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}