/**
 * God's Eye View — Traditional Chinese (繁體中文) UI overlay plugin
 * -------------------------------------------------------------
 * This file does NOT modify any upstream source file. It runs as an
 * independent module that watches the live DOM and swaps known English
 * UI strings for their Traditional Chinese equivalents, using a static
 * dictionary plus a handful of pattern rules for dynamic labels
 * (e.g. "Live Flights: OFF" -> "即時航班：關閉").
 *
 * To update upstream (git pull), this file and the single <script> tag
 * that loads it (see index.html) are the only local additions — nothing
 * else needs to be reconciled.
 *
 * Coverage: the main application chrome — top dock, side panels
 * (DATA LAYERS / SCENES / DISPLAY / CCTV / CONTEXT / RADIO), the
 * first-run "Mission Control" panel, and the POWER UP / Provider
 * Settings panel — plus their tooltips (aria-label / title). Deep,
 * rarely seen strings, and free-form flavour text in the spy-HUD
 * corner readouts, are intentionally left in English. Extend the
 * DICTIONARY / PATTERNS below to add more.
 */

// ---------------------------------------------------------------------
// 1. Static dictionary: exact (trimmed) string match -> 繁體中文
// ---------------------------------------------------------------------
const DICTIONARY = {
  // Tagline
  "NO PLACE LEFT BEHIND": "無處遁形，盡收眼底",

  // Top dock / status
  "ACTIVE STYLE": "目前風格",
  "SYNCING ROAD NETWORK": "同步道路網路中",
  "LOADING FRAMES": "載入影格中",
  LOCATION: "位置",
  "AI AGENT": "AI 助理",
  ON: "開啟",
  OFF: "關閉",
  STD: "標準",
  MINI: "精簡",
  "ON/OFF": "開／關",
  "VOICE STANDBY": "語音待命中",
  "VISUAL PRESETS": "視覺預設",
  "DATA LAYERS": "資料圖層",
  SCENES: "場景",
  DISPLAY: "顯示設定",
  CCTV: "監視器",
  CONTEXT: "情境總覽",
  CONTACTS: "鄰近目標",
  RADIO: "電台",

  // First-run "Mission Control" panel
  "MISSION CONTROL · FIRST LAUNCH": "任務管制 · 首次啟動",
  "Choose your first view": "選擇你的第一個視角",
  "It feels like a forbidden cockpit—then you realize the sources are public and the data is real.":
    "感覺像坐進了禁忌的駕駛艙——接著你發現，這些資料來源全是公開的，而且都是真實資料。",
  "LIVE CONTACTS": "即時目標",
  "Aircraft, vessels and nearby intelligence": "飛機、船艦與周邊情資",
  "SPACE MISSIONS": "太空任務",
  "Launches, spacecraft and orbital context": "發射任務、太空載具與軌道情境",
  ENVIRONMENTAL: "環境事件",
  "Live earthquakes and active fires, from USGS and NASA":
    "來自 USGS 與 NASA 的即時地震與野火資訊",
  "EXPLORE MANUALLY": "自由探索",
  "Begin with a clean globe": "從空白地球開始",
  "Don't show this again": "不要再顯示",
  "ESC TO DISMISS": "按 ESC 關閉",
  "Tip: the GEV MIC button in the dock lets you talk to the map.":
    "提示：工具列上的 GEV MIC 按鈕可以讓你用語音操控地圖。",

  // POWER UP / Provider Settings
  "GROUND STATION · PROVIDER SETTINGS": "地面站 · 服務供應商設定",
  "Power up the globe": "強化你的地球",
  "The globe already flies keyless. Every key below switches on another real feed — paste one and it's saved into this app's local configuration, then the server restarts itself. Server-side keys stay on this machine; Google Maps and Cesium ion run in the browser and must be provider-restricted. Keys you configured elsewhere are shown but never touched.":
    "地球在沒有金鑰的情況下也能運作。以下每組金鑰都能開啟另一種真實資料來源——貼上金鑰後會儲存到本機設定，伺服器會自動重新啟動。伺服器端金鑰只留在這台機器上；Google 地圖與 Cesium ion 是在瀏覽器端執行，必須在服務供應商那端做網域限制。若你在別處已設定過金鑰，這裡會顯示但不會被更動。",
  "GOOGLE MAPS": "GOOGLE 地圖",
  "BROWSER-SIDE": "瀏覽器端",
  "GET KEY ↗": "取得金鑰 ↗",
  "The photorealistic 3D planet + place search": "逼真 3D 地球 + 地點搜尋",
  OPENAI: "OPENAI",
  "Voice control — talk to the planet": "語音控制 — 與地球對話",
  AISSTREAM: "AISSTREAM",
  "Live ships, worldwide": "全球即時船艦",
  "NASA FIRMS": "NASA FIRMS",
  "Live active-fire detections": "即時野火偵測",
  TOMTOM: "TOMTOM",
  "Real live traffic (keyless runs a simulation)":
    "真實即時路況（未設定金鑰則顯示模擬路況）",
  "CESIUM ION": "CESIUM ION",
  "Bing imagery map stacks + world terrain": "Bing 影像地圖疊層 + 世界地形",
  OPENSKY: "OPENSKY",
  "More flight-polling credits (anonymous works without)":
    "更多飛行資料查詢額度（匿名亦可使用）",
  "LAUNCH LIBRARY": "LAUNCH LIBRARY",
  "Higher space-missions request allowance": "更高的太空任務查詢額度",
  "SAVE KEYS": "儲存金鑰",
  "ESC TO CLOSE": "按 ESC 關閉",
  "The Google Maps key buys the photorealistic planet — everything else stacks on top.":
    "Google 地圖金鑰能解鎖逼真 3D 地球——其餘功能都是疊加上去的加值項目。",

  // Scenes panel
  NEW: "新增",
  DEL: "刪除",
  "CAPTURE SHOT": "擷取鏡頭",
  "UPDATE SHOT": "更新鏡頭",
  LOAD: "載入",
  START: "開始",
  STOP: "停止",
  NEXT: "下一個",
  "EXPORT PRESETS": "匯出預設",
  IMPORT: "匯入",
  "RUN LOG": "執行紀錄",
  Ready: "就緒",
  "EDIT DETAILS": "編輯詳細資料",
  "SHARE SCENE": "分享場景",

  // Context panel
  "SELECT CONTEXT": "選擇情境",
  "CONTACTS — nearest planes · vessels · sites":
    "鄰近目標 — 最近的飛機・船艦・地點",
  "SPACE MISSIONS — launches & orbital assets": "太空任務 — 發射與軌道資產",

  // Radio panel
  ENABLE: "啟用",
  DISABLE: "停用",
  "STATION TAG": "電台標籤",
  All: "全部",
  "NO STATION SELECTED": "尚未選擇電台",
  "Choose a globe marker or use next.": "請選擇地球上的標記，或使用「下一個」。",
  PREV: "上一個",
  PLAY: "播放",
  VOLUME: "音量",
  "Radio off": "電台已關閉",
  "DIRECTORY: RADIO BROWSER": "目錄：RADIO BROWSER",
  "Audio connects directly to the broadcaster after you press play. Your IP is visible to that broadcaster.":
    "按下播放後，音訊會直接連線到電台廣播方，你的 IP 位址將會被該電台看見。",
  "LOCAL RTL-SDR": "本地 RTL-SDR",
  IDLE: "閒置",
  "Chrome/Edge · WebUSB · one local tuner shared by FM and the Local ADS-B layer.":
    "Chrome/Edge・WebUSB・FM 與本地 ADS-B 圖層共用同一個本地調頻器。",
  CONNECT: "連接",
  LOCATE: "定位",
  "CHANGE DEVICE": "更換裝置",
  GAIN: "增益",
  AUTO: "自動",
  TUNE: "調頻",
  "◀ SEEK": "◀ 搜尋",
  "SEEK ▶": "搜尋 ▶",
  "SDR VOL": "SDR 音量",
  "Connect an RTL-SDR to begin.": "請連接 RTL-SDR 以開始使用。",

  // Rocket-launch / booster-core replay panel
  Core: "核心",
  EXPENDED: "已耗盡",
  Expended: "已耗盡",
  RECOVERED: "已回收",
  Recovered: "已回收",
  "LANDING SUCCESSFUL": "著陸成功",
  "LANDING FAILURE": "著陸失敗",
  FLIGHT: "飛行",
  "POSITION UNAVAILABLE": "位置無法取得",
  "REPLAY SPEED": "播放速度",
  FOCUS: "聚焦",
  "REPLAY ASCENT": "重播上升過程",
  "SHOW ALL / DESELECT": "顯示全部／取消選取",
  "SELECTED SPACE MISSION": "已選擇的太空任務",
  "Launch Successful": "發射成功",
  "Launch in Flight": "發射進行中",
  "Launch Failure": "發射失敗",
  "Launch Scheduled": "已排定發射",
  "Launch Postponed": "發射延後",
  "LAUNCH SITE": "發射場",
  "LAUNCH TIME": "發射時間",
  ORBIT: "軌道",
  "ASCENT PATH": "上升軌跡",
  "RECONSTRUCTED ESTIMATE": "重建推估",

  // Misc
  "Data attribution": "資料來源標示",

  // ---- Tooltips / aria-label / title ----
  "Close data attribution": "關閉資料來源標示",
  "Visible map targets": "地圖上可見的目標",
  "Globe actions": "地球操作",
  "Clear selected data layers": "清除已選取的資料圖層",
  "Copy share link": "複製分享連結",
  "Return map to straight-down view": "將地圖返回垂直俯視視角",
  "Reset to full globe view": "重設為完整地球視角",
  "Aircraft cockpit view": "飛機駕駛艙視角",
  "Estimated destination direction": "預估目的地方向",
  "Cockpit vision style": "駕駛艙視覺風格",
  "Previous cockpit vision style": "上一個駕駛艙視覺風格",
  "Next cockpit vision style": "下一個駕駛艙視覺風格",
  "Current aircraft heading": "目前機首方向",
  "Contact cockpit summary": "目標駕駛艙摘要",
  "Contact navigation": "目標導航",
  "Previous — prior visited contact in the 250 km window":
    "上一個 — 250 公里範圍內先前造訪過的目標",
  "Next — nearest unvisited contact in the 250 km window":
    "下一個 — 250 公里範圍內最近的未造訪目標",
  "Collapse Contact panel": "收合目標面板",
  "Nearby cohort counts": "鄰近群組計數",
  "Enable cockpit weather effects": "啟用駕駛艙天氣特效",
  "Cockpit briefing carousel": "駕駛艙簡報輪播",
  "Estimated flight plan": "預估飛行計畫",
  "Cockpit briefing controls": "駕駛艙簡報控制",
  "Previous briefing page": "上一頁簡報",
  "Next briefing page": "下一頁簡報",
  "CYCLE OFF": "停止輪播",
  "Collapse cockpit briefing panel": "收合駕駛艙簡報面板",
  "Live signals": "即時訊號",
  "Latest regional news": "最新區域新聞",
  "Location-based information": "在地資訊",
  "Cockpit briefing pages": "駕駛艙簡報頁面",
  "Show Live Signals": "顯示即時訊號",
  "Show Regional News": "顯示區域新聞",
  "Show Local Info": "顯示在地資訊",
  "Cockpit display and Radio controls": "駕駛艙顯示與電台控制",
  "Expand Cockpit display options": "展開駕駛艙顯示選項",
  "Cockpit display options": "駕駛艙顯示選項",
  "Expand Cockpit Radio controls": "展開駕駛艙電台控制",
  "Cockpit compact Radio controls": "駕駛艙精簡電台控制",
  "Enable Radio": "啟用電台",
  "Previous filtered radio station": "上一個篩選後的電台",
  "Play nearest radio station": "播放最近的電台",
  "Next filtered radio station": "下一個篩選後的電台",
  "Cockpit Radio volume": "駕駛艙電台音量",
  "View switcher": "視角切換",
  "Reset cockpit to full globe view": "將駕駛艙重設為完整地球視角",
  "Exit cockpit view": "離開駕駛艙視角",
  "Navigation, voice, and visual preset controls": "導航、語音與視覺預設控制",
  "Collapse LOCATION": "收合位置",
  "Pin location tray": "釘選位置面板",
  "Search location by name or coordinates": "以名稱或座標搜尋位置",
  "Voice control — activate to toggle voice; hold Space to speak":
    "語音控制 — 點擊切換語音；按住空白鍵說話",
  "Expand VISUAL PRESETS": "展開視覺預設",
  "Pin visual presets": "釘選視覺預設",
  "Map source": "地圖來源",
  "Expand DATA LAYERS": "展開資料圖層",
  "Collapse SCENES": "收合場景",
  "Scene recipe": "場景配方",
  "Expand DISPLAY": "展開顯示設定",
  "HUD layout": "HUD 版面",
  "Cyber sonar contact scanner": "電子聲納目標掃描器",
  "Sonar ring count": "聲納環數",
  "Sonar ring range": "聲納環範圍",
  "Sonar intensity": "聲納強度",
  "Cyber contact and label opacity": "目標與標籤透明度",
  "Sonar sector width": "聲納扇區寬度",
  "Detection overlay: dense": "偵測疊層：密集",
  "Detection label density": "偵測標籤密度",
  "Detection label allocation": "偵測標籤配置",
  "Detection fade distance": "偵測淡出距離",
  "Detection opacity outside the keyhole": "鎖定範圍外的偵測透明度",
  "Collapse panel": "收合面板",
  "3D model coverage": "3D 模型涵蓋範圍",
  "Scope edge feather": "範圍邊緣羽化",
  "Shape to draw": "繪製形狀",
  "Label for the drawn shape": "繪製形狀的標籤",
  "Colour of the drawn shape": "繪製形狀的顏色",
  "Bloom intensity": "光暈強度",
  "Sharpen intensity": "銳化強度",
  "Expand CCTV": "展開監視器",
  "CCTV camera": "監視器攝影機",
  "Camera pose — click a value to type": "攝影機姿態 — 點選數值以輸入",

  // DATA LAYERS panel — category headers
  Movement: "移動",
  Infrastructure: "基礎設施",
  Events: "事件",
  Weather: "天氣",
  Utilities: "公用服務",
  "Other layers": "其他圖層",

  // DATA LAYERS panel — per-row feed-state labels
  LOADING: "載入中",
  DEGRADED: "訊號不穩",
  STALE: "資料過期",
  PARTIAL: "部分資料",
  FALLBACK: "備援來源",
  UNAVAILABLE: "無法使用",
  UNCERTAIN: "狀態不明",
  ENABLING: "啟用中",
  DISABLING: "停用中",
  "KEY REQUIRED": "需要金鑰",

  // DATA LAYERS panel — meta/status row fragments
  never: "從未更新",
  "just now": "剛剛",
  "loading...": "載入中…",
  "refreshing...": "更新中…",
  "incomplete snapshot": "資料不完整",
  "live feed unsupported": "不支援即時資料來源",
  "connecting to feed…": "連線資料來源中…",
  "feed disconnected": "資料來源已中斷",
  "feed down": "資料來源異常",
  "feed idle": "資料來源閒置中",
  "AISSTREAM_API_KEY not set": "尚未設定 AISSTREAM_API_KEY",
  "AISSTREAM_API_KEY is not set": "尚未設定 AISSTREAM_API_KEY",
};

