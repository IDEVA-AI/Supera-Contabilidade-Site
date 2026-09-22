import {
  About,
  BlogPreview,
  CallToAction,
  Faq,
  Hero,
  Reviews,
  Services,
  Steps,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Steps />
      <Reviews />
      <Faq />
      <BlogPreview />
      <CallToAction />
    </>
  );
}
