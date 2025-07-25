import { NavbarKS } from '@/components/navbar';
import React from 'react';

const homeLayout = ({ children }: { children?: React.ReactNode }) => {
  return <NavbarKS>{children}</NavbarKS>;
};

export default homeLayout;
