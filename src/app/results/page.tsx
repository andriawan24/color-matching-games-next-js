'use client';

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Results() {
  const [colors, setColors] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [overallScore, setOverallScore] = useState('');

  useEffect(() => {
    const finalScores = localStorage.getItem('scores') || ''
    const colors = localStorage.getItem('colors') || ''
    const finalScoreList = finalScores.split(',').map((score) => Number(score));
    const finalColorList = colors.split(',');

    setColors(finalColorList);
    setScores(finalScoreList);

    const overallScore = (finalScoreList.reduce((partialSum, a) => partialSum + a, 0) / 5).toFixed(2);
    setOverallScore(overallScore);
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center gap-4 sm:gap-8 py-10">
      <Image width={89} height={102} loading="lazy" src={'/images/star.png'} className="absolute top-[71px] left-[152px]" alt="Star Image" />
      <Image width={89} height={102} loading="lazy" src={'/images/star.png'} className="absolute bottom-[89px] right-[148px]" alt="Star Image" />
      <h1 className="text-4xl sm:text-7xl font-semibold text-primary">Overall Score</h1>
      <div className={`bg-white p-12 sm:px-16 sm:py-8 rounded-2xl border-[16px] border-primary mt-4 mx-4 relative`}>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="px-4"><h3 className="text-center uppercase text-black text-3xl font-semibold">Question</h3></div>
          <div className="px-4"><h3 className="text-center uppercase text-black text-3xl font-semibold">Score</h3></div>
          {scores.map((item, index) => (
            <>
              <div className="flex flex-col justify-center items-center">
                <div className={`w-10 h-10 rounded-full`} style={{ backgroundColor: colors[index] }} />
              </div>

              <div className="flex flex-col justify-center items-center">
                <h3 className="text-center text-black text-3xl font-semibold">{item}%</h3>
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <h3 className="text-center uppercase text-black text-3xl font-semibold">Overall Score</h3>
          <h3 className="text-center uppercase text-primary-pink text-6xl font-semibold">{overallScore}%</h3>
        </div>
      </div>
    </main>
  )
}