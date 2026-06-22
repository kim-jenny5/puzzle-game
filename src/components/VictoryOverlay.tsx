import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';

interface VictoryOverlayProps {
  gameComplete: boolean;
}

export default function VictoryOverlay({ gameComplete }: VictoryOverlayProps) {
  const victoryRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gameComplete) return;

      const tl = gsap.timeline();
      tl.to('.overlay', { opacity: 0.6, duration: 0.8, ease: 'power2.out' }).fromTo(
        '.text-box',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '<',
      );
    },
    { scope: victoryRef, dependencies: [gameComplete] },
  );

  const handleClick = () => window.location.reload();

  return (
    <div ref={victoryRef}>
      <div className='overlay pointer-events-none fixed inset-0 z-20 bg-black opacity-0' />
      <div className='text-box fixed top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-5 opacity-0'>
        <p className='font-mono text-3xl font-semibold text-white'>Yay! Play again?</p>
        <button
          onClick={handleClick}
          className='cursor-pointer rounded-full bg-white px-8 py-2.5 font-mono text-sm text-neutral-800 transition-opacity hover:opacity-75'
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
