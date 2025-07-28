import { Pointer } from '@/components/magicui/pointer';
import { IconArrowUpRight } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

const CropPage = () => {
  return (
    <div className="flex flex-col items-center bg-gray-50">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=4OrbsatILAiTkL9L"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="rounded-xl"
      />
      <div className="flex flex-col gap-6 bg-gray-50 p-4 md:p-12 lg:p-24">
        <div className="text-green-hunter mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-0 md:mb-12">
          <p className="text-4xl font-medium">
            Next-Gen Solutions For Optimal Crop Growth
          </p>
          <p className="text-black">
            We provide cutting edge services to help farmers maximize crop
            yields. Our precision farming, crop monitoring, and automation
            solutions aim to revolutionize agriculture.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="text-green-hunter flex flex-col">
            <div className="relative h-96 overflow-hidden rounded-2xl">
              <Image
                fill
                src="/hmm1.png"
                alt="Card 1"
                className="object-cover"
              />
              <Pointer>
                <div className="bg-green-fern flex h-16 w-16 items-center justify-center rounded-full">
                  <IconArrowUpRight size={24} color="white" />
                </div>
              </Pointer>
            </div>
            <p className="mt-4 text-2xl font-medium">Farming Precision</p>
            <p className="mt-1 text-black/60">
              Our precision farming employs state-of-the-art technology to
              optimize every aspect of farm operations.
            </p>
          </div>
          {/* new */}
          <div className="text-green-hunter flex flex-col">
            <div className="relative h-64 overflow-hidden rounded-2xl">
              <Image
                fill
                src="/hmm2.png"
                alt="Card 1"
                className="object-cover"
              />
              <Pointer>
                <div className="bg-green-fern flex h-16 w-16 items-center justify-center rounded-full">
                  <IconArrowUpRight size={24} color="white" />
                </div>
              </Pointer>
            </div>
            <p className="mt-4 text-2xl font-medium">Crop Surveillance</p>
            <p className="mt-1 text-black/60">
              Track your crops' health and growth in realtime with our
              innovative solutions.
            </p>
          </div>
          {/* hmm */}
          <div className="text-green-hunter flex flex-col">
            <div className="relative h-72 overflow-hidden rounded-2xl">
              <Image
                fill
                src="/hmm3.jpg"
                alt="Card 1"
                className="object-cover"
              />
              <Pointer>
                <div className="bg-green-fern flex h-16 w-16 items-center justify-center rounded-full">
                  <IconArrowUpRight size={24} color="white" />
                </div>
              </Pointer>
            </div>
            <p className="mt-4 text-2xl font-medium">Automated Farming</p>
            <p className="mt-1 text-black/60">
              Enhance farm efficiency and productivity with our cutting edge
              automation solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPage;
