import { useState, useRef, useEffect } from "react";

// ─── Review Data ───────────────────────────────────────────────────────
const REVIEWS = [
  { id:1, name:"রাহেলা বেগম", location:"ঢাকা", avatar:"রা", rating:5, date:"১৫ এপ্রিল ২০২৫", product:"হিমসাগর আম", text:"সত্যিই অসাধারণ আম! এত মিষ্টি এবং তাজা আম আগে কখনো খাইনি। প্যাকেজিং খুব সুন্দর ছিল এবং ডেলিভারিও সময়মতো হয়েছে। পরিবারের সবাই খুব খুশি। পরের বার আরও বেশি অর্ডার করব।", helpful:24, verified:true, color:"#1d4ed8" },
  { id:2, name:"মোঃ করিম", location:"চট্টগ্রাম", avatar:"ক", rating:5, date:"২ মে ২০২৫", product:"ফজলি আম", text:"Folmondi থেকে প্রথমবার অর্ডার করলাম। আম গুলো একদম খামার তাজা ছিল। রঙ, গন্ধ, স্বাদ — সব কিছুতেই ১০০%! দ্রুত ডেলিভারি এবং কাস্টমার সার্ভিসও চমৎকার।", helpful:18, verified:true, color:"#2563eb" },
  { id:3, name:"সুমাইয়া আক্তার", location:"রাজশাহী", avatar:"সু", rating:4, date:"২৮ এপ্রিল ২০২৫", product:"ল্যাংড়া আম", text:"আম গুলো সত্যিকারের রাজশাহীর। স্বাদে অতুলনীয়। একটু দেরিতে ডেলিভারি হলেও মান নিয়ে কোনো অভিযোগ নেই। পরিবারের সবাই পছন্দ করেছে।", helpful:12, verified:true, color:"#1d4ed8" },
  { id:4, name:"আব্দুল হক", location:"সিলেট", avatar:"আ", rating:5, date:"১০ মে ২০২৫", product:"গোবিন্দভোগ আম", text:"অনলাইনে ফলমূল কেনার ব্যাপারে একটু সন্দিহান ছিলাম। কিন্তু Folmondi আমার ধারণা সম্পূর্ণ বদলে দিয়েছে। আম গুলো এত তাজা এবং প্যাকেজিং এত সুন্দর যে উপহার হিসেবেও দেওয়া যায়।", helpful:31, verified:true, color:"#3b82f6" },
  { id:5, name:"নাজনীন সুলতানা", location:"ময়মনসিংহ", avatar:"না", rating:5, date:"৫ মে ২০২৫", product:"হিমসাগর আম", text:"হিমসাগর আমের এত সুন্দর স্বাদ পাব বলে আশা করিনি! প্রতিটি আম পরিপক্ক ও রসালো। ওজনও ঠিকঠাক দিয়েছে। Folmondi-কে ধন্যবাদ এই সেবার জন্য।", helpful:15, verified:true, color:"#1d4ed8" },
  { id:6, name:"তানভীর আহমেদ", location:"খুলনা", avatar:"তা", rating:4, date:"১২ মে ২০২৫", product:"আম্রপালি আম", text:"দাম একটু বেশি মনে হলেও মান দেখে সেটা মেনে নেওয়া যায়। আম গুলো সত্যিই অনেক ভালো। পরিবারের ছোট বড় সবাই খুশি। আগামী বছরও Folmondi থেকে কিনব।", helpful:9, verified:false, color:"#2563eb" },
];

