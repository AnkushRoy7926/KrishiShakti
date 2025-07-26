// components/EmailSection.tsx

import React from 'react';
import Image from 'next/image';

const EmailSection = () => {
  return (
    <section className="relative h-[500px] w-full">
      {/* 👇 Background Image */}
      <Image
        src="/inbox.jpg" // <- replace with your image path
        alt="Irrigation Field"
        fill
        className="object-cover"
        priority
      />

      {/* 👇 Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* 👇 Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h2 className="mb-6 text-3xl font-bold sm:text-5xl">
          Join the Agricultural
          <br />
          Revolution Today!
        </h2>

        <form className="flex w-full max-w-md gap-2">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 rounded-full bg-white px-4 py-2 text-black outline-none"
          />
          <button
            type="submit"
            className="hover:bg-green-hunter rounded-full bg-gray-900 px-6 py-2 text-white transition"
          >
            Subscribe →
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
