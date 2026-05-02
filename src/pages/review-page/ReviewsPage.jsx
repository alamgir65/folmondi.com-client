import { useState, useMemo } from "react";

// ─── Review Data ───────────────────────────────────────────────────────
const ALL_REVIEWS = [
  { id:1,  name:"রাহেলা বেগম",    loc:"ঢাকা",          av:"রা",  rating:5, date:"১৫ এপ্রিল ২০২৫", product:"হিমসাগর আম",    text:"সত্যিই অসাধারণ আম! এত মিষ্টি এবং তাজা আম আগে কখনো খাইনি। প্যাকেজিং খুব সুন্দর ছিল এবং ডেলিভারিও সময়মতো হয়েছে। পরিবারের সবাই খুব খুশি। পরের বার আরও বেশি অর্ডার করব।",             helpful:24, verified:true,  col:"#1d4ed8" },
  { id:2,  name:"মোঃ করিম",       loc:"চট্টগ্রাম",     av:"ক",   rating:5, date:"২ মে ২০২৫",      product:"ফজলি আম",       text:"Folmondi থেকে প্রথমবার অর্ডার করলাম। আম গুলো একদম খামার তাজা ছিল। রঙ, গন্ধ, স্বাদ — সব কিছুতেই ১০০%! দ্রুত ডেলিভারি এবং কাস্টমার সার্ভিসও চমৎকার। আবার অর্ডার করব।",      helpful:18, verified:true,  col:"#2563eb" },
  { id:3,  name:"সুমাইয়া আক্তার", loc:"রাজশাহী",       av:"সু",  rating:4, date:"২৮ এপ্রিল ২০২৫", product:"ল্যাংড়া আম",    text:"আম গুলো সত্যিকারের রাজশাহীর। স্বাদে অতুলনীয়। একটু দেরিতে ডেলিভারি হলেও মান নিয়ে কোনো অভিযোগ নেই। পরিবারের সবাই পছন্দ করেছে। পরের মৌসুমেও অর্ডার করব।",              helpful:12, verified:true,  col:"#1d4ed8" },
  { id:4,  name:"আব্দুল হক",      loc:"সিলেট",         av:"আ",   rating:5, date:"১০ মে ২০২৫",     product:"গোবিন্দভোগ আম", text:"অনলাইনে ফলমূল কেনার ব্যাপারে সন্দিহান ছিলাম। কিন্তু Folmondi আমার ধারণা বদলে দিয়েছে। আম এত তাজা যে উপহার হিসেবেও দেওয়া যায়। বিশ্বাসযোগ্য প্রতিষ্ঠান।",               helpful:31, verified:true,  col:"#3b82f6" },
  { id:5,  name:"নাজনীন সুলতানা", loc:"ময়মনসিংহ",     av:"না",  rating:5, date:"৫ মে ২০২৫",      product:"হিমসাগর আম",    text:"হিমসাগর আমের এত সুন্দর স্বাদ পাব বলে আশা করিনি! প্রতিটি আম পরিপক্ক ও রসালো। ওজনও ঠিকঠাক দিয়েছে। ডেলিভারি ম্যানও অনেক ভদ্র। Folmondi-কে ধন্যবাদ।",             helpful:15, verified:true,  col:"#1d4ed8" },
  { id:6,  name:"তানভীর আহমেদ",  loc:"খুলনা",         av:"তা",  rating:4, date:"১২ মে ২০২৫",     product:"আম্রপালি আম",   text:"দাম একটু বেশি মনে হলেও মান দেখে মেনে নেওয়া যায়। আম গুলো অনেক ভালো। পরিবারের ছোট বড় সবাই খুশি। আগামী বছরও Folmondi থেকে কিনব।",                         helpful:9,  verified:false, col:"#2563eb" },
  { id:7,  name:"ফারহান হোসেন",   loc:"বরিশাল",        av:"ফা",  rating:5, date:"৮ মে ২০২৫",      product:"গোপালভোগ আম",  text:"গোপালভোগ আমের গন্ধ এবং স্বাদ অনন্য। একদম পাকা এবং মিষ্টি। প্যাকেজিং এত ভালো যে কোনো আম নষ্ট হয়নি। দ্রুত ডেলিভারিও পেয়েছি। ধন্যবাদ Folmondi।",         helpful:22, verified:true,  col:"#1d4ed8" },
  { id:8,  name:"মাহমুদা বেগম",   loc:"রংপুর",         av:"মা",  rating:3, date:"২০ এপ্রিল ২০২৫", product:"ল্যাংড়া আম",    text:"আমের মান ভালো কিন্তু ডেলিভারিতে একটু সমস্যা হয়েছে। দুটো আম সামান্য চাপ খেয়েছিল। পরের বার আরও সতর্কভাবে প্যাক করলে ভালো হবে।",                      helpful:5,  verified:true,  col:"#3b82f6" },
  { id:9,  name:"সজীব রহমান",     loc:"নারায়ণগঞ্জ",    av:"স",   rating:5, date:"৩ মে ২০২৫",      product:"ফজলি আম",       text:"ফজলি আম এত বড় এবং রসালো ছিল! পরিবার ও বন্ধুরা সবাই অবাক। অনলাইনে কিনে এত ভালো আম পাব ভাবিনি। Folmondi সত্যিই বিশ্বাসযোগ্য।",             helpful:19, verified:true,  col:"#2563eb" },
  { id:10, name:"রুমা খানম",      loc:"কুমিল্লা",      av:"রু",  rating:4, date:"১৮ এপ্রিল ২০২৫", product:"আম্রপালি আম",   text:"আম্রপালি আম সত্যিই সুস্বাদু। মিষ্টি এবং রসে ভরা। একটু বেশি পাকা ছিল কিছু আম, তবে সামগ্রিকভাবে সন্তুষ্ট।",                                   helpful:8,  verified:false, col:"#1d4ed8" },
  { id:11, name:"জাহিদ ইসলাম",    loc:"গাজীপুর",       av:"জা",  rating:5, date:"১ মে ২০২৫",      product:"হিমসাগর আম",    text:"পাঁচ বছর ধরে বিভিন্ন জায়গা থেকে আম কিনেছি। Folmondi এর হিমসাগর সেরা। খামার থেকে সরাসরি আসার কারণে স্বাদ একদম আলাদা।",                       helpful:37, verified:true,  col:"#3b82f6" },
  { id:12, name:"আফরিন আক্তার",   loc:"ঢাকা",          av:"আফ",  rating:5, date:"৭ মে ২০২৫",      product:"খিরসাপাত আম",   text:"খিরসাপাত আমের মৌসুমে Folmondi থেকে কিনলাম। আমের সুগন্ধ ঘর ভরিয়ে দিয়েছে! প্রতিটি আম যত্ন করে প্যাক করা। সার্ভিস চমৎকার।",               helpful:28, verified:true,  col:"#1d4ed8" },
];

