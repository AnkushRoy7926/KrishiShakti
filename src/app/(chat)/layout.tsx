import { Metadata } from 'next';
import { NavbarKS } from '@/components/navbarcopy';
import React from 'react';
import EmailSection from '@/components/bottom/email';
import Footer from '@/components/bottom/footer';

export const metadata: Metadata = {
  title: 'KrishiShakti',
  description: 'All-in-one solution for farmers',
};
const homeLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <NavbarKS />

      {children}
    </div>
  );
};

export default homeLayout;
