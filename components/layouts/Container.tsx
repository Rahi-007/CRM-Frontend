import React from 'react'
import { cn } from '@/lib/utils';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: IProps) => {
  return (
    <div className={cn("w-full min-h-[92.4vh] bg-[#F6FBFA] border border-gray-300", className)}>
      {children}
    </div>
  )
}

export default Container
