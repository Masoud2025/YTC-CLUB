// app/fonts.ts
import localFont from 'next/font/local';

// Load all Morabba font weights
export const morabba = localFont({
  src: [
    {
      path: 'fonts/Morabba/ttf/Morabba-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: 'fonts/Morabba/ttf/Morabba-Heavy.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: 'fonts/Morabba/ttf/Morabba-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/Morabba/ttf/Morabba-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    // Add other weights if needed
    {
      path: 'public/fonts/Morabba/ttf/Morabba-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/Morabba/ttf/Morabba-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/Morabba/ttf/Morabba-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/Morabba/ttf/Morabba-UltraLight.ttf',
      weight: '200',
      style: 'normal',
    },
  ],
  variable: '--font-morabba',
  display: 'swap',
});