// Radio station-tag/genre names shown as "Name (count)" in the RADIO panel's
// station-tag dropdown (e.g. "News (117)" -> "新聞 (117)").
const TAG_NAMES = {
  All: "全部",
  News: "新聞",
  Talk: "談話",
  "Weather / Emergency": "天氣／緊急",
  "Public Safety": "公共安全",
  "Aviation / Marine": "航空／海事",
  "Traffic / Transit": "路況／交通",
  Music: "音樂",
  Alternative: "另類",
  Ambient: "氛圍",
  Blues: "藍調",
  Classical: "古典",
  Country: "鄉村",
  Dance: "舞曲",
  Electronic: "電子",
  Folk: "民謠",
  Funk: "放克",
  "Hip-Hop": "嘻哈",
  House: "浩室",
  Indie: "獨立",
  Jazz: "爵士",
  Latin: "拉丁",
  Metal: "重金屬",
  Oldies: "老歌",
  Pop: "流行",
  Punk: "龐克",
  "R&B": "節奏藍調",
  Reggae: "雷鬼",
  Rock: "搖滾",
  Soul: "靈魂樂",
  Techno: "科技舞曲",
  Trance: "迷幻電子",
  World: "世界音樂",
  Christian: "基督教",
  Comedy: "喜劇",
  Culture: "文化",
  Education: "教育",
  Health: "健康",
  Kids: "兒童",
  Local: "在地",
  National: "全國",
  Community: "社區",
  Sports: "體育",
  Science: "科學",
  Various: "綜合",
  Religion: "宗教",
  Chill: "輕鬆",
  Lounge: "休閒",
};

