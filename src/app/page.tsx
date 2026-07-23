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

export default function Home() {
  return (
    <>
      <HeroSection />
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
