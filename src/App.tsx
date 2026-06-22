import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import BellBagShadow from './assets/PuzzlePieces/BellBag_Shadow.svg';
import IsabelleShadow from './assets/PuzzlePieces/Isabelle_Shadow.svg';
import KkSliderShadow from './assets/PuzzlePieces/KkSlider_Shadow.svg';
import LeafShadow from './assets/PuzzlePieces/Leaf_Shadow.svg';
import TomNookShadow from './assets/PuzzlePieces/TomNook_Shadow.svg';
import Board from './components/Board';
import LoadingScreen from './components/LoadingScreen';
import Pieces from './components/Pieces';
import VictoryOverlay from './components/VictoryOverlay';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const TomNookShadowRef = useRef<HTMLImageElement>(null);
  const IsabelleShadowRef = useRef<HTMLImageElement>(null);
  const KkSliderShadowRef = useRef<HTMLImageElement>(null);
  const BellBagShadowRef = useRef<HTMLImageElement>(null);
  const LeafShadowRef = useRef<HTMLImageElement>(null);
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

  return (
    <main className='relative flex h-screen w-full flex-col justify-center overflow-hidden bg-stone-100 p-10'>
      <LoadingScreen isLoading={isLoading} onLoadComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <>
          <Pieces
            piecesRef={piecesRef}
            TomNookShadowRef={TomNookShadowRef}
            IsabelleShadowRef={IsabelleShadowRef}
            KkSliderShadowRef={KkSliderShadowRef}
            BellBagShadowRef={BellBagShadowRef}
            LeafShadowRef={LeafShadowRef}
            onAllPiecesPlaced={() => setGameComplete(true)}
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
      <VictoryOverlay gameComplete={gameComplete} />
    </main>
  );
}
