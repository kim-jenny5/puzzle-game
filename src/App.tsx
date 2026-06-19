import { useRef } from 'react';

import BellBagShadow from './assets/acnh/bellBag_shadow.png';
import IsabelleShadow from './assets/acnh/isabelle_shadow.png';
import KkSliderShadow from './assets/acnh/kkSlider_shadow.png';
import LeafShadow from './assets/acnh/leaf_shadow.png';
import TomNookShadow from './assets/acnh/tomNook_shadow.png';
import Board from './components/Board';
import Pieces from './components/Pieces';

export default function App() {
  const container = useRef<HTMLDivElement>(null);
  const TomNookShadowRef = useRef<HTMLImageElement>(null);
  const IsabelleShadowRef = useRef<HTMLImageElement>(null);
  const KkSliderShadowRef = useRef<HTMLImageElement>(null);
  const BellBagShadowRef = useRef<HTMLImageElement>(null);
  const LeafShadowRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <main className='relative flex h-screen w-full flex-col justify-center overflow-hidden p-10'>
        <Pieces
          TomNookShadowRef={TomNookShadowRef}
          IsabelleShadowRef={IsabelleShadowRef}
          KkSliderShadowRef={KkSliderShadowRef}
          BellBagShadowRef={BellBagShadowRef}
          LeafShadowRef={LeafShadowRef}
        />
        <Board ref={container}>
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
      </main>
    </>
  );
}
