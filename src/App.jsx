if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

import React, { useMemo, useState, useEffect } from "react";
import { Search, Instagram, Facebook, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["All", "Food & Dining", "Entertainment", "Education", "Essentials", "Transportation", "Fitness", "Travel", "IT Service"];

function mapCategory(cat) {
  const map = {
    entertainment: "Entertainment",
    transportation: "Transportation",
    fitness: "Fitness",
    food: "Food & Dining",
    retail: "Essentials",
    travel: "Travel",
    "it service": "IT Service",
  };
  return map[cat?.toLowerCase()] || "Essentials";
}

function getCategoryIcon(cat) {
  const map = {
    entertainment: "🎭",
    transportation: "🚌",
    fitness: "💪",
    food: "🍱",
    retail: "🛍️",
    travel: "✈️",
    "it service": "💻",
  };
  return map[cat?.toLowerCase()] || "🎓";
}

function useDiscounts() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/discounts.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load discounts");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((item, i) => ({
          id: i,
          brand: item.name,
          title: item.description || item.name,
          category: mapCategory(item.category),
          location: "Seattle",
          verified: true,
          icon: getCategoryIcon(item.category),
          url: item.url,
        }));
        setDeals(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { deals, loading, error };
}

function Navbar({ onNavigate, currentPage }) {
  return (
    <header className="sticky top-0 z-20 bg-[#f7f5f1]/95 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 text-sm sm:text-base">
          <button
            onClick={() => onNavigate("home")}
            className={`underline underline-offset-4 ${currentPage === "home" ? "text-black" : "text-neutral-700"}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate("discounts")}
            className={`underline underline-offset-4 ${currentPage === "discounts" ? "text-black" : "text-neutral-700"}`}
          >
            Perks and Benefits
          </button>
          <button
            onClick={() => {
              if (currentPage !== "home") onNavigate("home");
              setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50);
            }}
            className="underline underline-offset-4 text-neutral-700"
          >
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroImage({ title, subtitle, rightLabel }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-[#f3f3f3]" />
      <div className="relative grid min-h-[260px] sm:min-h-[360px] grid-cols-1 md:grid-cols-[1.25fr_1fr] items-center">
        <div className="p-8 sm:p-12">
          <div className="mb-4 inline-flex items-center rounded-full bg-black px-5 py-2 text-white shadow-sm">
            <span className="text-2xl font-extrabold tracking-wide text-red-500">NORTHEASTERN</span>
          </div>
          <div className="block max-w-fit rounded-xl bg-black px-4 py-2 text-lg font-semibold tracking-[0.3em] text-white sm:text-2xl">
            UNIVERSITY
          </div>
          <p className="mt-6 max-w-xl text-lg text-neutral-700 sm:text-2xl">{title}</p>
          {subtitle ? <p className="mt-2 max-w-xl text-neutral-600">{subtitle}</p> : null}
        </div>
        <div className="relative flex h-full items-end justify-center p-6 sm:p-10">
          <div className="grid w-full max-w-md grid-cols-3 gap-4 items-end">
            <div className="col-span-2 rounded-[2rem] border border-neutral-200 bg-neutral-100 p-4 shadow-sm">
              <div className="text-7xl sm:text-8xl">🎓</div>
            </div>
            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-100 p-4 shadow-sm">
              <div className="text-6xl sm:text-7xl">🐺</div>
            </div>
            <div className="col-span-3 rounded-[2rem] bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white sm:text-base">
              {rightLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#555555] text-white mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-3 text-white/90 mb-6">
          <Facebook className="h-4 w-4" />
          <Instagram className="h-4 w-4" />
          <Mail className="h-4 w-4" />
        </div>
        <div className="grid gap-10 md:grid-cols-2 pb-20">
          <div>
            <h3 className="text-3xl font-semibold">Husky Student Savings</h3>
            <p className="mt-3 max-w-md text-2xl leading-relaxed text-white/90">
              For partnerships, suggestions, or discount submissions, reach out to us.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-medium">Contact Us:</h3>
            <p className="mt-3 text-2xl leading-relaxed text-white/90">huskystudentsavings@gmail.com</p>
            <p className="text-2xl leading-relaxed text-white/90">Seattle, WA</p>
          </div>
        </div>
        <p className="text-sm text-white/80 pb-5">© 2026 Husky Student Savings. All rights reserved.</p>
      </div>
    </footer>
  );
}

function HomePage({ onBrowse }) {
  const { deals } = useDiscounts();
  const featuredDeals = deals.slice(0, 2);

  return (
    <main className="bg-[#f7f5f1] text-[#222]">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 text-center">
        <p className="text-xs sm:text-sm text-neutral-600">Verified discounts for Northeastern students in Seattle</p>
        <h1 className="mt-6 text-4xl sm:text-6xl font-light tracking-tight">Husky Student Savings</h1>
        <Button onClick={onBrowse} className="mt-8 rounded-full bg-red-600 px-10 py-7 text-xl font-medium hover:bg-red-700">
          Browse Discounts
        </Button>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <HeroImage
          title="Discover student discounts, campus perks, and Seattle savings in one place."
          subtitle="A simple directory for verified deals across food, entertainment, education, and essentials."
          rightLabel="NU Seattle Student Deals"
        />
      </section>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl sm:text-5xl font-light">What We Do</h2>
        <p className="mt-4 text-sm text-neutral-500">How it helps:</p>
        <p className="mx-auto mt-2 max-w-3xl text-2xl sm:text-3xl leading-snug text-neutral-700">
          We help NU students discover verified student discounts and local offers across Seattle.
        </p>
        <div className="mt-16 grid gap-10 md:grid-cols-3 text-center">
          <div>
            <p className="text-xs text-neutral-500">Why use it?</p>
            <p className="mt-4 text-2xl leading-snug text-neutral-700">Save money and discover useful student perks near campus.</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Who we help?</p>
            <p className="mt-4 text-2xl leading-snug text-neutral-700">Northeastern students looking for verified local offers in Seattle.</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">What do we offer?</p>
            <p className="mt-4 text-2xl leading-snug text-neutral-700">Discounts on food, services, and everyday student essentials.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] overflow-hidden border border-neutral-200 bg-white shadow-sm">
          <div className="grid min-h-[320px] md:grid-cols-[1.3fr_0.9fr] items-center">
            <div className="p-8 sm:p-12">
              <div className="inline-block rounded-xl bg-black px-5 py-3 text-3xl sm:text-5xl font-bold text-white">SEATTLE</div>
              <div className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-base sm:text-xl font-medium text-white">NORTHEASTERN UNIVERSITY</div>
              <p className="mt-8 max-w-2xl text-lg sm:text-2xl text-neutral-600">Local deals near campus, plus online discounts you can actually use.</p>
            </div>
            <div className="flex items-center justify-center p-8 text-[120px] sm:text-[170px]">🐺</div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-center text-4xl sm:text-5xl font-light">Featured Discounts</h2>
        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            {featuredDeals.map((deal) => (
              <Card key={deal.brand} className="rounded-[2rem] border-neutral-200 shadow-none">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[#d8ecff] text-5xl shadow-sm">
                    {deal.icon}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{deal.brand}</h3>
                  <p className="mt-3 text-xl leading-snug">{deal.title}</p>
                  <Button
                    className="mt-5 rounded-full bg-red-600 hover:bg-red-700"
                    onClick={() => window.open(deal.url, "_blank")}
                  >
                    View Offer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-light">How it works</h2>
        <p className="mt-4 text-2xl text-neutral-700">Find verified student discounts in three simple steps.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["1", "Discover Offers", "Browse nearby deals for food, coffee, services, and essentials."],
            ["2", "Look Up Details", "Check eligibility, location, and offer requirements."],
            ["3", "Save and Use", "Show your student ID and enjoy the discount."],
          ].map(([num, title, body]) => (
            <Card key={num} className="rounded-[2rem] border-0 bg-[#f8dfe5] shadow-none">
              <CardContent className="p-8 text-center">
                <div className="text-3xl font-semibold">{num}</div>
                <p className="mt-2 text-sm text-neutral-600">{title}</p>
                <p className="mt-4 text-2xl leading-snug text-neutral-700">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
          <div className="grid min-h-[280px] md:grid-cols-[1.2fr_1fr] items-center">
            <div className="p-8 sm:p-12">
              <h2 className="text-4xl sm:text-5xl font-light">Know a Student Deal? Share It With Us</h2>
              <Button className="mt-8 rounded-full bg-red-600 px-8 py-6 text-lg hover:bg-red-700">
                Submit a Discount
              </Button>
            </div>
            <div className="flex items-center justify-center p-8 text-[110px] sm:text-[150px]">📱</div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DiscountCard({ deal }) {
  return (
    <Card className="mx-auto w-full max-w-[260px] rounded-none border-0 bg-[#fdeef1] shadow-none">
      <CardContent className="flex min-h-[360px] flex-col items-center px-6 py-8 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-sm">
          {deal.icon}
        </div>
        <h3 className="mt-4 text-3xl font-semibold">{deal.brand}</h3>
        <p className="mt-4 text-2xl leading-snug text-neutral-800">{deal.title}</p>
        <Button
          className="mt-6 rounded-full bg-red-600 hover:bg-red-700"
          onClick={() => window.open(deal.url, "_blank")}
        >
          Learn More
        </Button>
        <p className="mt-auto pt-5 text-base text-neutral-700">
          {deal.category} {" · "} {deal.location} {" · "} {deal.verified ? "Verified" : "Unverified"}
        </p>
      </CardContent>
    </Card>
  );
}

function DiscountsPage({ onNavigate }) {
  const { deals: allDeals, loading, error } = useDiscounts();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    return allDeals.filter((deal) => {
      const matchesCategory = activeCategory === "All" || deal.category === activeCategory;
      const q = query.toLowerCase();
      const matchesQuery =
        deal.brand.toLowerCase().includes(q) ||
        deal.title.toLowerCase().includes(q) ||
        deal.category.toLowerCase().includes(q) ||
        deal.location.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory, allDeals]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pagedDeals = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  if (loading) return <p className="text-center pt-20 text-xl">Loading discounts...</p>;
  if (error) return <p className="text-center pt-20 text-red-500">{error}</p>;

  return (
    <main className="bg-[#f7f5f1] text-[#222] min-h-screen">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-14 text-center">
        <h1 className="text-4xl sm:text-6xl font-light">Discounts for Northeastern Students</h1>
        <p className="mx-auto mt-6 max-w-3xl text-2xl sm:text-3xl leading-snug text-neutral-700">
          Explore food, entertainment, education, and everyday student deals near campus.
        </p>
        <div className="mx-auto mt-8 flex max-w-4xl items-center rounded-full bg-neutral-200 px-4 py-3 shadow-inner">
          <Search className="mr-3 h-6 w-6 text-neutral-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search discounts, businesses, or categories"
            className="border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => { setActiveCategory(category); setPage(1); }}
              variant="outline"
              className={`rounded-full px-5 ${
                activeCategory === category
                  ? "bg-red-600 text-white border-red-600 hover:bg-red-700 hover:text-white"
                  : "bg-neutral-200 text-neutral-800 border-neutral-200 hover:bg-neutral-300"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {pagedDeals.map((deal, index) => (
            <DiscountCard key={`${deal.brand}-${index}`} deal={deal} />
          ))}
        </div>
        <div className="mt-14 flex items-center justify-center gap-3 text-2xl text-neutral-800">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="hover:underline">Previous</button>
          <span>|</span>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <React.Fragment key={n}>
              <button
                onClick={() => setPage(n)}
                className={n === page ? "font-semibold underline underline-offset-4" : "hover:underline"}
              >
                {n}
              </button>
              {n < totalPages ? <span>|</span> : null}
            </React.Fragment>
          ))}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="hover:underline">Next</button>
        </div>
        <div className="mt-12 text-center">
          <Button onClick={() => onNavigate("home")} variant="outline" className="rounded-full">
            Back to Home
          </Button>
        </div>
      </section>
    </main>
  );
}

export default function HuskyStudentSavingsSite() {
  const [page, setPage] = useState("home");
  return (
    <div className="min-h-screen bg-[#f7f5f1] font-serif">
      <Navbar currentPage={page} onNavigate={setPage} />
      {page === "home" ? <HomePage onBrowse={() => setPage("discounts")} /> : <DiscountsPage onNavigate={setPage} />}
      <Footer />
    </div>
  );
}