const PRODUCTS = ["সব পণ্য", "হিমসাগর আম", "ফজলি আম", "ল্যাংড়া আম", "গোবিন্দভোগ আম", "গোপালভোগ আম", "আম্রপালি আম", "খিরসাপাত আম"];
const PER_PAGE = 6;

// ─── Stars ────────────────────────────────────────────────────────────
function Stars({ rating, size = 15, interactive = false, onRate = null }) {
  const [hov, setHov] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <button
          key={s}
          style={{ background:"none", border:"none", padding:1, cursor: interactive ? "pointer" : "default", transition:"transform .15s" }}
          className={interactive ? "hover:scale-125" : ""}
          onClick={() => interactive && onRate?.(s)}
          onMouseEnter={() => interactive && setHov(s)}
          onMouseLeave={() => interactive && setHov(0)}
        >
          <svg width={size} height={size} fill={(interactive ? (hov || rating) : rating) >= s ? "#f59e0b" : "#e2e8f0"} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────
function ReviewCard({ r }) {
  const [helpful, setHelpful] = useState(r.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
      {/* Header: avatar + name + stars */}
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-sm"
          style={{ background: `linear-gradient(135deg, ${r.col}, #3b82f6)` }}>
          {r.av}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-sm text-blue-900">{r.name}</span>
            {r.verified && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200">
                <svg width={9} height={9} fill="#1d4ed8" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                যাচাইকৃত
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Stars rating={r.rating} size={13} />
            <span className="text-xs text-slate-400">• {r.date}</span>
          </div>
          <span className="text-xs text-slate-400">📍 {r.loc}</span>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <span className="text-4xl text-blue-100 font-serif leading-none block -mb-2">"</span>
        <p className="text-sm text-gray-600 leading-7 font-medium">{r.text}</p>
      </div>

      {/* Product tag */}
      <div className="inline-flex items-center gap-1.5 bg-blue-50 rounded-lg px-2.5 py-1 self-start">
        <span className="text-sm">🥭</span>
        <span className="text-xs font-bold text-blue-700">{r.product}</span>
      </div>

      <hr className="border-blue-50" />

      {/* Helpful */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">সহায়ক ছিল?</span>
        <button
          onClick={() => { if (!voted) { setHelpful(h => h + 1); setVoted(true); } }}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 border text-xs font-bold transition-all ${voted ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-transparent border-gray-200 text-gray-400 hover:border-blue-300"}`}
        >
          <svg width={11} height={11} fill="currentColor" viewBox="0 0 20 20">
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
  const [loc, setLoc] = useState("");
  const [product, setProduct] = useState("");
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const valid = rating && name.trim() && text.trim();

  const submit = () => {
    if (!valid) return;
    setDone(true);
    setTimeout(() => { onSubmit({ rating, name, loc, product, text }); onClose(); }, 1600);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {done ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-xl font-black text-blue-700 mb-2">ধন্যবাদ!</h3>
            <p className="text-slate-500 text-sm">আপনার রিভিউ সফলভাবে জমা হয়েছে।</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-lg font-black text-blue-900">রিভিউ লিখুন</h3>
                <p className="text-xs text-slate-400 mt-0.5">আপনার সৎ অভিজ্ঞতা অন্যদের সাহায্য করে</p>
              </div>
              <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle text-slate-400">✕</button>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-gray-700 block mb-2">রেটিং দিন *</label>
              <div className="flex items-center gap-2">
                <Stars rating={rating} size={28} interactive onRate={setRating} />
                {rating > 0 && <span className="text-xs font-bold text-blue-700">{["","খুব খারাপ","খারাপ","ঠিক আছে","ভালো","অসাধারণ!"][rating]}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">আপনার নাম *</label>
                <input className="input input-bordered input-sm w-full" placeholder="রাহেলা বেগম" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">জেলা</label>
                <input className="input input-bordered input-sm w-full" placeholder="ঢাকা" value={loc} onChange={e => setLoc(e.target.value)} />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs font-bold text-gray-700 block mb-1.5">কোন পণ্য কিনেছেন?</label>
              <select className="select select-bordered select-sm w-full" value={product} onChange={e => setProduct(e.target.value)}>
                <option value="">পণ্য নির্বাচন করুন</option>
                {PRODUCTS.slice(1).map(p => <option key={p}>{p}</option>)}
              </select>
            </div>

            <div className="mb-5">
              <label className="text-xs font-bold text-gray-700 block mb-1.5">আপনার মতামত *</label>
              <textarea className="textarea textarea-bordered w-full text-sm" rows={4} maxLength={300}
                placeholder="আপনার অভিজ্ঞতা বিস্তারিত লিখুন..." value={text} onChange={e => setText(e.target.value)} />
              <div className={`text-right text-xs mt-1 ${text.length > 260 ? "text-red-400" : "text-slate-400"}`}>{text.length}/300</div>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} className="btn btn-sm flex-1 btn-ghost border border-base-300 font-bold">বাতিল</button>
              <button onClick={submit} disabled={!valid}
                className="btn btn-sm flex-[2] text-white font-bold border-none"
                style={{ background: valid ? "#1d4ed8" : "#cbd5e1" }}>
                রিভিউ জমা দিন →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Reviews Page ──────────────────────────────────────────────────────
export default function ReviewsPage() {
  const [reviews, setReviews] = useState(ALL_REVIEWS);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [filterProduct, setFilterProduct] = useState("সব পণ্য");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let r = [...reviews];
    if (search.trim()) r = r.filter(x => x.name.includes(search) || x.text.includes(search) || x.product.includes(search));
    if (filterRating) r = r.filter(x => x.rating === filterRating);
    if (filterProduct !== "সব পণ্য") r = r.filter(x => x.product === filterProduct);
    if (sort === "newest")  r.sort((a, b) => b.id - a.id);
    if (sort === "helpful") r.sort((a, b) => b.helpful - a.helpful);
    if (sort === "highest") r.sort((a, b) => b.rating - a.rating);
    if (sort === "lowest")  r.sort((a, b) => a.rating - b.rating);
    return r;
  }, [reviews, search, filterRating, filterProduct, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map(s => ({ s, count: reviews.filter(r => r.rating === s).length }));

  const addReview = ({ name, loc, product, rating, text }) => {
    setReviews(prev => [{
      id: prev.length + 1, name, loc: loc || "বাংলাদেশ",
      av: name.charAt(0), rating, date: "আজকে",
      product: product || "Folmondi পণ্য", text,
      helpful: 0, verified: false, col: "#2563eb",
    }, ...prev]);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-blue-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>

      {/* Hero banner */}
      <div className="relative overflow-hidden text-center py-14 px-4" style={{ background: "linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)" }}>
        <div className="absolute w-64 h-64 rounded-full bg-white/5 -top-16 -right-16 pointer-events-none" />
        <div className="absolute w-44 h-44 rounded-full bg-white/5 -bottom-12 left-8 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-5 py-2 mb-4">
            <span>⭐</span>
            <span className="text-xs font-bold text-blue-200">গ্রাহকদের মতামত</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">সকল রিভিউ</h1>
          <p className="text-blue-200 text-sm max-w-md mx-auto mb-6">
            আমাদের {reviews.length}+ গ্রাহকের সত্যিকারের অভিজ্ঞতা। তাদের কথা পড়ুন এবং আপনার মতামত যোগ করুন।
          </p>
          <button
            onClick={() => setModal(true)}
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-black px-7 py-3 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 shadow-lg"
          >
            <svg width={17} height={17} fill="none" stroke="#1d4ed8" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            রিভিউ লিখুন
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Rating summary */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-blue-100 shadow-sm flex gap-6 flex-wrap items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-black text-blue-700 leading-none">{avg}</div>
            <Stars rating={Math.round(Number(avg))} size={18} />
            <div className="text-xs text-slate-400 mt-1">{reviews.length}টি রিভিউ</div>
          </div>
          <div className="flex-1 min-w-[200px] max-w-xs">
            {dist.map(({ s, count }) => (
              <button key={s} onClick={() => { setFilterRating(filterRating === s ? 0 : s); setPage(1); }}
                className="flex items-center gap-2 w-full mb-1.5 hover:opacity-80 transition-opacity">
                <span className={`text-xs font-bold w-3 ${filterRating === s ? "text-blue-700" : "text-slate-500"}`}>{s}</span>
                <svg width={11} height={11} fill="#f59e0b" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <div className="flex-1 h-2 bg-blue-50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width:`${(count/reviews.length)*100}%`, background: filterRating === s ? "#1d4ed8" : "linear-gradient(90deg,#3b82f6,#60a5fa)" }} />
                </div>
                <span className="text-xs text-slate-400 w-4 text-right">{count}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            {[["🚚","দ্রুত ডেলিভারি","৯৮%"],["🌿","তাজা পণ্য","৯৬%"],["💬","সেবা মান","৯৪%"],["📦","প্যাকেজিং","৯৭%"]].map(([ic,lb,pct]) => (
              <div key={lb} className="text-center">
                <div className="text-2xl">{ic}</div>
                <div className="text-xs font-bold text-gray-700">{lb}</div>
                <div className="text-sm font-black text-blue-700">{pct}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-4 mb-5 border border-blue-100 flex gap-3 flex-wrap items-center">
          <div className="relative flex-1 min-w-[180px]">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input className="input input-bordered input-sm w-full pl-8" placeholder="রিভিউ খুঁজুন..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="select select-bordered select-sm" value={filterProduct} onChange={e => { setFilterProduct(e.target.value); setPage(1); }}>
            {PRODUCTS.map(p => <option key={p}>{p}</option>)}
          </select>
          <select className="select select-bordered select-sm" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">সর্বশেষ</option>
            <option value="helpful">সবচেয়ে সহায়ক</option>
            <option value="highest">সর্বোচ্চ রেটিং</option>
            <option value="lowest">সর্বনিম্ন রেটিং</option>
          </select>
          <div className="flex gap-2 flex-wrap">
            {[5, 4, 3].map(s => (
              <button key={s} onClick={() => { setFilterRating(filterRating === s ? 0 : s); setPage(1); }}
                className="rounded-full px-3 py-1 text-xs font-bold border-2 transition-all"
                style={{ background: filterRating === s ? "#1d4ed8" : "transparent", borderColor: filterRating === s ? "#1d4ed8" : "#bfdbfe", color: filterRating === s ? "#fff" : "#1d4ed8" }}>
                {s}★
              </button>
            ))}
            {(filterRating || filterProduct !== "সব পণ্য" || search) && (
              <button onClick={() => { setFilterRating(0); setFilterProduct("সব পণ্য"); setSearch(""); setPage(1); }}
                className="rounded-full px-3 py-1 text-xs font-bold border-2 border-red-200 bg-red-50 text-red-500 transition-all">
                ✕ ফিল্টার সরান
              </button>
            )}
          </div>
        </div>

        {/* Result count */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-slate-500 font-semibold">
            {filtered.length}টি রিভিউ{filterRating ? ` • ${filterRating}★` : ""}{filterProduct !== "সব পণ্য" ? ` • ${filterProduct}` : ""}
          </span>
          <span className="text-xs text-slate-400">{page}/{totalPages || 1} পৃষ্ঠা</span>
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map(r => <ReviewCard key={r.id} r={r} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-blue-100">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-black text-blue-900 mb-1">কোনো রিভিউ পাওয়া যায়নি</h3>
            <p className="text-slate-400 text-sm">অন্য ফিল্টার ব্যবহার করে দেখুন।</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {[{ dir: -1, disabled: page === 1 }, { dir: 1, disabled: page === totalPages }].map(({ dir, disabled }) => (
              <button key={dir} onClick={() => setPage(p => p + dir)} disabled={disabled}
                className="w-10 h-10 rounded-full border-2 border-blue-200 bg-white text-blue-700 flex items-center justify-center disabled:opacity-30 hover:bg-blue-700 hover:text-white transition-all">
                <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={dir === -1 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
              </button>
            ))}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className="w-10 h-10 rounded-full border-2 font-bold text-sm transition-all"
                style={{ background: page === n ? "#1d4ed8" : "#fff", borderColor: page === n ? "#1d4ed8" : "#bfdbfe", color: page === n ? "#fff" : "#1d4ed8" }}>
                {n}
              </button>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center rounded-2xl p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)" }}>
          <div className="absolute w-48 h-48 rounded-full bg-white/5 -top-12 -right-8 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-3xl mb-3">✍️</div>
            <h3 className="text-xl font-black text-white mb-2">আপনার অভিজ্ঞতা শেয়ার করুন</h3>
            <p className="text-blue-200 text-sm max-w-sm mx-auto mb-6">আপনার মতামত অন্যদের সঠিক সিদ্ধান্ত নিতে সাহায্য করবে।</p>
            <button onClick={() => setModal(true)}
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-black px-7 py-3 rounded-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 shadow-lg">
              <svg width={16} height={16} fill="none" stroke="#1d4ed8" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              রিভিউ লিখুন
            </button>
          </div>
        </div>
      </div>

      {modal && <WriteReviewModal onClose={() => setModal(false)} onSubmit={addReview} />}
    </div>
  );
}