// Layer names shown in "X: ON" / "X: OFF" style aria-labels and legend rows.
const LAYER_NAMES = {
  Satellites: "衛星",
  "Live Flights": "即時航班",
  "Military Flights": "軍機動態",
  "Local ADS-B": "本地 ADS-B",
  "Live Vessels": "即時船艦",
  "Street Traffic": "街道路況",
  Transit: "大眾運輸",
  "Bike Share": "共享單車",
  Cameras: "監視器",
  "Recent Imagery": "最新影像",
  "Mapped ALPR Cameras": "車牌辨識攝影機",
  "Mapped Installations": "軍事設施標記",
  "Data Centers": "資料中心",
  "Submarine Cables": "海底電纜",
  Dams: "水壩",
  "Space Missions (30d)": "太空任務（30 天）",
  "Earthquakes (24h)": "地震（24 小時）",
  "Active Fires": "活躍野火",
  "Fire Perimeters": "野火範圍",
  Wind: "風場",
  "Rain radar": "雨量雷達",
  "Satellite clouds": "衛星雲圖",
  "Lightning density": "閃電密度",
  "Cyclone advisories": "氣旋警報",
  Directions: "路線規劃",
  Radio: "電台",
};

// The DATA LAYERS panel renders each layer's plain name on its own (no
// ": ON/OFF" suffix) as the row heading, so the same names need to match
// as standalone dictionary entries too, not just inside the ON/OFF pattern.
Object.assign(DICTIONARY, LAYER_NAMES);

