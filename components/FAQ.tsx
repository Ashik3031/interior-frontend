"use client";

import React, { useState } from "react";

interface FAQItem {
  id: string;
  no: string;
  question: string;
  answer: string;
}

// TODO: confirm every fact below (timelines, partners, regions) before publishing.
const FAQ_ITEMS: FAQItem[] = [
  {
    id: "timeline",
    no: "01",
    question: "How long does a complete home transformation take?",
    answer:
      "Most projects take 4 to 9 months, depending on size and complexity. Concept planning and 3D visuals usually take 4 to 6 weeks. Custom joinery, material orders and on-site work follow.",
  },
  {
    id: "turnkey",
    no: "02",
    question: "Do you manage the contractors and the whole fit-out?",
    answer:
      "Yes. We handle drawings and approvals, joinery installation, MEP coordination and final styling. One site director oversees every trade, so you have one point of contact from start to finish.",
  },
  {
    id: "bespoke",
    no: "03",
    question: "Can we commission bespoke furniture and imported materials?",
    answer:
      "Yes, and it is a large part of our work. We work with stone quarries in Carrara and Verona, Parisian fabric ateliers and master cabinetmakers. Each piece is designed for your home rather than chosen from a catalogue.",
  },
  {
    id: "consultation",
    no: "04",
    question: "What happens in the first consultation?",
    answer:
      "It is a relaxed conversation, at your home or in our studio. We talk about how you live, what you want and a rough budget, then outline a scope for the project before any commitment.",
  },
  {
    id: "international",
    no: "05",
    question: "Do you take on projects outside the region?",
    answer:
      "Yes. We regularly design villas, chalets and penthouses across Europe, the Middle East and North America. Our procurement network and digital documentation let us work from anywhere.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      data-theme="dark"
      aria-labelledby="faq-heading"
      className="relative bg-deep-charcoal px-6 py-24 text-warm-ivory sm:px-10 lg:px-16 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12 lg:gap-12">
        {/* ---------------- Title column (sticks while the list scrolls) ---------------- */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2
              id="faq-heading"
              className="font-serif text-6xl font-light leading-none tracking-tight sm:text-7xl lg:text-8xl"
            >
              Questions
              <sup className="ml-2 align-super font-sans text-[.22em] tracking-normal text-warm-ivory/50">
                ({String(FAQ_ITEMS.length).padStart(2, "0")})
              </sup>
            </h2>

            <p className="mt-8 max-w-xs font-sans text-base leading-relaxed text-warm-ivory/60">
              Straight answers about timelines, process and working with us.
            </p>

            <div className="mt-12 hidden lg:block">
              <p className="font-sans text-sm text-warm-ivory/50">
                Still have a question?
              </p>
              <ContactLink />
            </div>
          </div>
        </div>

        {/* ---------------- Questions ---------------- */}
        <div className="lg:col-span-8">
          <ul className="border-b border-warm-ivory/15">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <li key={item.id} className="border-t border-warm-ivory/15">
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                      id={`faq-question-${item.id}`}
                      className="group grid w-full cursor-pointer grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold sm:grid-cols-[4rem_1fr_auto] sm:py-9"
                    >
                      <span
                        className={`font-sans text-sm tabular-nums transition-colors duration-300 ${isOpen ? "text-champagne-gold" : "text-warm-ivory/40"
                          }`}
                      >
                        ({item.no})
                      </span>

                      <span
                        className={`font-serif text-xl font-light leading-snug transition-colors duration-300 sm:text-2xl lg:text-[1.75rem] ${isOpen
                            ? "text-warm-ivory"
                            : "text-warm-ivory/60 group-hover:text-warm-ivory"
                          }`}
                      >
                        {item.question}
                      </span>

                      <span
                        aria-hidden="true"
                        className="relative h-4 w-4 self-center text-champagne-gold"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                        <span
                          className={`absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : "scale-y-100"
                            }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-[3rem_1fr] gap-x-4 sm:grid-cols-[4rem_1fr]">
                        <p className="col-start-2 max-w-xl pb-8 pr-8 font-sans text-base leading-relaxed text-warm-ivory/70 sm:pb-10">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Contact link for small screens (the title column hides it) */}
          <div className="mt-12 lg:hidden">
            <p className="font-sans text-sm text-warm-ivory/50">
              Still have a question?
            </p>
            <ContactLink />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink() {
  return (
    <a
      href="#contact"
      className="group mt-3 inline-flex items-center gap-3 border-b border-champagne-gold pb-1 font-sans text-sm text-warm-ivory transition-colors hover:text-champagne-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne-gold"
    >
      Talk to us
      <svg
        className="h-3 w-4 text-champagne-gold transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 16 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path d="M1 6h13M10 1l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}