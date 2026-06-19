import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        // ease: 'power3.out',
        ease: 'power1.out',
      },
    );

    gsap.to(ref.current, {
      y: -20,
      duration: 1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // gsap.to('.dot', {
    //   y: -8,
    //   duration: 1,
    //   ease: 'sine.inOut',
    //   yoyo: true,
    //   repeat: -1,
    //   repeatDelay: 0.5,
    //   // stagger: {
    //   //   each: 0.5,
    //   //   repeat: -1,
    //   // },
    // });
  });

  return (
    <h1 className='text-center font-mono text-2xl text-neutral-600' ref={ref}>
      Loading
      <span className='dot inline-block'>.</span>
      <span className='dot inline-block'>.</span>
      <span className='dot inline-block'>.</span>
    </h1>
  );
}
