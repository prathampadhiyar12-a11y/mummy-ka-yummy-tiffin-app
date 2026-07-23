import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about tiffin delivery, subscriptions and payment confirmation.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Everything customers need before placing an order.">
        Delivery, payment verification, customization and subscription rules are kept clear.
      </PageHero>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-[#ead8bd] rounded-lg border border-[#ead8bd] bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5">
              <summary className="flex cursor-pointer list-none justify-between gap-4 font-bold text-[#201c18]">
                {faq.question}
                <span className="text-[#e9682c]">+</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#71675d]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
