import { useState, useMemo } from "react";
import { DATA } from "../data";

const CATEGORIES = ["全部", "景點", "餐廳", "市場", "購物", "體驗"];
const AREAS = ["全部", "大阪", "京都", "神戶", "宇治", "奈良"];

const TAG_GROUPS = [
  { label: "推薦", tags: ["必去", "必吃", "排隊名店"] },
  { label: "美食", tags: ["燒肉", "和牛", "壽司", "拉麵", "章魚燒", "串炸", "大阪燒", "炸牛排", "神戶牛", "鐵板燒", "Omakase", "蛋包飯", "烏龍麵", "餃子", "豆腐", "麻糬", "居酒屋", "街頭小吃", "吃到飽", "素食友善"] },
  { label: "甜點飲品", tags: ["抹茶", "甜點", "起司蛋糕", "起司塔", "清酒", "試飲"] },
  { label: "文化古蹟", tags: ["世界遺產", "歷史", "歷史建築", "城堡", "寺廟", "神社", "佛寺", "佛塔", "國寶", "千本鳥居", "大佛", "枯山水", "紅磚水道橋", "庭園"] },
  { label: "自然風景", tags: ["自然", "竹林", "紅葉", "櫻花", "楓葉", "梅花", "花園", "公園", "森林", "溪谷", "瀑布", "山景", "溫泉"] },
  { label: "景觀拍照", tags: ["夜景", "展望台", "展望", "觀景台", "地標", "拍照", "IG打卡", "夜間點燈"] },
  { label: "體驗活動", tags: ["和服", "和服體驗", "舞妓", "茶道", "頭皮Spa", "Spa", "放鬆", "表演", "遊船", "忍者", "Cosplay", "纜車"] },
  { label: "購物逛街", tags: ["購物", "購物中心", "商店街", "老街", "美食街", "市場", "市集", "百貨", "Outlet", "免稅", "美妝", "伴手禮", "古著"] },
  { label: "親子娛樂", tags: ["親子", "水族館", "動物園", "主題樂園", "小鹿", "鹿", "博物館", "美術館", "動漫", "電玩", "摩天輪"] },
];

const catIcon = (cat) => ({ "景點": "⛩️", "餐廳": "🍜", "市場": "🏮", "購物": "🛍️", "體驗": "🎭" })[cat] || "📍";

const areaStyle = (area) => ({
  "大阪": "bg-shu/10 text-shu border-shu/20",
  "京都": "bg-fuji/10 text-fuji border-fuji/20",
  "宇治": "bg-matcha/10 text-matcha border-matcha/20",
  "奈良": "bg-kohaku/10 text-kohaku border-kohaku/20",
  "神戶": "bg-sora/10 text-sora border-sora/20",
})[area] || "bg-gray-100 text-gray-600 border-gray-200";

