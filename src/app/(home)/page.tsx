import Expert from '@/components/home/expert';
import Hero from '@/components/home/hero';
import Hmm from '@/components/home/hmm';
import Info from '@/components/home/info';
import Numbers from '@/components/home/numbers';
import SmartFarm from '@/components/home/smartfarm';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Hero />
      <Numbers />
      <Info />
      <Expert />
      <Hmm />
      <SmartFarm />
    </>
  );
}
