import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

// PLACEHOLDER CONTENT
const posts = [
  {
    slug: "saturn-night-birth",
    title: "Understanding the role of Saturn in a night birth",
    excerpt: "Saturn behaves differently depending on sect. Here is why a night chart demands a more nuanced reading of its restrictions.",
    date: "12 Sept 2026",
    time: "4 min read",
  },
  {
    slug: "patience-vital-tool",
    title: "Why patience is the astrologer's most vital tool",
    excerpt: "Before making any prediction, the entire chart must be synthesized. Rushing to conclusions based on a single placement is the root of many bad readings.",
    date: "05 Sept 2026",
    time: "3 min read",
  },
  {
    slug: "navigating-dashas",
    title: "Navigating difficult Dashas with practical remedies",
    excerpt: "Not every challenging planetary period requires elaborate rituals. Sometimes, simple shifts in routine align best with the Dasha lord.",
    date: "28 Aug 2026",
    time: "6 min read",
  },
  {
    slug: "muhurat-basics",
    title: "The basic principles of selecting a Muhurat",
    excerpt: "A guide to understanding how the moon, nakshatras, and tithi interact when finding an auspicious time to begin a venture.",
    date: "15 Aug 2026",
    time: "5 min read",
  },
  {
    slug: "retrograde-planets",
    title: "Revisiting retrograde planets in the birth chart",
    excerpt: "Rather than simply being 'weak' or 'delayed', retrograde planets often indicate areas of life requiring deeper reflection and non-traditional approaches.",
    date: "02 Aug 2026",
    time: "7 min read",
  },
  {
    slug: "yogas-in-practice",
    title: "When Yogas fail to deliver: A practical look",
    excerpt: "A Raja Yoga on paper doesn't always translate to lived experience. The strength of the dispositor often tells the real story.",
    date: "21 Jul 2026",
    time: "4 min read",
  },
  {
    slug: "nodes-rahu-ketu",
    title: "Rahu and Ketu across the nodal axis",
    excerpt: "The nodes represent our deepest desires and our most profound detachments. Balancing their energies is a lifelong process.",
    date: "10 Jul 2026",
    time: "8 min read",
  },
  {
    slug: "importance-navamsha",
    title: "Why the Navamsha (D9) chart cannot be ignored",
    excerpt: "The D1 chart shows the physical reality, but the D9 reveals the underlying strength and inner purpose of the planets.",
    date: "25 Jun 2026",
    time: "5 min read",
  },
];

export default function VicharPage() {
  return (
    <main className="flex min-h-screen flex-col font-sans bg-cream">
      <Header theme="light" />

      <div className="flex-grow pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* 1. Page intro block */}
          <div className="mb-16">
            <h1 className="font-serif text-4xl text-ink mb-4">Vichar</h1>
            <p className="text-muted">
              Notes on the practice of Vedic astrology — read at your own pace.
            </p>
          </div>

          {/* 3. Optional filter row */}
          <div className="mb-12 flex flex-wrap gap-6 text-sm text-muted">
            <button className="text-ink underline underline-offset-4 decoration-ink hover:text-ink transition-colors">
              All
            </button>
            <button className="hover:text-ink transition-colors">Kundli</button>
            <button className="hover:text-ink transition-colors">Muhurat</button>
            <button className="hover:text-ink transition-colors">
              Practice notes
            </button>
          </div>

          {/* 2. Article list */}
          <ul className="flex flex-col">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="py-8 border-b border-divider first:border-t"
              >
                <Link href={`/vichar/${post.slug}`} className="group block">
                  <h2 className="font-serif text-2xl text-ink mb-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted truncate mb-3">{post.excerpt}</p>
                  <div className="text-xs text-muted uppercase tracking-wider">
                    {/* PLACEHOLDER DATA */}
                    {post.date} · {post.time}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* 4. Pagination / Load more */}
          <div className="mt-12 text-center">
            <button className="text-sm font-medium text-ink hover:text-gold transition-colors">
              Load more
            </button>
          </div>

          {/* 5. Closing nudge */}
          <div className="mt-24 pt-12 border-t border-divider text-center">
            <p className="text-muted">
              Have a question this raised?{" "}
              <Link
                href="/appointment"
                className="text-gold underline underline-offset-4 decoration-gold/30 hover:decoration-gold transition-colors"
              >
                Ask during a reading
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
