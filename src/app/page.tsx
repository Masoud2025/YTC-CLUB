import Hero from './components/ui/Hero';
import CircularScroller from './components/ui/YouTubeChannelScroller';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="relative top-[-5cm]">
        <CircularScroller />
      </div>
    </div>
  );
}
