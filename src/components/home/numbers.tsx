import React from 'react';
import { NumberTicker } from '../magicui/number-ticker';
const Numbers = () => {
  const stats = [
    { label: 'Year Of Experience', value: 50 },
    { label: 'Field In Progress', value: 200 },
    { label: 'Farmers Around World', value: 120000 },
    { label: 'Agricultural Products', value: 15 },
  ];

  return (
    <section className="w-full border-b p-6 pr-0 sm:pr-4 md:p-12 md:pr-0">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 text-left sm:grid-cols-4">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <span className="text-green-fern flex flex-row gap-1">
              <NumberTicker
                value={stat.value}
                className="text-green-dark text-3xl font-bold tracking-tight md:text-4xl"
              />
              <p className="text-3xl font-bold md:text-4xl">+</p>
            </span>
            <p className="mt-2 text-sm font-medium text-gray-600">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Numbers;
