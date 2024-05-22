'use client';

import ColorPicker from "@/components/color-picker";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useRef, useState } from "react";

enum PageType { PLAY, SCORE }
const colors = ["#FF7B00", "#FFE500", "#3300FF", "#50FF00", "#FF0098"];
interface RGB {
  r: number,
  g: number,
  b: number
}

export default function Play(): ReactElement {
  const userRef = useRef<HTMLDivElement>(null);
  const expectedRef = useRef<HTMLDivElement>(null);
  const buttonAudioRef = useRef<HTMLAudioElement>(null);
  const buttonFinishAudioRef = useRef<HTMLAudioElement>(null);

  const [userColor, setUserColor] = useState('#01D1DE');
  const [currentNumber, setCurrentNumber] = useState(1);
  const [pageType, setPageType] = useState(PageType.PLAY);
  const [scores, setScores] = useState<number[]>([]);
  const [currentScore, setCurrentScore] = useState<number>();

  const router = useRouter();

  const calculateColorMatch = (): number => {
    const target = hexToRgb(colors[currentNumber-1]);
    const guessed = hexToRgb(userColor);

    const distance = Math.sqrt(
      Math.pow(target.r - guessed.r, 2) +
      Math.pow(target.g - guessed.g, 2) +
      Math.pow(target.b - guessed.b, 2)
    );

    const maxDistance = Math.sqrt(3 * Math.pow(255, 2));

    return Number(((1 - distance / maxDistance) * 100).toFixed(2));
  };

  function hexToRgb(hex: string): RGB {
    // Remove the leading # if it's there
    hex = hex.replace(/^#/, '');
  
    // Parse the hex string into its RGB components
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
  
    return { r, g, b };
  }

  useEffect(() => {
    setUserColor('#01D1DE');
    expectedRef.current?.style?.setProperty('background-color', colors[currentNumber-1]);
  }, [currentNumber]);

  useEffect(() => {
    userRef.current?.style?.setProperty('background-color', userColor);
  }, [userColor]);

  useEffect(() => {
    if (scores.length > 0) {
      console.log(scores);
      setCurrentScore(scores[scores.length-1]);
    }
  }, [scores]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-10 px-4 sm:px-24">
      <audio src="/audio/tap-notification.mp3" autoPlay={false} ref={buttonAudioRef} />
      <audio src="/audio/tap-finish-notification.mp3" autoPlay={false} ref={buttonFinishAudioRef} />
      <h1 className="text-2xl sm:text-6xl font-semibold text-primary uppercase text-center">
        {pageType == PageType.PLAY ? "match the color" : "your score is"} 
      </h1>
      <div className={`w-full bg-white p-12 sm:px-36 sm:py-${pageType == PageType.PLAY ? '24' : '20'} rounded-2xl border-[16px] border-primary mt-14 mx-4 relative`}>
        {pageType == PageType.PLAY && (
          <>
            {/* Play page */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-primary px-5 py-6 rounded-full w-24 h-24 flex flex-col justify-center items-center top-0 mt-[-55px]">
              <h3 className="text-4xl text-black font-semibold">{currentNumber}/5</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-36 items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-black text-2xl uppercase font-semibold text-center">Your Palette</h3>
                <div ref={userRef} className={`sm:w-64 sm:h-64 w-48 h-48 rounded-full bg-[${userColor}]`} />
              </div>
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-black text-2xl uppercase font-semibold text-center">Expected Result</h3>
                <div ref={expectedRef} className={`sm:w-64 sm:h-64 w-48 h-48 rounded-full bg-[${colors[currentNumber-1]}]`} />
              </div>
            </div>
            <ColorPicker onColorChanged={(value: string) => {
              setUserColor(value);
            }} />
            {/* End of play page */}
          </>
        )}
        
        {pageType == PageType.SCORE && (
          <div className="w-full text-center mb-10">
            <h3 className="text-black text-7xl sm:text-[200px] font-semibold">{currentScore}%</h3>
          </div>
        )}
        <button 
          onClick={async () => {
            if (pageType == PageType.PLAY) {
              await buttonAudioRef.current?.play();
              setTimeout(() => {
                try {
                  const result = calculateColorMatch();
                  setScores([...scores, result]);
                } catch (e) {
                  console.log(e)
                  setScores([...scores, 0]);
                }
                setPageType(PageType.SCORE);
              }, 100);
            } else {
              if (currentNumber == 5) {
                await buttonFinishAudioRef.current?.play();
                setTimeout(() => {
                  localStorage.setItem('scores', scores.join(','));
                  localStorage.setItem('colors', colors.join(','));
                  router.replace('/results');
                }, 1200);
              } else {
                await buttonAudioRef.current?.play();
                setTimeout(() => {
                  setCurrentNumber(currentNumber+1);
                  setPageType(PageType.PLAY)
                }, 100);
              }
            }
          }}
          className="w-full bg-gradient-to-r from-btn-background-from to-btn-background-to hover:from-btn-background-hover-from hover:to-btn-background-hover-to active:opacity-100 transition-all duration-200 text-black py-2 px-4 sm:px-16 font-bold text-lg sm:text-[20px] rounded-xl"
        >
          {pageType == PageType.PLAY ? 'Check my score' : currentNumber == 5 ? 'Check my overall score' : 'Next question'}
        </button>
      </div>
    </main>
  )
}