// ---------------------------------------------------------------------
// 2. Dynamic pattern rules: regex -> replacer(match) => 繁體中文
// ---------------------------------------------------------------------
const layerNamePattern = Object.keys(LAYER_NAMES)
  .sort((a, b) => b.length - a.length) // longest first, avoid partial shadowing
  .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");

const tagNamePattern = Object.keys(TAG_NAMES)
  .sort((a, b) => b.length - a.length)
  .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");

const PATTERNS = [
  // "Live Flights: ON" / "Live Vessels: OFF" -> "即時航班：開啟"
  {
    re: new RegExp(`^(${layerNamePattern}): (ON|OFF)$`),
    replace: (m) => `${LAYER_NAMES[m[1]]}：${m[2] === "ON" ? "開啟" : "關閉"}`,
  },
  // Radio station-tag dropdown: "News (117)" -> "新聞 (117)"
  {
    re: new RegExp(`^(${tagNamePattern}) \\((\\d+)\\)$`),
    replace: (m) => `${TAG_NAMES[m[1]]} (${m[2]})`,
  },
  // "POWER UP · 8 KEYS WAITING"
  {
    re: /^POWER UP · (\d+) KEYS? WAITING$/,
    replace: (m) => `強化功能 · 還有 ${m[1]} 組金鑰可設定`,
  },
  { re: /^POWERED UP$/, replace: () => "已強化" },
  // "Reset map to north up. Current heading 15 degrees"
  {
    re: /^Reset map to north up\. Current heading (-?\d+(?:\.\d+)?) degrees$/,
    replace: (m) => `重設地圖為北方朝上。目前航向 ${m[1]} 度`,
  },
  // "Current cockpit vision style: NORMAL. Activate for next style."
  {
    re: /^Current cockpit vision style: (.+)\. Activate for next style\.$/,
    replace: (m) => `目前駕駛艙視覺風格：${m[1]}。點擊切換下一個風格。`,
  },

  // DATA LAYERS panel — relative-time / status fragments
  { re: /^(\d+)s ago$/, replace: (m) => `${m[1]} 秒前` },
  { re: /^(\d+)m ago$/, replace: (m) => `${m[1]} 分鐘前` },
  { re: /^(\d+)h ago$/, replace: (m) => `${m[1]} 小時前` },
  { re: /^retry (\d+)s$/, replace: (m) => `${m[1]} 秒後重試` },
  { re: /^retrying in (\d+)s$/, replace: (m) => `${m[1]} 秒後重試` },
  {
    re: /^(\d+) of (\d+) records accepted$/,
    replace: (m) => `已接受 ${m[1]} / ${m[2]} 筆資料`,
  },
  {
    re: /^UNCERTAIN · (.+) · lifecycle state requires reconciliation$/,
    replace: (m) => `狀態不明 · ${m[1]} · 需要重新同步狀態`,
  },
  { re: /^ENABLING · (.+)$/, replace: (m) => `啟用中 · ${m[1]}` },
  { re: /^DISABLING · (.+)$/, replace: (m) => `停用中 · ${m[1]}` },
  { re: /^STALE · cached (.+)$/, replace: (m) => `資料過期 · 快取於 ${m[1]}` },
  { re: /^LIVE · updated (.+)$/, replace: (m) => `即時 · 更新於 ${m[1]}` },

  // DATA LAYERS panel meta row: "<source> · <time>" combined in one text
  // node, e.g. "CelesTrak · never" / "OpenSky Network · 42s ago".
  { re: /^(.+) · never$/, replace: (m) => `${m[1]} · 從未更新` },
  { re: /^(.+) · just now$/, replace: (m) => `${m[1]} · 剛剛` },
  { re: /^(.+) · (\d+)s ago$/, replace: (m) => `${m[1]} · ${m[2]} 秒前` },
  { re: /^(.+) · (\d+)m ago$/, replace: (m) => `${m[1]} · ${m[2]} 分鐘前` },
  { re: /^(.+) · (\d+)h ago$/, replace: (m) => `${m[1]} · ${m[2]} 小時前` },
];