// ─── Star Rating ───────────────────────────────────────────────────────
function Stars({ rating, size = 16, interactive = false, onRate = null }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <button
          key={s}
          className={interactive ? "cursor-pointer transition-transform hover:scale-125" : "cursor-default"}
          style={{ background:"none", border:"none", padding:1 }}
          onClick={() => interactive && onRate?.(s)}
          onMouseEnter={() => interactive && setHovered(s)}
          onMouseLeave={() => interactive && setHovered(0)}
        >
          <svg width={size} height={size} fill={(interactive ? (hovered || rating) : rating) >= s ? "#f59e0b" : "#e2e8f0"} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

// ─── Single Review Card ────────────────────────────────────────────────
function ReviewCard({ review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 h-full border border-blue-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
      {/* Quote + text */}
      <div className="flex-1">
        <span className="text-5xl text-blue-100 font-serif leading-none block -mb-2">"</span>
        <p className="text-sm text-gray-600 leading-7 font-medium">{review.text}</p>
      </div>

      {/* Product tag */}
      <div className="inline-flex items-center gap-1.5 bg-blue-50 rounded-lg px-2.5 py-1 self-start">
        <span className="text-sm">🥭</span>
        <span className="text-xs font-bold text-blue-700">{review.product}</span>
      </div>

      <hr className="border-blue-50" />

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-sm"
          style={{ background: `linear-gradient(135deg, ${review.color}, #3b82f6)` }}
        >
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-black text-gray-900">{review.name}</span>
            {review.verified && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200">
                <svg width={10} height={10} fill="#1d4ed8" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                যাচাইকৃত
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs text-slate-400">📍 {review.location}</span>
            <span className="text-slate-200">•</span>
            <span className="text-xs text-slate-400">{review.date}</span>
          </div>
        </div>
        <Stars rating={review.rating} size={14} />
      </div>

      {/* Helpful */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">সহায়ক ছিল?</span>
        <button
          onClick={() => { if (!voted) { setHelpful(h => h + 1); setVoted(true); } }}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 border text-xs font-bold transition-all ${voted ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-transparent border-gray-200 text-gray-400 hover:border-blue-300"}`}
        >
          <svg width={12} height={12} fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
          </svg>
          {helpful}
        </button>
      </div>
    </div>
  );
}

// ─── Write Review Modal ────────────────────────────────────────────────
function WriteReviewModal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating || !name.trim() || !text.trim()) return;
    setSubmitted(true);
    setTimeout(() => { onSubmit({ name, product, rating, text }); onClose(); }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl">
        {submitted ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-xl font-black text-blue-700 mb-2">ধন্যবাদ!</h3>
            <p className="text-slate-500 text-sm">আপনার রিভিউ সফলভাবে জমা হয়েছে।</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-lg font-black text-gray-900">রিভিউ লিখুন</h3>
                <p className="text-xs text-slate-400 mt-0.5">আপনার অভিজ্ঞতা শেয়ার করুন</p>
              </div>
              <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">✕</button>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-gray-700 block mb-2">রেটিং দিন *</label>
              <div className="flex items-center gap-2">
                <Stars rating={rating} size={28} interactive onRate={setRating} />
                {rating > 0 && <span className="text-xs font-bold text-blue-700 ml-1">{["","খুব খারাপ","খারাপ","ঠিক আছে","ভালো","অসাধারণ"][rating]}</span>}
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs font-bold text-gray-700 block mb-1.5">আপনার নাম *</label>
              <input className="input input-bordered input-sm w-full" placeholder="যেমন: রাহেলা বেগম" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="text-xs font-bold text-gray-700 block mb-1.5">কোন পণ্য কিনেছেন?</label>
              <select className="select select-bordered select-sm w-full" value={product} onChange={e => setProduct(e.target.value)}>
                <option value="">পণ্য নির্বাচন করুন</option>
                {["গোবিন্দভোগ আম","হিমসাগর আম","গোপালভোগ আম","ল্যাংড়া আম","আম্রপালি আম","ফজলি আম"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>

            <div className="mb-5">
              <label className="text-xs font-bold text-gray-700 block mb-1.5">আপনার মতামত *</label>
              <textarea className="textarea textarea-bordered w-full text-sm" rows={4} placeholder="আপনার অভিজ্ঞতা বিস্তারিত লিখুন..." value={text} onChange={e => setText(e.target.value)} maxLength={300} />
              <div className="text-right text-xs text-slate-400 mt-1">{text.length}/300</div>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} className="btn btn-sm flex-1 btn-ghost border border-base-300">বাতিল</button>
              <button
                onClick={handleSubmit}
                disabled={!rating || !name.trim() || !text.trim()}
                className="btn btn-sm flex-[2] text-white font-bold"
                style={{ background: "#1d4ed8" }}
              >
                রিভিউ জমা দিন →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Review Section ────────────────────────────────────────────────────
export default function ReviewSection() {
  const [current, setCurrent] = useState(0);
  const [reviews, setReviews] = useState(REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const autoRef = useRef(null);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCardsPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    autoRef.current = setInterval(() => setCurrent(c => c >= maxIndex ? 0 : c + 1), 4000);
    return () => clearInterval(autoRef.current);
  }, [maxIndex]);

  const go = (dir) => {
    clearInterval(autoRef.current);
    setCurrent(c => Math.max(0, Math.min(maxIndex, c + dir)));
  };

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="bg-blue-50 py-16 px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-5 py-2 mb-4">
            <span>⭐</span>
            <span className="text-xs font-bold text-blue-700">গ্রাহকদের মতামত</span>
          </div>
          <h2 className="text-3xl font-black text-blue-900 mb-2">আমাদের গ্রাহকরা যা বলছেন</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">হাজারো সন্তুষ্ট গ্রাহকের বিশ্বাস অর্জন করেছে Folmondi। তাদের সত্যিকারের অভিজ্ঞতা পড়ুন।</p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-blue-100 shadow-sm flex gap-8 flex-wrap items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-black text-blue-700">{avgRating}</div>
            <Stars rating={Math.round(Number(avgRating))} size={18} />
            <div className="text-xs text-slate-400 mt-1">{reviews.length}টি রিভিউ</div>
          </div>
          <div className="flex-1 min-w-[200px] max-w-xs">
            {[5,4,3,2,1].map(s => {
              const count = reviews.filter(r => r.rating === s).length;
              return (
                <div key={s} className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-500 w-3">{s}</span>
                  <svg width={12} height={12} fill="#f59e0b" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <div className="flex-1 h-2 bg-blue-50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width:`${(count/reviews.length)*100}%`, background:"linear-gradient(90deg,#1d4ed8,#3b82f6)" }} />
                  </div>
                  <span className="text-xs text-slate-400 w-4 text-right">{count}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            {[["🚚","দ্রুত ডেলিভারি","৯৮%"],["🌿","তাজা পণ্য","৯৬%"],["💬","সেবা মান","৯৪%"]].map(([ic,lb,pct])=>(
              <div key={lb} className="flex items-center gap-2">
                <span className="text-lg">{ic}</span>
                <div>
                  <div className="text-xs font-bold text-gray-700">{lb}</div>
                  <div className="text-sm font-black text-blue-700">{pct}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider controls */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-slate-500 font-semibold">
            {current + 1}–{Math.min(current + cardsPerView, reviews.length)} / {reviews.length} রিভিউ
          </span>
          <div className="flex gap-2">
            {[-1, 1].map(dir => (
              <button key={dir} onClick={() => go(dir)} disabled={dir === -1 ? current === 0 : current >= maxIndex}
                className="w-10 h-10 rounded-full border-2 border-blue-700 bg-white text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white disabled:opacity-30 transition-all">
                <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={dir === -1 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Slider track */}
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * (100 / cardsPerView)}%)` }}>
            {reviews.map(r => (
              <div key={r.id} className="flex-shrink-0 px-2.5" style={{ width: `${100 / cardsPerView}%` }}>
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button key={i} onClick={() => { clearInterval(autoRef.current); setCurrent(i); }}
              className="h-2 rounded-full border-none transition-all duration-300"
              style={{ width: current === i ? 22 : 8, background: current === i ? "#1d4ed8" : "#bfdbfe", padding:0, cursor:"pointer" }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center rounded-2xl p-10 relative overflow-hidden" style={{ background:"linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)" }}>
          <div className="absolute w-48 h-48 rounded-full bg-white/5 -top-12 -right-8 pointer-events-none" />
          <div className="absolute w-32 h-32 rounded-full bg-white/5 -bottom-10 left-4 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-3xl mb-3">✍️</div>
            <h3 className="text-xl font-black text-white mb-2">আপনার অভিজ্ঞতা শেয়ার করুন</h3>
            <p className="text-blue-200 text-sm max-w-sm mx-auto mb-6">আপনি কি Folmondi থেকে কিনেছেন? আপনার মতামত অন্যদের সঠিক সিদ্ধান্ত নিতে সাহায্য করবে।</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all duration-200 shadow-lg"
            >
              <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              রিভিউ লিখুন
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <WriteReviewModal
          onClose={() => setShowModal(false)}
          onSubmit={(r) => setReviews(prev => [{
            id: prev.length + 1,
            name: r.name, avatar: r.name.charAt(0),
            location: "বাংলাদেশ", rating: r.rating,
            date: "আজকে", product: r.product || "Folmondi পণ্য",
            text: r.text, helpful: 0, verified: false, color: "#2563eb"
          }, ...prev])}
        />
      )}
    </section>
  );
}