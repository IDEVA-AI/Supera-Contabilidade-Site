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
      <Services />
      <Steps />
      <About />
      <Reviews />
      <Faq />
      <BlogPreview />
      <CallToAction />
    </>
  );
}
