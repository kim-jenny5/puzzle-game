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
  gameComplete: boolean;
  onLoadComplete: () => void;
}

export default function LoadingScreen({ isLoading, gameComplete, onLoadComplete }: LoadingScreenProps) {
  const loadingRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLParagraphElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loadingRef.current) return;

      gsap.killTweensOf(loadingRef.current);
      gsap.killTweensOf('.fruit');
      gsap.to(loadingRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.in',
        onComplete: onLoadComplete,
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
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
          if (dotsRef.current) dotsRef.current.textContent = 'Loading' + '.'.repeat(dotCount);
        },
      },
    );
  });

  useEffect(() => {
    if (!gameComplete) return;

    const tl = gsap.timeline();
    tl.to(overlayRef.current, { opacity: 0.6, duration: 0.8, ease: 'power2.out' })
      .to(starRef.current, { opacity: 1, duration: 2.5, ease: 'power3.out', x: '100vw', zIndex: 50 })
      .fromTo(
        textBoxRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '<',
      );
  }, [gameComplete]);

  const handleClick = () => window.location.reload();

  return (
    <>
      <div ref={starRef} className='fixed flex h-screen w-screen items-center text-9xl opacity-0'>
        ⭐
      </div>
      <div ref={overlayRef} className='pointer-events-none fixed inset-0 z-20 bg-black opacity-0' />
      <div
        ref={textBoxRef}
        className='fixed left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-5 opacity-0'
      >
        <p className='font-mono text-3xl font-semibold text-white'>Yay! Play again?</p>
        <button
          onClick={handleClick}
          className='cursor-pointer rounded-full bg-white px-8 py-2.5 font-mono text-sm text-neutral-800 transition-opacity hover:opacity-75'
        >
          Refresh
        </button>
      </div>
      {isLoading && (
        <div ref={loadingRef} className='flex flex-col items-center gap-y-8'>
          <div className='mx-auto flex gap-x-8'>
            {FRUITS.map((fruit, i) => (
              <img key={i} src={fruit} className='fruit pointer-events-none inline-block w-12' />
            ))}
          </div>
          <p className='font-mono text-lg' ref={dotsRef}>
            Loading
          </p>
        </div>
      )}
    </>
  );
}