// ---------------------------------------------------------------------
// 3. Runtime engine — exact match first, then patterns; skip icon glyphs
// ---------------------------------------------------------------------
const SKIP_ANCESTOR_SELECTOR =
  ".material-symbols-outlined, script, style, noscript, #gev-zh-tw-toggle";
const ATTRS_TO_TRANSLATE = ["aria-label", "title", "placeholder"];

// ---------------------------------------------------------------------
// Language toggle — remembered in localStorage, applied by reloading the
// page (the app's own text keeps regenerating live, so flipping languages
// without a reload would require re-deriving every original English string,
// which the app doesn't expose). A small floating button lets you switch.
// ---------------------------------------------------------------------
const STORAGE_KEY = "gev-zh-tw-enabled";

function isTranslationEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "false";
  } catch (e) {
    return true;
  }
}

function setTranslationEnabled(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
  } catch (e) {
    /* ignore (private browsing, etc.) */
  }
}

function injectLanguageToggle() {
  if (document.getElementById("gev-zh-tw-toggle")) return;
  const enabled = isTranslationEnabled();
  const btn = document.createElement("button");
  btn.id = "gev-zh-tw-toggle";
  btn.type = "button";
  btn.textContent = enabled ? "EN" : "中";
  btn.title = enabled
    ? "Switch interface to English"
    : "切換介面為繁體中文";
  Object.assign(btn.style, {
    position: "fixed",
    right: "10px",
    bottom: "10px",
    zIndex: "2147483647",
    padding: "6px 12px",
    fontSize: "12px",
    fontFamily: "monospace, sans-serif",
    fontWeight: "600",
    letterSpacing: "1px",
    background: "rgba(8, 20, 28, 0.88)",
    color: "#7fe7ff",
    border: "1px solid #2a6b7a",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
  });
  btn.addEventListener("click", () => {
    setTranslationEnabled(!isTranslationEnabled());
    location.reload();
  });
  document.body.appendChild(btn);
}

