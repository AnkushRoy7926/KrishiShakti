import {
  IconArrowRight,
  IconArrowUpRight,
  IconLocation,
  IconLocationPin,
} from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';
import { Pointer } from '../magicui/pointer';

const Expert = () => {
  return (
    <div className="h-[80vh] bg-gray-50 p-2">
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-6 md:p-12">
        <p className="z-10 h-full max-w-128 text-4xl font-medium text-white lg:text-5xl">
          Collaborate And Learn From Industry Experts and Enthusissts
        </p>
        <div className="z-10 flex flex-row items-center justify-between">
          <p className="flex flex-row items-center gap-2 text-sm text-white">
            <IconLocationPin size={20} />
            Arunachal Pradesh, India
          </p>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 border-orange-400 bg-orange-600">
            <IconArrowRight size={24} color="white" />
          </div>
        </div>
        <Image fill src="/expert.webp" alt="Card 1" className="object-cover" />
        <Pointer>
          <div className="bg-green-mindaro flex h-16 w-16 items-center justify-center rounded-full">
            <IconArrowUpRight size={24} />
          </div>
        </Pointer>
      </div>
    </div>
  );
};

export default Expert;
