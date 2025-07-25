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
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

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
            <ClerkLoading>
              <NavbarButton variant="secondary" className="hidden md:flex">
                <div className="flex w-full flex-row justify-center">
                  <Skeleton className="h-4 w-10" />
                </div>
              </NavbarButton>
            </ClerkLoading>
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
              <ClerkLoading>
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full items-center justify-center p-2.5"
                  href="/sign-in"
                >
                  <div className="flex w-full flex-row justify-center">
                    <Skeleton className="h-4 w-10" />
                  </div>
                </NavbarButton>
              </ClerkLoading>
              <ClerkLoaded>
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
              </ClerkLoaded>

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
