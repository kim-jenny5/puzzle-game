import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { type RefObject, useMemo, useRef } from 'react';

import BellBag from '../assets/PuzzlePieces/BellBag.svg';
import Isabelle from '../assets/PuzzlePieces/Isabelle.svg';
import KkSlider from '../assets/PuzzlePieces/KkSlider.svg';
import Leaf from '../assets/PuzzlePieces/Leaf.svg';
import TomNook from '../assets/PuzzlePieces/TomNook.svg';

const SPARKLE_SHAPES = ['✦', '✧', '✸', '✺', '★'];
const SPARKLE_COLORS = ['#FFD700', '#FF6B9D', '#7EB8F7', '#A8E063', '#FF9A56', '#C084FC'];

// const sparkleModules = import.meta.glob<{ default: string }>('../assets/Sparkles/*.svg', {
//   eager: true,
// });
// const SPARKLE_SRCS = Object.values(sparkleModules).map((m) => m.default);

function spawnSparkles(piece: HTMLElement, container: HTMLElement) {
  const pieceRect = piece.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const cx = pieceRect.left - containerRect.left + pieceRect.width / 2;
  const cy = pieceRect.top - containerRect.top + pieceRect.height / 2;

  const shuffled = [...SPARKLE_SHAPES].sort(() => Math.random() - 0.5).slice(0, 3);

  shuffled.forEach((char, i) => {
    const size = 18 + Math.random() * 14;
    const angle = (i / 3) * 360 + Math.random() * 60 - 30;
    const distance = 60 + Math.random() * 50;
    const rad = (angle * Math.PI) / 180;

    const el = document.createElement('div');
    el.textContent = char;
    el.style.cssText = `
      position: absolute;
      left: ${cx - size / 2}px;
      top: ${cy - size / 2}px;
      font-size: ${size}px;
      color: ${SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)]};
      pointer-events: none;
      z-index: 50;
      line-height: 1;
    `;
    container.appendChild(el);

    gsap.fromTo(
      el,
      { x: 0, y: 0, scale: 0.2, opacity: 1, rotate: 0 },
      {
        x: Math.cos(rad) * distance,
        y: Math.sin(rad) * distance,
        scale: 1.2,
        opacity: 0,
        rotate: (Math.random() - 0.5) * 300,
        duration: 0.65 + Math.random() * 0.3,
        ease: 'power2.out',
        onComplete: () => el.remove(),
      },
    );
  });
}

interface PiecesProps {
  piecesRef: RefObject<HTMLDivElement | null>;
  TomNookShadowRef: RefObject<HTMLImageElement | null>;
  IsabelleShadowRef: RefObject<HTMLImageElement | null>;
  KkSliderShadowRef: RefObject<HTMLImageElement | null>;
  BellBagShadowRef: RefObject<HTMLImageElement | null>;
  LeafShadowRef: RefObject<HTMLImageElement | null>;
}

export default function Pieces({
  piecesRef,
  TomNookShadowRef,
  IsabelleShadowRef,
  KkSliderShadowRef,
  BellBagShadowRef,
  LeafShadowRef,
}: PiecesProps) {
  const TomNookRef = useRef<HTMLImageElement>(null);
  const IsabelleRef = useRef<HTMLImageElement>(null);
  const KkSliderRef = useRef<HTMLImageElement>(null);
  const BellBagRef = useRef<HTMLImageElement>(null);
  const LeafRef = useRef<HTMLImageElement>(null);

  const pieces = [
    { src: TomNook, ref: TomNookRef },
    { src: Isabelle, ref: IsabelleRef },
    { src: KkSlider, ref: KkSliderRef },
    { src: BellBag, ref: BellBagRef },
    { src: Leaf, ref: LeafRef },
  ];

  const initialPiecePositions = useMemo(() => {
    return pieces.map((_, i) => {
      const isLeftSide = i % 2 === 0;

      return {
        left: isLeftSide ? `${Math.random() * 15 + 2}%` : `${Math.random() * 15 + 78}%`,
        top: `${Math.random() * 70 + 10}%`,
      };
    });
  }, []);

  gsap.registerPlugin(useGSAP, Draggable);

  useGSAP(() => {
    [
      [TomNookRef, TomNookShadowRef],
      [IsabelleRef, IsabelleShadowRef],
      [KkSliderRef, KkSliderShadowRef],
      [BellBagRef, BellBagShadowRef],
      [LeafRef, LeafShadowRef],
    ].map(([ref, shadowRef]) =>
      Draggable.create(ref.current, {
        type: 'x,y',
        dragResistance: 0.2,
        inertia: true,
        onDragEnd: function () {
          const pieceRect = ref.current.getBoundingClientRect();
          const shadowRect = shadowRef.current.getBoundingClientRect();

          const currentX = gsap.getProperty(ref.current, 'x') as number;
          const currentY = gsap.getProperty(ref.current, 'y') as number;

          const x = currentX + (shadowRect.left - pieceRect.left);
          const y = currentY + (shadowRect.top - pieceRect.top);

          if (this.hitTest(shadowRef.current, '70%')) {
            gsap.to(ref.current, {
              x,
              y,
              duration: 0.3,
              onComplete: () => spawnSparkles(ref.current, piecesRef.current!),
            });
            this.disable();
            ref.current.classList.add('pointer-events-none');
          }
        },
      }),
    );
  });

  return (
    <div ref={piecesRef} className='absolute inset-0 z-10'>
      {pieces.map(({ src, ref }, i) => (
        <img
          key={i}
          src={src}
          ref={ref}
          className='absolute z-10 w-[200px]'
          style={{
            left: initialPiecePositions[i].left,
            top: initialPiecePositions[i].top,
          }}
        />
      ))}
    </div>
  );
}
