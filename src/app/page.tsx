'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col justify-center items-center gap-4 sm:gap-8">
      <Image width={89} height={102} loading="lazy" src={'/images/star.png'} className="absolute top-[71px] left-[152px]" alt="Star Image" />
      <Image width={89} height={102} loading="lazy" src={'/images/star.png'} className="absolute bottom-[89px] right-[148px]" alt="Star Image" />
      <h1 className="text-4xl sm:text-7xl font-semibold text-primary">Let&lsquo;s Play!</h1>
      <button 
        onClick={() => {
          const scores = localStorage.getItem('scores') ?? ''
          if (scores == '') {
            router.push('/play')
          } else {
            router.push('/results')
          }
        }}
        className="bg-gradient-to-r from-btn-background-from to-btn-background-to hover:from-btn-background-hover-from hover:to-btn-background-hover-to active:opacity-100 transition-all duration-200 text-black py-2 px-16 font-bold text-lg sm:text-[20px] rounded-xl"
      >
          Start Playing
      </button>
    </main>
  );
}
