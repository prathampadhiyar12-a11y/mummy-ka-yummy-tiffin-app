import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-bold uppercase text-[#8a3b18]">404</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold text-[#201c18]">
          This page is not on the menu today.
        </h1>
        <p className="mt-5 text-[#71675d]">
          Head back to the weekly menu or build a fresh homemade meal.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/weekly-menu" variant="secondary">
            Weekly Menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
