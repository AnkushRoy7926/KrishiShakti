import Expert from '@/components/home/expert';
import Hero from '@/components/home/hero';
import Info from '@/components/home/info';
import Numbers from '@/components/home/numbers';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Hero />
      <Numbers />
      <Info />
      <Expert />
      <h1 className="mb-4 text-center text-3xl font-bold">
        Check the navbar at the top of the container
      </h1>
      <p className="mb-10 text-center text-sm text-zinc-500">
        For demo purpose we have kept the position as{' '}
        <span className="font-medium">Sticky</span>. Keep in mind that this
        component is <span className="font-medium">fixed</span> and will not
        move when scrolling.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            id: 1,
            title: 'The',
            width: 'md:col-span-1',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
          {
            id: 2,
            title: 'First',
            width: 'md:col-span-2',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
          {
            id: 3,
            title: 'Rule',
            width: 'md:col-span-1',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
          {
            id: 4,
            title: 'Of',
            width: 'md:col-span-3',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
          {
            id: 5,
            title: 'F',
            width: 'md:col-span-1',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
          {
            id: 6,
            title: 'Club',
            width: 'md:col-span-2',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
          {
            id: 7,
            title: 'Is',
            width: 'md:col-span-2',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
          {
            id: 8,
            title: 'You',
            width: 'md:col-span-1',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
          {
            id: 9,
            title: 'Do NOT TALK about',
            width: 'md:col-span-2',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
          {
            id: 10,
            title: 'F Club',
            width: 'md:col-span-1',
            height: 'h-60',
            bg: 'bg-neutral-100 dark:bg-neutral-800',
          },
        ].map(box => (
          <div
            key={box.id}
            className={`${box.width} ${box.height} ${box.bg} flex items-center justify-center rounded-lg p-4 shadow-sm`}
          >
            <h2 className="text-xl font-medium">{box.title}</h2>
          </div>
        ))}
      </div>
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
        <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-center font-mono text-sm/6 sm:text-left">
            <li className="mb-2 tracking-[-.01em]">
              Get started by editing{' '}
              <code className="rounded bg-black/[.05] px-1 py-0.5 font-mono font-semibold dark:bg-white/[.06]">
                src/app/page.tsx
              </code>
              .
            </li>
            <li className="tracking-[-.01em]">
              Save and see your changes instantly.
            </li>
          </ol>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="flex h-10 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
