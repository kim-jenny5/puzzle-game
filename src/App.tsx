import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import Apple from './assets/Fruits/Apple.svg';
import Cherry from './assets/Fruits/Cherry.svg';
import Orange from './assets/Fruits/Orange.svg';
import Peach from './assets/Fruits/Peach.svg';
import Pear from './assets/Fruits/Pear.svg';

import BellBagShadow from './assets/PuzzlePieces/BellBag_Shadow.svg';
import IsabelleShadow from './assets/PuzzlePieces/Isabelle_Shadow.svg';
import KkSliderShadow from './assets/PuzzlePieces/KkSlider_Shadow.svg';
import LeafShadow from './assets/PuzzlePieces/Leaf_Shadow.svg';
import TomNookShadow from './assets/PuzzlePieces/TomNook_Shadow.svg';
import Board from './components/Board';
// import LoadingScreen from './components/LoadingScreen';
import Pieces from './components/Pieces';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const TomNookShadowRef = useRef<HTMLImageElement>(null);
  const IsabelleShadowRef = useRef<HTMLImageElement>(null);
  const KkSliderShadowRef = useRef<HTMLImageElement>(null);
  const BellBagShadowRef = useRef<HTMLImageElement>(null);
  const LeafShadowRef = useRef<HTMLImageElement>(null);

  const loadingRef = useRef<HTMLHeadingElement>(null);
  const boardWrapperRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      const zoomIn = { scale: 0.05, opacity: 0, transformPerspective: 900, z: -1500 };
      const zoomOut = { scale: 1, opacity: 1, z: 0, duration: 1.3, ease: 'power3.out' };

      if (containerRef.current) {
        gsap.fromTo(containerRef.current, zoomIn, zoomOut);
      }
      if (piecesRef.current) {
        gsap.fromTo(piecesRef.current, zoomIn, { ...zoomOut, delay: 0.5 });
      }
    }
  }, [isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loadingRef.current) return;

      gsap.killTweensOf(loadingRef.current);
      gsap.killTweensOf('.dot');
      gsap.to(loadingRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.in',
        onComplete: () => setIsLoading(false),
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!loadingRef.current) return;

    gsap.fromTo(
      loadingRef.current,
      {
        y: 25,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power1.out',
      },
    );

    gsap.to(loadingRef.current, {
      y: -25,
      duration: 1.2,
      yoyo: true,
      ease: 'sine.inOut',
      repeat: -1,
    });

    gsap.to('.dot', {
      keyframes: [
        { y: 8, duration: 0.4 },
        { y: -8, duration: 0.4 },
        { y: 0, duration: 0.4 },
      ],
      ease: 'sine.inOut',
      repeat: -1,
      stagger: 0.15,
    });
  });

  return (
    <>
      <main className='relative flex h-screen w-full flex-col justify-center overflow-hidden bg-stone-100 p-10'>
        {isLoading ? (
          // <LoadingScreen />
          <h1 className='text-center font-mono text-2xl text-neutral-600' ref={loadingRef}>
            Loading
            <span className='dot inline-block'>.</span>
            <span className='dot inline-block'>.</span>
            <span className='dot inline-block'>.</span>
          </h1>
        ) : (
          <>
            <Pieces
              piecesRef={piecesRef}
              TomNookShadowRef={TomNookShadowRef}
              IsabelleShadowRef={IsabelleShadowRef}
              KkSliderShadowRef={KkSliderShadowRef}
              BellBagShadowRef={BellBagShadowRef}
              LeafShadowRef={LeafShadowRef}
            />
            <Board containerRef={containerRef} boardWrapperRef={boardWrapperRef}>
              {[
                { src: TomNookShadow, ref: TomNookShadowRef, pos: 'left-[10%] top-[15%]' },
                { src: IsabelleShadow, ref: IsabelleShadowRef, pos: 'left-[23%] top-[55%]' },
                { src: KkSliderShadow, ref: KkSliderShadowRef, pos: 'left-[40%] top-[15%]' },
                { src: BellBagShadow, ref: BellBagShadowRef, pos: 'left-[58%] top-[55%]' },
                { src: LeafShadow, ref: LeafShadowRef, pos: 'left-[70%] top-[15%]' },
              ].map(({ src, ref, pos }, i) => (
                <img
                  key={i}
                  src={src}
                  ref={ref}
                  className={`pointer-events-none absolute ${pos} w-[200px]`}
                />
              ))}
            </Board>
          </>
        )}
      </main>
    </>
  );
}
