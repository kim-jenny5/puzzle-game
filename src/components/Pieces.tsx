import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { type RefObject, useMemo, useRef } from 'react';

gsap.registerPlugin(Physics2DPlugin);

import BellBag from '../assets/PuzzlePieces/BellBag.svg';
import Isabelle from '../assets/PuzzlePieces/Isabelle.svg';
import KkSlider from '../assets/PuzzlePieces/KkSlider.svg';
import Leaf from '../assets/PuzzlePieces/Leaf.svg';
import TomNook from '../assets/PuzzlePieces/TomNook.svg';

const SPARKLE_SHAPES = ['✦', '✧', '✸', '✺', '★'];
const SPARKLE_COLORS = [
  'text-yellow-400',
  'text-pink-400',
  'text-blue-300',
  'text-lime-400',
  'text-orange-400',
  'text-purple-400',
];

function spawnSparkles(piece: HTMLElement) {
  const rect = piece.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const shape = SPARKLE_SHAPES[Math.floor(Math.random() * SPARKLE_SHAPES.length)];
    const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
    const size = 10 + Math.random() * 10;
    const el = document.createElement('div');

    el.textContent = shape;
    el.classList.add(color);
    el.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      font-size: ${size}px;
      pointer-events: none;
      z-index: 9999;
      line-height: 1;
    `;

    document.body.appendChild(el);

    gsap.to(el, {
      duration: 1.2 + Math.random() * 0.6,
      physics2D: {
        velocity: 250 + Math.random() * 350,
        angle: Math.random() * 360,
        gravity: 600,
        friction: 0.05,
      },
      rotation: (Math.random() - 0.5) * 720,
      opacity: 0,
      onComplete: () => el.remove(),
    });
  }
}

interface PiecesProps {
  piecesRef: RefObject<HTMLDivElement | null>;
  TomNookShadowRef: RefObject<HTMLImageElement | null>;
  IsabelleShadowRef: RefObject<HTMLImageElement | null>;
  KkSliderShadowRef: RefObject<HTMLImageElement | null>;
  BellBagShadowRef: RefObject<HTMLImageElement | null>;
  LeafShadowRef: RefObject<HTMLImageElement | null>;
  onAllPiecesPlaced: () => void;
}

export default function Pieces({
  piecesRef,
  TomNookShadowRef,
  IsabelleShadowRef,
  KkSliderShadowRef,
  BellBagShadowRef,
  LeafShadowRef,
  onAllPiecesPlaced,
}: PiecesProps) {
  const TomNookRef = useRef<HTMLImageElement>(null);
  const IsabelleRef = useRef<HTMLImageElement>(null);
  const KkSliderRef = useRef<HTMLImageElement>(null);
  const BellBagRef = useRef<HTMLImageElement>(null);
  const LeafRef = useRef<HTMLImageElement>(null);

  const placedCount = useRef(0);

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
          if (!ref.current || !shadowRef.current) return;

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
              onComplete: () => {
                spawnSparkles(ref.current);
                placedCount.current += 1;
                if (placedCount.current === pieces.length) onAllPiecesPlaced();
              },
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
