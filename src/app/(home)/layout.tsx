import { Metadata } from 'next';
import { NavbarKS } from '@/components/navbar';
import React from 'react';
import EmailSection from '@/components/bottom/email';
import Footer from '@/components/bottom/footer';

export const metadata: Metadata = {
  title: 'KrishiShakti',
  description: 'All-in-one solution for farmers',
};
const homeLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <NavbarKS>
      {children}
      <EmailSection />
      <Footer />
    </NavbarKS>
  );
};

export default homeLayout;
