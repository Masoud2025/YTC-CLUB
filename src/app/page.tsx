import FAQ from './components/ui/FAQ';
import FeatureGrid from './components/ui/FeaturedGridCards';
import Hero from './components/ui/Hero';
import JobMarketplace from './components/ui/JobMarkectPlace';
import PortfolioSection from './components/ui/PortfolioSection';
import Services from './components/ui/Services';
import StatsBanner from './components/ui/StatusBanner';
import YouTubeClubIntro from './components/ui/VideoIntro';
import CircularScroller from './components/ui/YouTubeChannelScroller';
import RandomDiscountGenerator from './components/ui/RandomDiscountGenerator.';
export default function Home() {
  return (
    <div>
      <Hero />
      <CircularScroller />
      <FeatureGrid />
      <Services />
      <StatsBanner />
      <YouTubeClubIntro />
      <JobMarketplace />
      <PortfolioSection />
      <FAQ />
      <RandomDiscountGenerator minDiscount={5} maxDiscount={30} />
    </div>
  );
}