function translateString(raw) {
  const text = raw;
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (Object.prototype.hasOwnProperty.call(DICTIONARY, trimmed)) {
    const translated = DICTIONARY[trimmed];
    // preserve surrounding whitespace from the original node
    return text.replace(trimmed, translated);
  }
  for (const { re, replace } of PATTERNS) {
    const m = trimmed.match(re);
    if (m) return text.replace(trimmed, replace(m));
  }
  return null;
}

function isSkippable(node) {
  const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  return !!(el && el.closest && el.closest(SKIP_ANCESTOR_SELECTOR));
}

function walkTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_SKIP;
      if (isSkippable(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const out = [];
  let n;
  while ((n = walker.nextNode())) out.push(n);
  return out;
}

function translateTextNode(node) {
  const translated = translateString(node.nodeValue);
  if (translated !== null && translated !== node.nodeValue) {
    node.nodeValue = translated;
  }
}

function translateAttributes(el) {
  if (isSkippable(el)) return;
  for (const attr of ATTRS_TO_TRANSLATE) {
    const val = el.getAttribute && el.getAttribute(attr);
    if (!val) continue;
    const translated = translateString(val);
    if (translated !== null && translated !== val) {
      el.setAttribute(attr, translated);
    }
  }
}

function translateSubtree(root) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;

  for (const node of walkTextNodes(root)) translateTextNode(node);

  if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root);
  const els = root.querySelectorAll ? root.querySelectorAll("*") : [];
  for (const el of els) translateAttributes(el);
}

