import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import Apple from '../assets/Fruits/Apple.svg';
import Cherry from '../assets/Fruits/Cherry.svg';
import Orange from '../assets/Fruits/Orange.svg';
import Peach from '../assets/Fruits/Peach.svg';
import Pear from '../assets/Fruits/Pear.svg';

const FRUITS = [Apple, Cherry, Orange, Peach, Pear];

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadComplete: () => void;
}

export default function LoadingScreen({ isLoading, onLoadComplete }: LoadingScreenProps) {
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loadingRef.current) return;
      gsap.to(loadingRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.in',
        onComplete: onLoadComplete,
      });
    }, 4000);
    return () => clearTimeout(timer);
  });

  useGSAP(
    () => {
      if (!loadingRef.current) return;

      gsap.fromTo(
        loadingRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 + Math.random() * 0.5, ease: 'power1.out' },
      );

      gsap.to('.fruit', {
        keyframes: [
          { y: 10, duration: 0.4 },
          { y: -10, duration: 0.4 },
          { y: 0, duration: 0.4 },
        ],
        ease: 'sine.inOut',
        repeat: -1,
        stagger: 0.15,
      });

      let dotCount = 0;
      gsap.to(
        {},
        {
          duration: 0.4,
          repeat: -1,
          onRepeat: () => {
            dotCount = (dotCount + 1) % 4;
            const dotsEl = loadingRef.current?.querySelector('p');
            if (dotsEl) dotsEl.textContent = 'Loading' + '.'.repeat(dotCount);
          },
        },
      );
    },
    { scope: loadingRef, dependencies: [isLoading] },
  );

  return (
    <>
      {isLoading && (
        <div ref={loadingRef} className='flex flex-col items-center gap-y-8'>
          <div className='mx-auto flex gap-x-8'>
            {FRUITS.map((fruit, i) => (
              <img key={i} src={fruit} className='fruit pointer-events-none inline-block w-12' />
            ))}
          </div>
          <p className='font-mono text-lg'>Loading</p>
        </div>
      )}
    </>
  );
}
