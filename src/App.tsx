import { useRef } from 'react';
import Board from './components/Board';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import TomNook from './assets/acnh/tomNook.png';
import TomNookShadow from './assets/acnh/tomNook_shadow.png';
import Isabelle from './assets/acnh/isabelle.png';
import IsabelleShadow from './assets/acnh/isabelle_shadow.png';
import KkSlider from './assets/acnh/kkSlider.png';
import KkSliderShadow from './assets/acnh/kkSlider_shadow.png';
import MoneyBag from './assets/acnh/moneyBag.png';
import MoneyBagShadow from './assets/acnh/moneyBag_shadow.png';
import Acnh from './assets/acnh/acnh.png';
import AcnhShadow from './assets/acnh/acnh_shadow.png';

import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

export default function App() {
  gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

  const container = useRef<HTMLDivElement>(null);
  const tom = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    Draggable.create(tom.current, {
      type: 'x,y',
      bounds: container.current,
      dragResistance: 0.2,
      inertia: true,
    });
  });

  return (
    <>
      <main className='container mx-auto flex h-full h-screen w-full flex-col justify-center gap-y-8 p-10'>
        <Board ref={container}>
          {[
            { src: TomNookShadow, pos: 'left-[10%] top-[15%]' },
            { src: IsabelleShadow, pos: 'left-[23%] top-[55%]' },
            { src: KkSliderShadow, pos: 'left-[40%] top-[15%]' },
            { src: MoneyBagShadow, pos: 'left-[58%] top-[55%]' },
            { src: AcnhShadow, pos: 'left-[70%] top-[15%]' },
          ].map(({ src, pos }, i) => (
            <img key={i} src={src} className={`pointer-events-none absolute w-[200px] ${pos}`} />
          ))}
          <img src={TomNook} ref={tom} className='w-[200px]' />
        </Board>
      </main>
    </>
  );
}
