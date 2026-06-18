import type { ReactNode, RefObject } from 'react';

interface BoardProps {
  children?: ReactNode;
  ref: RefObject<HTMLDivElement | null>;
}

export default function Board({ children, ref }: BoardProps) {
  const frameGradient = 'linear-gradient(145deg, #d4a84a 0%, #c39a3e 40%, #a87e2e 100%)';
  const surfaceBase = 'linear-gradient(180deg, #e6c97a 0%, #dab868 50%, #cfab5a 100%)';
  const grainFine =
    'repeating-linear-gradient(90deg, rgba(140,110,40,0.08) 0px, rgba(140,110,40,0.08) 1px, rgba(255,240,190,0.04) 1px, rgba(255,240,190,0.04) 3px, rgba(140,110,40,0.05) 3px, rgba(140,110,40,0.05) 4px, transparent 4px, transparent 9px)';
  const grainMedium =
    'repeating-linear-gradient(90deg, rgba(160,130,50,0.12) 0px, transparent 18px, rgba(255,230,170,0.06) 36px, transparent 60px, rgba(140,110,40,0.10) 90px, transparent 130px)';
  const grainKnots =
    'radial-gradient(ellipse 60px 12px at 22% 35%, rgba(140,110,40,0.14), transparent 70%), radial-gradient(ellipse 80px 14px at 70% 65%, rgba(140,110,40,0.11), transparent 70%), radial-gradient(ellipse 40px 9px at 85% 20%, rgba(140,110,40,0.13), transparent 70%)';

  return (
    <div className='flex w-full items-center justify-center'>
      <div className='relative aspect-[4/3] w-full max-w-screen-lg' ref={ref}>
        <div
          className='absolute inset-0 rounded-[2.5rem]'
          style={{
            background: frameGradient,
          }}
        >
          <div
            className='pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-40 mix-blend-overlay'
            style={{
              background:
                'repeating-linear-gradient(90deg, rgba(0,0,0,0.25) 0px, transparent 2px, rgba(255,255,255,0.05) 4px, transparent 7px)',
            }}
          />
        </div>
        <div
          className='absolute overflow-hidden rounded-[1.75rem]'
          style={{
            top: '6%',
            left: '4.5%',
            right: '4.5%',
            bottom: '6%',
            background: surfaceBase,
            boxShadow:
              'inset 0 6px 12px rgba(100,80,20,0.45), inset 0 -4px 10px rgba(100,80,20,0.32), inset 6px 0 12px rgba(100,80,20,0.28), inset -6px 0 12px rgba(100,80,20,0.28)',
          }}
        >
          <div
            className='pointer-events-none absolute inset-0'
            style={{ background: grainKnots, opacity: 0.85 }}
          />
          <div
            className='pointer-events-none absolute inset-0 mix-blend-multiply'
            style={{ background: grainMedium, opacity: 0.55 }}
          />
          <div
            className='pointer-events-none absolute inset-0 mix-blend-overlay'
            style={{ background: grainFine, opacity: 0.7 }}
          />

          <div
            className='pointer-events-none absolute inset-0'
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 55%, rgba(100,80,20,0.20) 100%)',
            }}
          />
          <div className='absolute inset-0'>{children}</div>
        </div>
      </div>
    </div>
  );
}
