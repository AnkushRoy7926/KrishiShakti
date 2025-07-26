'use client';

import React from 'react';
import Image from 'next/image';
import { IMAGES_MANIFEST } from 'next/dist/shared/lib/constants';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden rounded-t-lg bg-gray-50">
      {/* Hero content */}
      <div className="inset-0 flex flex-col items-center justify-center p-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
          Bring Fresh Growth
          <br />
          To Agriculture.
        </h1>
        <p className="text-md mt-6 font-bold text-gray-600">
          Experience the ultimate farming journey with expert tips, smart tech,
          and fresh insights.
        </p>
        <div className="mt-8">
          <button className="hover:bg-green-hunter inline-flex items-center rounded-full bg-black px-6 py-3 text-white shadow-md transition">
            Get Started →
          </button>
        </div>
      </div>
      <div className="relative z-30 flex flex-col text-center">
        <Image
          src="/bg.jpg"
          alt="Hero Background"
          height={4272}
          width={2353}
          className="inset-0"
          priority
          fetchPriority="high" // 👈 This fixes the warning
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1300px" // 👈 tell browser actual display size
        />
        <div className="absolute inset-0 z-10 h-32 bg-gradient-to-b from-gray-50 to-transparent" />
        <div className="absolute bottom-0 left-0 flex w-full flex-col items-start justify-between p-6 text-left sm:flex-row sm:items-end">
          <p className="text-2xl font-bold text-white">
            The Journey to a <br />
            Perfection.
          </p>

          <Button variant="link" className="-ml-4 text-white">
            Book a Free Driving experience
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
