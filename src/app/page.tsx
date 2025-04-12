import FAQ from './components/ui/FAQ';
import FeatureGrid from './components/ui/FeaturedGridCards';
import Hero from './components/ui/Hero';
import JobMarketplace from './components/ui/JobMarkectPlace';
import Services from './components/ui/Services';
import YouTubeClubIntro from './components/ui/VideoIntro';
import CircularScroller from './components/ui/YouTubeChannelScroller';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="relative top-[-5cm]">
        <CircularScroller />
      </div>
      <FeatureGrid />
      <Services />
      <YouTubeClubIntro />
      <JobMarketplace />
      <FAQ />
    </div>
  );
}
