import { Metadata } from 'next';
import { NavbarKS } from '@/components/navbar';
import React from 'react';

export const metadata: Metadata = {
  title: 'KrishiShakti',
  description: 'All-in-one solution for farmers',
};
const homeLayout = ({ children }: { children?: React.ReactNode }) => {
  return <NavbarKS>{children}</NavbarKS>;
};

export default homeLayout;