export default function App() {
  const [catFilter, setCatFilter] = useState("全部");
  const [areaFilter, setAreaFilter] = useState("全部");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortKey, setSortKey] = useState("rating");
  const [sortDir, setSortDir] = useState("desc");
  const [expandedIdx, setExpandedIdx] = useState(null);

  const availableTags = useMemo(() => {
    const s = new Set();
    DATA.forEach(d => d.tags.forEach(t => s.add(t)));
    return s;
  }, []);

  const groupedTags = useMemo(() => {
    const grouped = TAG_GROUPS.map(g => ({
      label: g.label,
      tags: g.tags.filter(t => availableTags.has(t)),
    })).filter(g => g.tags.length > 0);
    const assigned = new Set(TAG_GROUPS.flatMap(g => g.tags));
    const others = [...availableTags].filter(t => !assigned.has(t)).sort();
    if (others.length > 0) grouped.push({ label: "其他", tags: others });
    return grouped;
  }, [availableTags]);

  const filtered = useMemo(() => {
    let result = DATA;
    if (catFilter !== "全部") result = result.filter(d => d.category === catFilter);
    if (areaFilter !== "全部") result = result.filter(d => d.area === areaFilter);
    if (tagFilter && tagFilter !== "全部") result = result.filter(d => d.tags.includes(tagFilter));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) || d.nameEn.toLowerCase().includes(q) ||
        d.note.toLowerCase().includes(q) || d.subArea.toLowerCase().includes(q) ||
        d.tags.some(t => t.includes(q))
      );
    }
    return [...result].sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (typeof va === "string") { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [catFilter, areaFilter, tagFilter, search, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };
  const sortIcon = (key) => sortKey !== key ? " ↕" : sortDir === "asc" ? " ↑" : " ↓";

  const openGoogleMaps = (item) => {
    const url = item.placeId
      ? `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}&query_place_id=${item.placeId}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nameEn)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-washi">
      {/* Header */}
      <header className="bg-sumi text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E\")", backgroundSize: "60px 60px"}} />
        <div className="relative px-4 py-6 md:py-8 text-center">
          <div className="text-3xl md:text-4xl mb-1">🏮</div>
          <h1 className="text-xl md:text-3xl font-bold">
            <span className="text-shu-light">関西</span>
            <span className="text-kin-light mx-1">旅遊</span>
            <span className="text-white">資料庫</span>
          </h1>
          <p className="text-sm text-white/50 mt-2 tracking-widest">大阪 ・ 京都 ・ 神戶 ・ 奈良 ・ 宇治</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm">
            <span className="text-kin">✦</span>
            <span>共 <b className="text-kin">{DATA.length}</b> 個地點</span>
            <span className="text-white/30">|</span>
            <span>顯示 <b className="text-kin">{filtered.length}</b> 個</span>
          </div>
        </div>
        <div className="wave-divider" />
      </header>

      {/* Filters */}
      <div className="sticky top-0 z-20 bg-washi/95 backdrop-blur-sm border-b border-shu/10 px-3 py-3 space-y-2.5">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-shu/40 text-sm">✦</span>
          <input type="text" placeholder="搜尋景點、餐廳、關鍵字..."
            className="w-full border border-shu/15 bg-white rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-shu/30 focus:border-shu/30 placeholder:text-sumi/30"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${catFilter === c ? "bg-shu text-white border-shu shadow-sm shadow-shu/20" : "bg-white text-sumi-light border-shu/10 hover:border-shu/30 hover:bg-shu/5"}`}>
              {c === "全部" ? "全部" : `${catIcon(c)} ${c}`}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 items-center">
          {AREAS.map(a => (
            <button key={a} onClick={() => setAreaFilter(a)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${areaFilter === a ? "bg-sumi text-white border-sumi" : "bg-white text-sumi-light border-sumi/10 hover:border-sumi/30 hover:bg-sumi/5"}`}>
              {a}
            </button>
          ))}
          <div className="h-5 w-px bg-shu/15 mx-1 hidden sm:block" />
          <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}
            className="text-xs border border-shu/15 rounded-lg px-2.5 py-1.5 bg-white text-sumi-light focus:outline-none focus:ring-1 focus:ring-shu/30">
            <option value="">🏷️ 標籤篩選</option>
            {groupedTags.map(g => (
              <optgroup key={g.label} label={g.label}>
                {g.tags.map(t => <option key={t} value={t}>{t}</option>)}
              </optgroup>
            ))}
          </select>
          <select value={`${sortKey}-${sortDir}`} onChange={e => { const [k, d] = e.target.value.split("-"); setSortKey(k); setSortDir(d); }}
            className="text-xs border border-shu/15 rounded-lg px-2.5 py-1.5 bg-white text-sumi-light focus:outline-none focus:ring-1 focus:ring-shu/30">
            <option value="rating-desc">⭐ 評分高→低</option>
            <option value="rating-asc">⭐ 評分低→高</option>
            <option value="reviews-desc">💬 評論多→少</option>
            <option value="reviews-asc">💬 評論少→多</option>
            <option value="name-asc">🔤 名稱 A→Z</option>
            <option value="name-desc">🔤 名稱 Z→A</option>
          </select>
        </div>
      </div>

      {/* Mobile List */}
      <div className="lg:hidden">
        {filtered.map((item, i) => {
          const isExp = expandedIdx === i;
          return (
            <div key={i} className="border-b border-shu/8 bg-white active:bg-kin-light/30 transition-colors"
              onClick={() => setExpandedIdx(isExp ? null : i)}>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="text-xl w-7 text-center shrink-0">{catIcon(item.category)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sumi text-sm truncate">{item.name}</span>
                    {item.tags.some(t => t === "必去" || t === "必吃") && (
                      <span className="shrink-0 text-[10px] bg-shu text-white px-1.5 py-0.5 rounded font-bold">必訪</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${areaStyle(item.area)}`}>
                      {item.area}・{item.subArea}
                    </span>
                    <span className="text-xs text-sumi/40">{item.price}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-0.5">
                    <span className="text-kin font-bold text-sm">{item.rating}</span>
                    <span className="text-kin text-xs">★</span>
                  </div>
                  <div className="text-[10px] text-sumi/30">{item.reviews >= 1000 ? `${(item.reviews/1000).toFixed(1)}K` : item.reviews}</div>
                </div>
                <div className={`text-sumi/25 text-xs transition-transform ${isExp ? "rotate-180" : ""}`}>▼</div>
              </div>
              {isExp && (
                <div className="px-4 pb-4 pt-0 space-y-2.5 border-t border-shu/5 bg-washi/50">
                  <p className="text-xs text-sumi/40 italic">{item.nameEn}</p>
                  <p className="text-sm text-sumi-light leading-relaxed">{item.note}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map(t => (
                      <span key={t} className={`px-2 py-0.5 rounded-full text-[11px] border ${t === "必去" || t === "必吃" ? "bg-shu/10 text-shu border-shu/20 font-bold" : "bg-white text-sumi/50 border-sumi/10"}`}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-sumi/50">
                    <span>🕐 {item.hours}</span>
                    <span className="font-medium text-sumi">{item.price}</span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); openGoogleMaps(item); }}
                    className="w-full py-2.5 bg-shu hover:bg-shu-dark text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                    ⛩️ 在 Google Maps 開啟
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-sumi text-white/80 sticky top-[117px] z-10">
              <th className="px-3 py-3 text-left font-medium cursor-pointer hover:text-kin whitespace-nowrap" onClick={() => handleSort("name")}>名稱{sortIcon("name")}</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">地區</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">類型</th>
              <th className="px-2 py-3 text-center font-medium cursor-pointer hover:text-kin whitespace-nowrap" onClick={() => handleSort("rating")}>評分{sortIcon("rating")}</th>
              <th className="px-2 py-3 text-center font-medium cursor-pointer hover:text-kin whitespace-nowrap" onClick={() => handleSort("reviews")}>評論{sortIcon("reviews")}</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">營業時間</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">價格</th>
              <th className="px-2 py-3 text-left font-medium whitespace-nowrap">標籤</th>
              <th className="px-2 py-3 text-left font-medium">備註</th>
              <th className="px-2 py-3 text-center font-medium whitespace-nowrap">地圖</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className={`border-b border-shu/5 hover:bg-kin-light/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-washi/60"}`}>
                <td className="px-3 py-3"><div className="font-bold text-sumi">{item.name}</div><div className="text-xs text-sumi/35 mt-0.5">{item.nameEn}</div></td>
                <td className="px-2 py-3"><span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${areaStyle(item.area)}`}>{item.area}</span><div className="text-[11px] text-sumi/35 mt-0.5">{item.subArea}</div></td>
                <td className="px-2 py-3 whitespace-nowrap text-xs">{catIcon(item.category)} {item.category}</td>
                <td className="px-2 py-3 text-center"><span className="font-bold text-kin">{item.rating}</span><span className="text-kin text-xs"> ★</span></td>
                <td className="px-2 py-3 text-center text-xs text-sumi/40">{item.reviews >= 1000 ? `${(item.reviews/1000).toFixed(1)}K` : item.reviews}</td>
                <td className="px-2 py-3 text-xs text-sumi/60 whitespace-nowrap">{item.hours}</td>
                <td className="px-2 py-3 text-xs font-medium text-sumi whitespace-nowrap">{item.price}</td>
                <td className="px-2 py-3"><div className="flex flex-wrap gap-0.5">{item.tags.map(t => (<span key={t} className={`px-1.5 py-0 rounded text-[11px] ${t === "必去" || t === "必吃" ? "bg-shu/10 text-shu font-bold" : "bg-sumi/5 text-sumi/40"}`}>{t}</span>))}</div></td>
                <td className="px-2 py-3 text-xs text-sumi/60 max-w-xs">{item.note}</td>
                <td className="px-2 py-3 text-center"><button onClick={() => openGoogleMaps(item)} className="px-3 py-1.5 bg-shu hover:bg-shu-dark text-white rounded text-xs font-medium transition-colors whitespace-nowrap">⛩️ 開啟</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-sumi/30">
          <p className="text-5xl mb-3">🏮</p>
          <p className="text-lg">找不到符合條件的地點</p>
          <p className="text-sm mt-1">試試其他篩選條件吧</p>
        </div>
      )}

      <footer className="text-center py-6 text-xs text-sumi/25 border-t border-shu/8 mt-4">
        <div className="flex items-center justify-center gap-2">
          <span>✦</span><span>關西旅遊資料庫</span><span className="text-shu/20">|</span><span>點擊列表項目展開詳情</span><span>✦</span>
        </div>
      </footer>
    </div>
  );
}
