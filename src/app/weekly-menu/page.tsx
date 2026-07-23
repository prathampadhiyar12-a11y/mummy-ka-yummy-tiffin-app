import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { weeklyMenu } from "@/lib/content";

export const metadata: Metadata = {
  title: "Weekly Menu",
  description: "Editable weekly lunch and dinner tiffin menu for Vadodara.",
};

export default function WeeklyMenuPage() {
  return (
    <>
      <PageHero eyebrow="Weekly Menu" title="Complete lunch and dinner menu for the week.">
        The admin CMS owns these menu records so Monday to Saturday meals can be updated without
        touching code. Sunday remains closed.
      </PageHero>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {weeklyMenu.map((day) => (
            <Card key={day.day} className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-3xl font-semibold">{day.day}</h2>
                {day.closed ? (
                  <span className="rounded-full bg-[#201c18] px-3 py-1 text-xs font-bold text-white">
                    Closed
                  </span>
                ) : null}
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <MealList title="Lunch" meals={day.lunch} />
                <MealList title="Dinner" meals={day.dinner} />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

function MealList({ title, meals }: { title: string; meals: string[] }) {
  return (
    <div>
      <p className="text-sm font-bold text-[#8a3b18]">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#5d5248]">
        {meals.map((meal) => (
          <li key={`${title}-${meal}`} className="flex gap-2">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#246b45]" aria-hidden="true" />
            {meal}
          </li>
        ))}
      </ul>
    </div>
  );
}
