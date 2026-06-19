import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { type RefObject, useMemo, useRef } from 'react';

import BellBag from '../assets/acnh/bellBag.png';
import Isabelle from '../assets/acnh/isabelle.png';
import KkSlider from '../assets/acnh/kkSlider.png';
import Leaf from '../assets/acnh/leaf.png';
import TomNook from '../assets/acnh/tomNook.png';

interface PiecesProps {
  TomNookShadowRef: RefObject<HTMLImageElement | null>;
  IsabelleShadowRef: RefObject<HTMLImageElement | null>;
  KkSliderShadowRef: RefObject<HTMLImageElement | null>;
  BellBagShadowRef: RefObject<HTMLImageElement | null>;
  LeafShadowRef: RefObject<HTMLImageElement | null>;
}

export default function Pieces({
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
            gsap.to(ref.current, { x, y, duration: 0.3 });
            this.disable();
            ref.current.classList.add('pointer-events-none');
          }
        },
      }),
    );
  });

  return (
    <>
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
    </>
  );
}
