import Image from 'next/image';
import React from 'react';

const SmartFarm = () => {
  return (
    <div className="bg-gray-50 p-4 md:p-6 lg:p-12">
      <div className="my-12 flex flex-col justify-end gap-4 md:flex-row">
        <Image
          height={628}
          width={300}
          src="/smartfarm.jpg"
          alt="Card 1"
          className="h-full rounded-2xl object-cover"
        />
        <p className="text-green-hunter max-w-200 text-4xl font-medium">
          Changing The Game In Farming With Sustainable Practices And Cool
          Technologies, Shaping The Future Of Agriculture
        </p>
      </div>
    </div>
  );
};

export default SmartFarm;