function runFullPass() {
  translateSubtree(document.body);
  if (document.title) document.title = "上帝之眼視角 God's Eye View";
}

// ---------------------------------------------------------------------
// Scroll-position guard for the app's own panel-rail scrollers (e.g. the
// DATA LAYERS list, `.data-toggle-list`, and others that aren't all marked
// with a shared attribute or class). The app periodically re-measures these
// panels to fit the viewport, which can momentarily un-clip a list (so it
// briefly isn't "overflowing") and the browser then clamps scrollTop to 0 —
// a native side effect of the *measurement*, not of our translation. It
// only becomes visible in Chinese mode because translating produces extra
// DOM writes each time the app refreshes a row's text, and reading layout
// (scrollHeight/clientHeight) synchronously from inside our own mutation
// handling forces the browser to flush layout at exactly the wrong moment,
// making the clamp trigger far more often. So the checks below deliberately
// never run inside the MutationObserver callback or the per-mutation text
// flush — only on a plain timer, after layout has already settled — and a
// reset is distinguished from a real user scroll by whether a user gesture
// (pointer/wheel/touch/key) on that element happened just before it.
// ---------------------------------------------------------------------
const lastUserScrollTop = new WeakMap();
const lastGestureAt = new WeakMap();
const guardedScrollers = new WeakSet();
const trackedScrollers = new Set();
const GESTURE_EVENTS = ["pointerdown", "wheel", "touchstart", "keydown"];

function isActuallyScrollable(el) {
  return !!(el && el.scrollHeight > el.clientHeight + 5);
}

function markGesture(el) {
  lastGestureAt.set(el, Date.now());
}

