import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default function ArticlePage() {
  return (
    <main className="flex min-h-screen flex-col font-sans bg-cream">
      <Header theme="light" />

      <article className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-[65ch] mx-auto">
          {/* 1. Back link */}
          <Link
            href="/vichar"
            className="inline-block text-sm text-muted hover:text-gold transition-colors mb-12"
          >
            ← Vichar
          </Link>

          {/* 2. Article header */}
          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-ink mb-6 leading-tight">
              {/* PLACEHOLDER TITLE */}
              How a dasha period is read
            </h1>
            <div className="text-sm text-muted uppercase tracking-wider">
              {/* PLACEHOLDER METADATA */}
              12 Sept 2026 · 6 min read
            </div>
          </header>

          {/* 3. Article body */}
          <div className="font-serif text-ink text-lg leading-[1.8] space-y-8">
            {/* PLACEHOLDER BODY */}
            <p>
              When a client asks &quot;what will happen during this period?&quot;, the answer is rarely found in a single planetary placement. A Dasha period unfolds like a chapter in a book, but understanding the narrative requires us to look at the planet&apos;s condition in the chart from multiple angles.
            </p>
            <h2 className="text-2xl mt-12 mb-6">Assessing the Mahadasha Lord</h2>
            <p>
              First, we look at the Mahadasha lord itself. What houses does it rule? Where is it placed? Most importantly, what is its dignity in that placement? A planet in its own sign or exalted will generally have the resources to provide its results more smoothly than a debilitated one, though the exact nature of those results depends heavily on the houses involved.
            </p>
            <blockquote className="pl-6 border-l border-gold italic text-muted my-8">
              &quot;The strength of a planet is its capacity to do work. Its nature and house rulership determine whether that work is helpful or hindering to the native.&quot;
            </blockquote>
            <p>
              We must also consider the planet&apos;s relationship to the Ascendant. A natural malefic that rules trine houses becomes a temporary benefic for that chart. This is a foundational principle of Parashari astrology that is often overlooked in modern generic readings.
            </p>
            <h3 className="text-xl mt-10 mb-4">The Role of the Antardasha</h3>
            <p>
              While the Mahadasha sets the overarching theme and environment, the Antardasha (sub-period) lord brings the specific events to fruition. The relationship between the Mahadasha lord and Antardasha lord is critical. Are they friends or enemies? Are they placed in harmonious angles to each other (like 5/9 or 3/11), or challenging ones (like 6/8)?
            </p>
            <p>
              For example, during a Saturn Mahadasha and Venus Antardasha, the period often yields significant results because the two planets are natural friends. However, if they are placed in a 6/8 relationship in the specific birth chart, the native may still experience friction in achieving those results. For more details on this, you can refer to classical texts on{" "}
              <Link
                href="#"
                className="text-gold underline decoration-gold/40 hover:decoration-gold transition-colors"
              >
                planetary periods
              </Link>.
            </p>
            <p>
              Ultimately, astrology is a practice of synthesis. A patient reading takes all these factors into account before predicting the nature of a period.
            </p>
          </div>

          {/* 4. Author note */}
          <div className="mt-16 pt-8 border-t border-divider">
            <p className="text-ink text-sm">
              Written by Neelanjan, trained in the CVA program under Roeland de
              Loof.
            </p>
          </div>

          {/* 5. Closing CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted text-sm">
              Have a question about this?{" "}
              <Link
                href="/appointment"
                className="text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold transition-colors"
              >
                Book a consultation
              </Link>
            </p>
          </div>

          {/* 6. Related articles */}
          <div className="mt-24">
            <h3 className="text-sm text-muted uppercase tracking-widest mb-6">
              Continue reading
            </h3>
            <ul className="flex flex-col">
              {/* PLACEHOLDER */}
              <li className="py-4 border-b border-divider first:border-t">
                <Link
                  href="/vichar/patience-vital-tool"
                  className="group block"
                >
                  <span className="font-serif text-xl text-ink group-hover:text-gold transition-colors">
                    Why patience is the astrologer&apos;s most vital tool
                  </span>
                </Link>
              </li>
              <li className="py-4 border-b border-divider">
                <Link href="/vichar/navigating-dashas" className="group block">
                  <span className="font-serif text-xl text-ink group-hover:text-gold transition-colors">
                    Navigating difficult Dashas with practical remedies
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
