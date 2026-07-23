import type { Metadata } from "next";
import { ChooseMealExperience } from "@/components/order/choose-meal-experience";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Choose Your Meal",
  description:
    "Choose Custom Meal, Mini Platter or Full Platter from one ordering page with subscription and WhatsApp checkout.",
};

export default function ChooseYourMealPage() {
  return (
    <>
      <PageHero eyebrow="Choose Your Meal" title="One simple page for every tiffin choice.">
        Custom meal, Mini Platter and Full Platter now live together in one clean flow. Pick the
        meal, choose a subscription, add details and continue on WhatsApp.
      </PageHero>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ChooseMealExperience />
        </div>
      </section>
    </>
  );
}