function guardRailScroller(el) {
  trackedScrollers.add(el);
  if (guardedScrollers.has(el)) return;
  guardedScrollers.add(el);
  lastUserScrollTop.set(el, el.scrollTop);
  for (const type of GESTURE_EVENTS) {
    el.addEventListener(type, () => markGesture(el), { passive: true });
  }
  el.addEventListener(
    "scroll",
    () => {
      const gestureAt = lastGestureAt.get(el) || 0;
      const recentGesture = Date.now() - gestureAt < 500;
      const newTop = el.scrollTop;
      const known = lastUserScrollTop.get(el) || 0;
      // A large drop with no gesture just before it is the app's own
      // re-measure clamp, not the user scrolling to the top — restore
      // once the browser finishes whatever it's doing this frame.
      if (known > 20 && newTop < known - 15 && !recentGesture) {
        requestAnimationFrame(() => {
          if (el.isConnected && el.scrollHeight > el.clientHeight) el.scrollTop = known;
        });
        return;
      }
      lastUserScrollTop.set(el, newTop);
    },
    { passive: true },
  );
}

function guardRailScrollersIn(root) {
  if (!root) return;
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
  if (root.nodeType === Node.ELEMENT_NODE && isActuallyScrollable(root)) guardRailScroller(root);
  const els = root.querySelectorAll ? root.querySelectorAll("*") : [];
  for (const el of els) if (isActuallyScrollable(el)) guardRailScroller(el);
}

// New elements (panels expanding, scene lists rendering, etc.) are translated
// immediately and synchronously so nothing gets dropped. Only the
// high-frequency case — a text node's value being rewritten in place, which
// happens many times a second for live telemetry/HUD readouts — is coalesced
// through a short debounce, keyed per-node so every distinct node still gets
// processed (never just "the first one this tick").
const dirtyTextNodes = new Set();
let flushScheduled = false;

function flushDirtyTextNodes() {
  flushScheduled = false;
  for (const node of dirtyTextNodes) translateTextNode(node);
  dirtyTextNodes.clear();
}

function scheduleTextNodeFlush(node) {
  dirtyTextNodes.add(node);
  if (flushScheduled) return;
  flushScheduled = true;
  if (window.requestIdleCallback) window.requestIdleCallback(flushDirtyTextNodes, { timeout: 300 });
  else setTimeout(flushDirtyTextNodes, 80);
}

function start() {
  injectLanguageToggle();

  // The scroll-reset-to-top bug in panel-rail lists (see the comment above
  // guardRailScroller) is the app's own, independent of language — it just
  // happens to be easier to trigger in Chinese mode because translating
  // produces extra DOM churn. Run the guard in both languages.
  //
  // Discovery (which elements scroll) is scheduled with requestIdleCallback
  // rather than a plain setInterval. Reading scrollHeight/clientHeight
  // forces the browser to flush any pending layout right then — on a timer
  // that can land at any moment, including mid-render, which itself was
  // making things worse (observed: forcing this scan during a live re-fetch
  // could knock other in-flight layer reloads into a retry loop). Idle
  // callbacks only run once the browser has nothing more pressing to do.
  const scheduleIdle =
    window.requestIdleCallback ||
    ((fn) => setTimeout(fn, 500));
  function scanForScrollersWhenIdle() {
    scheduleIdle(
      () => {
        guardRailScrollersIn(document.body);
        scanForScrollersWhenIdle();
      },
      { timeout: 2000 },
    );
  }
  scanForScrollersWhenIdle();

  if (!isTranslationEnabled()) return; // English mode: leave the app's text untouched

  runFullPass();
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "childList" && m.addedNodes.length) {
        // Structural changes (a panel expanding, a list re-rendering) are
        // comparatively rare — translate them right away so every added
        // node is covered, not just the first one seen this tick. (Scroll
        // guarding deliberately does NOT run here — see the comment above
        // guardRailScroller — it only runs on the periodic timer below.)
        translateSubtree(m.target);
      } else if (m.type === "characterData") {
        scheduleTextNodeFlush(m.target);
      } else if (m.type === "attributes") {
        if (m.target.nodeType === Node.ELEMENT_NODE) translateAttributes(m.target);
      }
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRS_TO_TRANSLATE,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
