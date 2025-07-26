import { IconCheck, IconLockCheck } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 overflow-clip md:grid-cols-2">
      <div className="hidden h-screen items-start justify-center overflow-clip bg-[linear-gradient(to_left_top,#051937,#004d7a,#008793,#90A955,#ECF39E)] px-10 md:flex md:flex-col dark:bg-[linear-gradient(to_right_bottom,#0d1b2a,#1b263b,#415a77,#778da9,#e0e1dd)]">
        {/* <div className="hidden h-screen items-start justify-center overflow-clip bg-[linear-gradient(to_left_top,#051937,#004d7a,#008793,#00bf72,#a8eb12)] px-10 md:flex md:flex-col dark:bg-[linear-gradient(to_right_bottom,#0d1b2a,#1b263b,#415a77,#778da9,#e0e1dd)]"> */}
        <Link href="/">
          <Image src="/logo.png" alt="Hello" height={128} width={128} />
        </Link>
        <h1 className="text-6xl font-bold text-emerald-100 dark:text-blue-100">
          One AnshuID. <br />
          All of KrishiShakti.
        </h1>
        <p className="mt-16 font-bold text-emerald-100/80 dark:text-blue-100/80">
          Manage your business with ease. One account, all of your favorite
          services.
        </p>
      </div>
      <div className="bg-green-mindaro flex h-screen flex-col items-center overflow-auto p-4 py-8">
        {children}
        <p className="flex flex-row items-center gap-2 p-3 text-sm">
          <IconLockCheck className="h-5" />
          Your AnshuID is encrypted and securely stored.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
