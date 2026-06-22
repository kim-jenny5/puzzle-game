import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

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

const FRUITS = [Apple, Cherry, Orange, Peach, Pear];

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const TomNookShadowRef = useRef<HTMLImageElement>(null);
  const IsabelleShadowRef = useRef<HTMLImageElement>(null);
  const KkSliderShadowRef = useRef<HTMLImageElement>(null);
  const BellBagShadowRef = useRef<HTMLImageElement>(null);
  const LeafShadowRef = useRef<HTMLImageElement>(null);

  const starRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLParagraphElement>(null);
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
        y: -100,
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
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5 + Math.random() * 0.5,
        ease: 'power1.out',
      },
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

  const onAllPiecesPlaced = () => {
    const tl = gsap.timeline();
    tl.to(overlayRef.current, { opacity: 0.6, duration: 0.8, ease: 'power2.out' })
      .to(starRef.current, {
        opacity: 1,
        duration: 2.5,
        ease: 'power3.out',
        x: '100vw',
        zIndex: 50,
      })
      .fromTo(
        textBoxRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '<',
      );
  };

  const handleClick = () => window.location.reload();

  return (
    <>
      <div
        ref={starRef}
        className='absolute flex h-screen w-screen items-center text-9xl opacity-0'
      >
        ⭐
      </div>
      <main className='relative flex h-screen w-full flex-col justify-center overflow-hidden bg-stone-100 p-10'>
        <div
          ref={overlayRef}
          className='pointer-events-none absolute inset-0 z-20 bg-black opacity-0'
        />
        <div
          ref={textBoxRef}
          className='absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-5 opacity-0'
        >
          <p className='font-mono text-3xl font-semibold text-white'>Yay! Play again?</p>
          <button
            onClick={handleClick}
            className='cursor-pointer rounded-full bg-white px-8 py-2.5 font-mono text-sm text-neutral-800 transition-opacity hover:opacity-75'
          >
            Refresh
          </button>
        </div>
        {/* {isLoading ? (
          // <LoadingScreen />
          <div className='flex flex-col items-center gap-y-8' ref={loadingRef}>
            <div className='mx-auto flex gap-x-8'>
              {FRUITS.map((fruit, i) => (
                <img key={i} src={fruit} className='fruit pointer-events-none inline-block w-12' />
              ))}
            </div>
            <p className='font-mono text-lg' ref={dotsRef}>
              Loading
            </p>
          </div>
        ) : ( */}
        <>
          <Pieces
            piecesRef={piecesRef}
            TomNookShadowRef={TomNookShadowRef}
            IsabelleShadowRef={IsabelleShadowRef}
            KkSliderShadowRef={KkSliderShadowRef}
            BellBagShadowRef={BellBagShadowRef}
            LeafShadowRef={LeafShadowRef}
            onAllPiecesPlaced={onAllPiecesPlaced}
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
        {/* )} */}
      </main>
    </>
  );
}
