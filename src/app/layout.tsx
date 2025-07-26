import type { Metadata } from 'next';
import { Geist, Geist_Mono, Rethink_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const rethinkSans = Rethink_Sans({
  variable: '--font-rethink-sans',
  subsets: ['latin'],
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'KrishiShakti',
  description: 'All-in-one solution for farmers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    // appearance={{
    //   baseTheme: dark, // toggle this if you're using dark mode
    // }}
    >
      <html lang="en" suppressHydrationWarning>
        <Head>
          <link rel="preload" as="image" href="/bg.jpg" fetchPriority="high" />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${rethinkSans.variable} font-[family-name:var(--font-rethink-sans)] antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {/* <header className="fixed flex h-16 w-full flex-row items-center justify-between p-4">
              <div className="flex w-max flex-row items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="KrishiShakti Logo"
                  width={40}
                  height={40}
                  className="mr-2 h-10 w-10 rounded-full bg-white p-1 shadow-sm"
                />
                <p className="flex flex-row text-2xl font-black text-green-900">
                  KrishiShakti
                </p>
              </div>
              <div className="flex gap-4">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton>
                    <button className="h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium text-white sm:h-12 sm:px-5 sm:text-base">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header> */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
