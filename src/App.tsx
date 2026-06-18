import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useRef } from 'react';

import BellBag from './assets/acnh/bellBag.png';
import BellBagShadow from './assets/acnh/bellBag_shadow.png';
import Isabelle from './assets/acnh/isabelle.png';
import IsabelleShadow from './assets/acnh/isabelle_shadow.png';
import KkSlider from './assets/acnh/kkSlider.png';
import KkSliderShadow from './assets/acnh/kkSlider_shadow.png';
import Leaf from './assets/acnh/leaf.png';
import LeafShadow from './assets/acnh/leaf_shadow.png';
import TomNook from './assets/acnh/tomNook.png';
import TomNookShadow from './assets/acnh/tomNook_shadow.png';
import Board from './components/Board';

export default function App() {
  const container = useRef<HTMLDivElement>(null);
  const TomNookRef = useRef<HTMLImageElement>(null);
  const IsabelleRef = useRef<HTMLImageElement>(null);
  const KkSliderRef = useRef<HTMLImageElement>(null);
  const BellBagRef = useRef<HTMLImageElement>(null);
  const LeafRef = useRef<HTMLImageElement>(null);
  const TomNookShadowRef = useRef<HTMLImageElement>(null);
  const IsabelleShadowRef = useRef<HTMLImageElement>(null);
  const KkSliderShadowRef = useRef<HTMLImageElement>(null);
  const BellBagShadowRef = useRef<HTMLImageElement>(null);
  const LeafShadowRef = useRef<HTMLImageElement>(null);

  gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

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
        bounds: container.current,
        dragResistance: 0.2,
        inertia: true,
        onDragEnd: function () {
          const containerRect = container.current.getBoundingClientRect();
          // const pieceRect = ref.current.getBoundingClientRect();
          const shadowRect = shadowRef.current.getBoundingClientRect();

          // const currentX = gsap.getProperty(ref.current, 'x') as number;
          // const currentY = gsap.getProperty(ref.current, 'y') as number;

          // const x = shadowRect.left - pieceRect.left - currentX;
          // const y = shadowRect.top - pieceRect.top - currentY;

          const x = shadowRect.left - containerRect.left;
          const y = shadowRect.top - containerRect.top;

          if (this.hitTest(shadowRef.current, '70%')) {
            // console.log("it's over it!");
            gsap.to(ref.current, { x, y, duration: 0.3 });
            this.disable();
          }
        },
      }),
    );
  });

  return (
    <>
      <main className='container mx-auto flex h-full h-screen w-full flex-col justify-center gap-y-8 p-10'>
        <Board ref={container}>
          {[
            { src: TomNookShadow, ref: TomNookShadowRef, pos: 'left-[10%] top-[15%]' },
            { src: IsabelleShadow, ref: IsabelleShadowRef, pos: 'left-[23%] top-[55%]' },
            { src: KkSliderShadow, ref: KkSliderShadowRef, pos: 'left-[40%] top-[15%]' },
            { src: BellBagShadow, ref: BellBagShadowRef, pos: 'left-[58%] top-[55%]' },
            { src: LeafShadow, ref: LeafShadowRef, pos: 'left-[70%] top-[15%]' },
            { src: TomNook, ref: TomNookRef },
            { src: Isabelle, ref: IsabelleRef },
            { src: KkSlider, ref: KkSliderRef },
            { src: BellBag, ref: BellBagRef },
            { src: Leaf, ref: LeafRef },
          ].map(({ src, ref, pos }, i) => (
            <img
              key={i}
              src={src}
              ref={ref}
              className={clsx('w-[200px]', pos ? `pointer-events-none absolute ${pos}` : '')}
            />
          ))}
        </Board>
      </main>
    </>
  );
}
