'use client';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import Link from 'next/link';
import { useState } from 'react';

export function NavbarKS({ children }: { children?: React.ReactNode }) {
  const navItems = [
    {
      name: 'Features',
      link: '#features',
    },
    {
      name: 'Pricing',
      link: '#pricing',
    },
    {
      name: 'Contact',
      link: '#contact',
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <NavbarButton variant="secondary" href="/sign-in">
                Login
              </NavbarButton>
            </SignedOut>
            <NavbarButton variant="primary" href="/sign-in">
              Book a call
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex flex-row items-center gap-4">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <SignedOut>
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                  href="/sign-in"
                >
                  Login
                </NavbarButton>
              </SignedOut>

              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="/sign-in"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <DummyContent />
      {/* Render children components */}
      {children}

      {/* Navbar */}
    </div>
  );
}

const DummyContent = () => {
  return <div className="container mx-auto pt-4"></div>;
};
