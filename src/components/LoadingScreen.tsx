import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';

export default function LoadingScreen() {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        y: 25,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power1.out',
      },
    );

    gsap.to(ref.current, {
      y: -25,
      duration: 1.2,
      yoyo: true,
      ease: 'sine.inOut',
      repeat: -1,
    });

    gsap.to('.dot', {
      keyframes: [
        { y: 8, duration: 0.4 },
        { y: -8, duration: 0.4 },
        { y: 0, duration: 0.4 },
      ],
      ease: 'sine.inOut',
      repeat: -1,
      stagger: 0.15,
    });
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
