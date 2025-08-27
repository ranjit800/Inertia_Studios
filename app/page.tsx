import GridSection from "@/components/GridSection";
import Hero from "@/components/Hero";
import IdeasSection from "@/components/IdeasSection";
import LogoMarquee from "@/components/LogoMarquee";
import MarqueeComponent from "@/components/MarqueeComponent";
import VideoSection from "@/components/VideoSection";
import WeAreInertia from "@/components/WeAreInertia";
import WhyPartner from "@/components/WhyPartner";

export default function Home() {
  return (
    <>
    <Hero/>
    <WhyPartner/>
    <MarqueeComponent/>
    <GridSection/>
    <WeAreInertia/>
    <LogoMarquee/>
    <VideoSection/>
    <IdeasSection/>
    </>
  )
}