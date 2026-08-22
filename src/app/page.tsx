import {
  ContactSection,
  DeliveryDetailsSection,
  FaqSection,
  GalleryPreview,
  HeroSection,
  JourneySection,
  MealCategoriesSection,
  SubscriptionSection,
  TestimonialsSection,
  WeeklyMenuPreview,
  WhyChooseUsSection,
} from "@/components/site/home-sections";

import { TopMarquee } from "@/components/site/top-marquee";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TopMarquee />
      <WeeklyMenuPreview />
      <MealCategoriesSection />
      <WhyChooseUsSection />
      <DeliveryDetailsSection />
      <JourneySection />
      <SubscriptionSection />
      <GalleryPreview />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
