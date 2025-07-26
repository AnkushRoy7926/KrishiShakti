import {
  IconArrowElbowRight,
  IconArrowRight,
  IconArrowUpRight,
} from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';
import { Pointer } from '../magicui/pointer';

const Info = () => {
  return (
    <section className="bg-gray-50 py-8">
      <div className="grid gap-4 px-6 py-12 pb-24 md:grid-cols-2 md:px-12 lg:px-28">
        <div className="flex h-full flex-col items-start justify-between">
          <p className="text-green-hunter h-full font-medium">2025</p>
          <div className="flex flex-row gap-6 font-bold">
            <p> Organic Farm</p>
            <p className="opacity-70"> Automation Farm </p>
            <p className="opacity-70">Bio-medical Farm</p>
          </div>
        </div>
        <div>
          <p className="text-green-hunter text-4xl font-medium">
            Despite Advances in Agri-Tech, Traditional Labor-Intensive Farming
            Highlights Ongoing Ineffiencies.
          </p>
        </div>
        <div />
        <div className="text-green-dark mt-6 grid opacity-70 md:grid-cols-2">
          <p>Harvesting Legacy.</p>
          <p>Planting Tomorrow.</p>
        </div>
      </div>
      {/* Remove container so we can cut off sides */}
      <div className="px-4 sm:px-0">
        {/* Peek effect by hiding overflow */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 gap-4 sm:mx-[-60px] sm:flex sm:justify-center sm:gap-3">
            <div className="w-full shrink-0 overflow-hidden sm:mt-16 sm:w-[300px]">
              <div className="relative flex h-112 flex-col overflow-hidden rounded-2xl bg-white">
                <Image
                  fill
                  src="/card1.jpg"
                  alt="Card 1"
                  className="object-cover"
                />
                <Pointer>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
                    <IconArrowUpRight size={24} color="white" />
                  </div>
                </Pointer>
              </div>
              <div className="flex w-full flex-col rounded-xl py-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-md font-semibold text-gray-800">01</p>
                <p className="text-md text-gray-600 sm:text-right">
                  Field Mapping
                </p>
              </div>
            </div>
            {/* card */}
            <div className="w-full shrink-0 overflow-hidden sm:w-[300px]">
              <div className="mb-12 flex w-full items-center justify-between rounded-xl">
                <p className="text-green-hunter text-3xl font-bold sm:text-4xl">
                  Get <br />
                  Started Now
                </p>
                <button
                  aria-label="Go"
                  className="bg-green-dark flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:bg-green-800"
                >
                  <IconArrowRight size={20} />
                </button>
              </div>

              <div className="relative flex h-112 flex-col overflow-hidden rounded-2xl bg-white">
                <Image
                  fill
                  src="/card2.webp"
                  alt="Card 1"
                  className="object-cover"
                />
                <Pointer>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
                    <IconArrowUpRight size={24} color="white" />
                  </div>
                </Pointer>
              </div>
              <div className="flex w-full flex-col rounded-xl py-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-md font-semibold text-gray-800">02</p>
                <p className="text-md text-gray-600 sm:text-right">
                  Organic fertiliser
                </p>
              </div>
            </div>
            {/* CARD 2 */}
            <div className="-mt-32 w-full shrink-0 overflow-hidden sm:mt-0 sm:w-[300px]">
              <div className="relative flex h-112 flex-col overflow-hidden rounded-2xl bg-white">
                <Image
                  fill
                  src="/card3.jpg"
                  alt="Card 1"
                  className="object-cover"
                />
                <Pointer>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
                    <IconArrowUpRight size={24} color="white" />
                  </div>
                </Pointer>
              </div>
              <div className="flex w-full flex-col rounded-xl py-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-md font-semibold text-gray-800">03</p>
                <p className="text-md text-gray-600 sm:text-right">
                  Technology Irrigation
                </p>
              </div>
            </div>
            {/* CARD 3 */}
            <div className="w-full shrink-0 overflow-hidden sm:mt-16 sm:w-[300px]">
              <div className="relative flex h-112 flex-col overflow-hidden rounded-2xl bg-white">
                <Image
                  fill
                  src="/card4.jpg"
                  alt="Card 1"
                  className="object-cover"
                />
                <Pointer>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
                    <IconArrowUpRight size={24} color="white" />
                  </div>
                </Pointer>
              </div>
              <div className="flex w-full flex-col rounded-xl py-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-md font-semibold text-gray-800">04</p>
                <p className="text-md text-gray-600 sm:text-right">
                  Agricultural Monitoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
