/* =========================================================
   JASON AT VIETNAM — script.js
   重要：這個檔案不放任何密碼、API Key、資料庫或 Apps Script 網址。
   ========================================================= */

// 官方 LINE 連結（要換連結：改這一行，並用「取代全部」把 index.html 裡的同一串網址也換掉）
const LINE_URL = 'https://lin.ee/NltI8Vl';

/* ---------------------------------------------------------
   翻譯字典 T
   - 中文：直接寫在 index.html 裡（頁面載入時會自動收集成 T.zh）
   - 英文：改下面 T.en
   - zh 這裡只放「HTML 裡沒有」的訊息模板
   --------------------------------------------------------- */
const T = {
  zh: {
    msg_head: '【Jason at Vietnam 需求整理】',
    m_id: '需求編號', m_city: '旅行城市', m_depart: '出發日期', m_return: '回程日期',
    m_people: '人數', m_who: '同行類型', m_cat: '需求分類', m_budget: '預算區間（USD）', m_notes: '其他需求',
    m_none: '（未填）', copied: '已複製，請貼到官方 LINE 傳給 Jason。', copy_fail: '無法自動複製，請長按訊息框選取後手動複製。',
    need_date: '請先選擇出發日期。'
  },
  en: {
    top_line: 'Official LINE',
    nav_cities: 'Cities', nav_guides: 'Field Notes', nav_services: 'Services', nav_about: 'About Jason', nav_line: 'Join LINE',
    hero_eyebrow: 'Taiwanese in Vietnam · North-to-South Local Access',
    hero_h1: 'Vietnam isn\'t the one in the guidebook,<br><em>it\'s the one I take you to.</em>',
    hero_sub: 'From Ho Chi Minh City to Hanoi, I line up the drivers, guides, hotels and experiences I\'ve personally visited, negotiated and verified. Send me your dates, headcount and budget, and skip the detours.',
    hero_cta1: 'Explore Vietnam', hero_cta2: 'Join Official LINE',
    stat1: 'IG followers', stat2: 'Community members', stat3: 'Years living in Vietnam',
    hero_photo_note: 'Photo of Jason — placeholder',
    trust_title: 'Not a list of names. A Vietnam trip that\'s actually arranged.',
    t1_title: 'Locally verified', t1_text: 'Nothing copied from the internet. I only share arrangements I\'ve personally dealt with and confirmed.',
    t2_title: 'Confirmed before you fly', t2_text: 'Itinerary, meeting points, inclusions and budget are spelled out before departure.',
    t3_title: 'Always updated', t3_text: 'Venues, transport, seasons and rules keep changing, so guides and recommendations are refreshed regularly.',
    cities_title: 'North to South — pick your Vietnam.',
    badge_priority: 'UPDATING FIRST', badge_priority2: 'UPDATING FIRST',
    city1_name: 'Ho Chi Minh City', city1_desc: 'City rhythm, coffee, food and everyday local life.',
    city2_name: 'Hanoi', city2_desc: 'Old Quarter, culture, and the depth of daily life in the north.',
    city3_name: 'Da Nang', city3_desc: 'Coastline, resorts, Hoi An and easy-going travel.',
    city4_name: 'Phu Quoc', city4_desc: 'Island days, sunsets, hotels and slow travel.',
    city_cta: 'City guide →', city_cta2: 'City guide →', city_cta3: 'City guide →', city_cta4: 'City guide →',
    guides_title: 'Jason\'s Field Notes', guides_sub: 'So your first trip to Vietnam avoids a few common mistakes.',
    g1_tag: 'HCMC · Stay', g1_title: 'First time in Ho Chi Minh City: District 1 or Thao Dien?', g1_ex: 'Compare transport, daily convenience and budget to pick the right area for a first visit.',
    g2_tag: 'HCMC · Transport', g2_title: 'HCMC airport to the city: Grab, pickups and common traps', g2_ex: 'How to book a ride after landing, how to confirm the price, and the most common touting situations.',
    g3_tag: 'Hanoi · Itinerary', g3_title: 'First time in Hanoi: how to plan three days smoothly', g3_ex: 'Arrange the Old Quarter, food and half-day trips by flow and pace, without daily back-and-forth.',
    g4_tag: 'General · Stay', g4_title: 'Choosing a hotel in Vietnam: location, budget and peace of mind', g4_ex: 'From location and late-night returns to review authenticity — how to judge a hotel.',
    g5_tag: 'General · Car', g5_title: '6 things to confirm before hiring a private car in Vietnam', g5_ex: 'Vehicle type, hours, mileage, tolls and waiting rules — settle them before you go.',
    g6_tag: 'General · Experience', g6_title: 'Vietnamese hair wash and licensed spas: how to choose well', g6_ex: 'Look at the venue, the price list and the reviews to find a transparent, legitimate way to relax.',
    g7_tag: 'General · Avoid traps', g7_title: '7 surcharge situations travelers meet most often', g7_ex: 'From transport to dining and activities: common last-minute add-ons and how to respond.',
    g8_tag: 'Compare · Cities', g8_title: 'Ho Chi Minh City vs Hanoi: which one for a first trip?', g8_ex: 'Compare the pace and style of both cities by trip length, season and taste.',
    time_4: '4 min read', time_5: '5 min read', time_6: '6 min read',
    updated: 'Last updated: 2026/XX/XX', read: 'Read the guide →',
    guides_all: 'View all guides',
    services_title: 'What I can arrange for you', services_sub: 'You don\'t have to hand me everything — just come to me where you need confirmation, coordination, or protection from bad surprises.',
    sv1_tag: 'Transport', sv1_title: 'Airport transfers & private cars', sv1_desc: 'Vehicle type, timing and total price confirmed in advance — no haggling on arrival.', sv1_for: 'Best for: first-timers, families, travelers with lots of luggage',
    sv2_tag: 'Guide', sv2_title: 'Chinese / English guides & itineraries', sv2_desc: 'Half-day to multi-day plans at your pace, with Chinese or English support when you need it.', sv2_for: 'Best for: travelers who want depth without figuring it all out alone',
    sv3_tag: 'Visa', sv3_title: 'Visa & fast-track information', sv3_desc: 'Visa types, required documents and airport clearance tips, plus information on legitimate application channels.', sv3_for: 'Best for: first-time applicants and tight schedules',
    sv4_tag: 'Booking', sv4_title: 'Hotels, restaurants & signature experiences', sv4_desc: 'Matched to your budget and group type, with location, reviews and booking method confirmed.', sv4_for: 'Best for: friend trips, couples, birthdays and anniversaries',
    sv5_tag: 'Experience', sv5_title: 'Vietnamese hair wash & licensed spa', sv5_desc: 'Licensed venues with clear environments and transparent pricing, explained before you go.', sv5_for: 'Best for: travelers who want a relaxing hair-wash experience with transparent pricing',
    sv6_tag: 'Business', sv6_title: 'Business visits, factory tours & team building', sv6_desc: 'Route planning from north to south, interpreting and group logistics.', sv6_for: 'Best for: sourcing, factory-site evaluation, company trips and team building',
    sv7_tag: 'Custom', sv7_title: 'Private custom trip planning', sv7_desc: 'From city combinations to daily rhythm, planned around your dates, headcount and budget.', sv7_for: 'Best for: solo travelers, couples, small private groups',
    sv_cta1: 'Send Jason your dates', sv_cta2: 'Send Jason your dates', sv_cta3: 'Send Jason your dates', sv_cta4: 'Send Jason your dates', sv_cta5: 'Send Jason your dates', sv_cta6: 'Send Jason your dates', sv_cta7: 'Send Jason your dates',
    sv_more_title: 'Not sure which one?', sv_more_text: 'Send me your dates and headcount and I\'ll point you in the right direction.', sv_more_cta: 'Join Official LINE',
    radar_title: 'Before you book, know these first.',
    r1_title: 'Fake Grab drivers & airport touts', r1_text: 'On arrival, use only the official ride app or a pickup you\'ve confirmed in advance — never follow someone who approaches you.',
    r2_title: 'Vague quotes & last-minute surcharges', r2_text: 'Ask what\'s included and excluded for any service, and get the total price confirmed in writing.',
    r3_title: 'Hotel location & late-night returns', r3_text: 'Look at the location and the route home at night, not only the price and the photos.',
    r4_title: 'What to confirm before hiring a car', r4_text: 'Check the vehicle, hours, distance range, tolls and waiting rules before you agree.',
    r5_title: 'Peak season & sudden sell-outs', r5_text: 'Cars, guides and hotels fill up around holidays and peak season — confirm your dates early.',
    r6_title: 'Legal currency exchange & payment safety', r6_text: 'Please use licensed banks or authorized exchange providers. Jason shares payment and exchange safety information for travelers, and does not provide currency exchange, collection, payment on behalf, or private rates.',
    about_eyebrow: 'About Jason', about_title: 'North to South — a road built over two-plus years.',
    about_text: 'After graduating, I came to Ho Chi Minh City on a trip and later moved into work and life in Vietnam. From a factory in the north to the city in the south, from not understanding Vietnamese to handling the big and small matters of daily life and work. I began organizing the information that actually helps, the reliable partners and the hands-on experience — because in Vietnam, finding information is easy; finding someone who can get things done is hard.',
    about_photo_note: 'Real photo of Jason — placeholder',
    voices_title: 'Traveler feedback & latest updates', voices_note: 'Real feedback will be published once guests give their consent.',
    shot_note: 'Chat screenshot / traveler photo / Google Review placeholder', shot_note2: 'Chat screenshot / traveler photo / Google Review placeholder', shot_note3: 'Chat screenshot / traveler photo / Google Review placeholder',
    v1_text: '"Meeting point and budget were clear before we left. The whole trip felt reassuring."', v1_who: 'Sample feedback · Friends trip',
    v2_text: '"My first time in Hanoi — the plan flowed well and saved me a lot of homework."', v2_who: 'Sample feedback · Solo traveler',
    v3_text: '"Vehicles and timing for our company trip were confirmed very carefully."', v3_who: 'Sample feedback · Team building',
    week_title: 'This week\'s updates', u1: 'HCMC airport transfer info updated', u2: 'Hanoi accommodation-area guide added', u3: 'Vietnam payment safety guide updated',
    tool_title: 'Before you go, let me understand what you need', tool_sub: 'This creates a tidy message you can copy and send to the official LINE.',
    f_city: 'Destination', o_hcmc: 'Ho Chi Minh City', o_hanoi: 'Hanoi', o_danang: 'Da Nang', o_pq: 'Phu Quoc', o_multi: 'Multiple cities / undecided',
    f_people: 'Number of travelers', f_depart: 'Departure date', f_return: 'Return date',
    f_who: 'Travel type', w_friends: 'Friends trip', w_solo: 'Solo travel', w_couple: 'Couple', w_corp: 'Team building', w_biz: 'Business visit',
    f_cat: 'What do you need?', c_car: 'Airport transfer & private car', c_guide: 'Guide & itinerary', c_visa: 'Visa & fast-track info', c_hotel: 'Hotels, dining & experiences', c_spa: 'Hair wash & licensed spa', c_biz: 'Business visit & team building', c_custom: 'Custom trip planning',
    f_budget: 'Budget range (USD)', b1: 'Under $500', b2: '$500–1,500', b3: '$1,500–3,000', b4: '$3,000+', b5: 'Not decided',
    f_notes: 'Anything else', f_notes_ph: 'e.g. places you want to visit, dietary needs, accessibility needs…',
    f_warn: 'Before sending, please do not include your passport, credit card, bank account, or other sensitive personal data.',
    f_nostore: 'This tool only formats text inside your browser. Nothing is stored or uploaded.',
    f_submit: 'Create my request message', res_id_label: 'Request No.', res_done: 'Ready',
    btn_copy: 'Copy request', btn_copy_line: 'Copy & open Official LINE',
    cta_title: 'Not sure where to start? Send me your dates.', cta_text: 'You don\'t have to book anything right away. Tell me where you want to go, how many of you, and how many days — I\'ll help you find a direction first.', cta_btn: 'Join Jason\'s Official LINE',
    priv_title: 'Privacy', priv_text: 'This is a static showcase website and does not collect or store any visitor data. The request tool only builds a message inside your browser and sends nothing to a server. Contact and inquiries happen through the official LINE; please refer to LINE\'s own privacy policy.',
    terms_title: 'Service statement', terms_text: 'Content on this site is for travel information and planning reference. Actual prices, inclusions and availability are subject to confirmation between both parties before departure. Jason does not provide any illegal or inappropriate services, nor currency exchange, collection or payment on behalf.',
    foot_line: 'Official LINE', foot_privacy: 'Privacy', foot_terms: 'Service statement',
    egg_msg: 'Field note: confirm the total price before you go.',
    msg_head: '[Jason at Vietnam — Request Summary]',
    m_id: 'Request No.', m_city: 'Destination', m_depart: 'Departure', m_return: 'Return',
    m_people: 'Travelers', m_who: 'Travel type', m_cat: 'Need', m_budget: 'Budget (USD)', m_notes: 'Notes',
    m_none: '(not provided)', copied: 'Copied — paste it into the official LINE chat with Jason.', copy_fail: 'Auto-copy failed. Long-press the message box to select and copy manually.',
    need_date: 'Please choose a departure date first.'
  }
};

/* 重複使用同一段文字的 key，指向同一則翻譯 */
const ALIAS = {
  top_line:'foot_line',
  badge_priority2:'badge_priority', city_cta2:'city_cta', city_cta3:'city_cta', city_cta4:'city_cta',
  updated2:'updated', updated3:'updated', updated4:'updated', updated5:'updated', updated6:'updated', updated7:'updated', updated8:'updated',
  read2:'read', read3:'read', read4:'read', read5:'read', read6:'read', read7:'read', read8:'read',
  time_5b:'time_5', time_5c:'time_5', time_4b:'time_4', time_4c:'time_4', time_6b:'time_6',
  sv_cta2:'sv_cta1', sv_cta3:'sv_cta1', sv_cta4:'sv_cta1', sv_cta5:'sv_cta1', sv_cta6:'sv_cta1', sv_cta7:'sv_cta1',
  shot_note2:'shot_note', shot_note3:'shot_note'
};

let lang = 'zh';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* 收集 HTML 內的中文，建立 T.zh（頁面載入時執行一次） */
function harvestZh() {
  $$('[data-i18n]').forEach(el => { T.zh[el.dataset.i18n] = el.textContent.trim(); });
  $$('[data-i18n-html]').forEach(el => { T.zh[el.dataset.i18nHtml] = el.innerHTML.trim(); });
  $$('[data-i18n-ph]').forEach(el => { T.zh[el.dataset.i18nPh] = el.getAttribute('placeholder') || ''; });
}
const tr = key => (T[lang][key] ?? T[lang][ALIAS[key]] ?? T.zh[key] ?? '');

/* 套用語言 */
function applyLang(next) {
  lang = next;
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
  $$('[data-i18n]').forEach(el => { const v = tr(el.dataset.i18n); if (v) el.textContent = v; });
  $$('[data-i18n-html]').forEach(el => { const v = tr(el.dataset.i18nHtml); if (v) el.innerHTML = v; });
  $$('[data-i18n-ph]').forEach(el => { const v = tr(el.dataset.i18nPh); if (v) el.setAttribute('placeholder', v); });
  $('#langBtn').textContent = lang === 'zh' ? 'EN' : '中文';
  if (!$('#result').hidden) buildMessage(); // 已產生訊息時，同步切換語言
}

/* ---------- 導覽：手機選單 / 語言 ---------- */
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.classList.remove('open'); } });
$('#langBtn').addEventListener('click', () => applyLang(lang === 'zh' ? 'en' : 'zh'));

/* ---------- 捲動出現 ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12 }) : null;
$$('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

/* ---------- 需求整理工具（只在瀏覽器內整理文字，不儲存、不上傳） ---------- */
let reqId = '';
const label = id => { const el = $(id); return el.selectedOptions ? el.selectedOptions[0].textContent.trim() : el.value; };

function buildMessage() {
  const none = tr('m_none');
  const v = id => ($(id).value || '').trim() || none;
  const lines = [
    tr('msg_head'),
    `${tr('m_id')}：${reqId}`,
    `${tr('m_city')}：${label('#f_city')}`,
    `${tr('m_depart')}：${v('#f_depart')}`,
    `${tr('m_return')}：${v('#f_return')}`,
    `${tr('m_people')}：${v('#f_people')}`,
    `${tr('m_who')}：${label('#f_who')}`,
    `${tr('m_cat')}：${label('#f_cat')}`,
    `${tr('m_budget')}：${label('#f_budget')}`,
    `${tr('m_notes')}：${v('#f_notes')}`
  ];
  $('#msgBox').textContent = lines.join('\n');
  $('#reqId').textContent = reqId;
}

$('#needForm').addEventListener('submit', e => {
  e.preventDefault();
  // 示範用編號（只是顯示用，不代表任何已儲存的資料）
  reqId = 'JV-DEMO-2026-' + String(Math.floor(Math.random() * 900) + 1).padStart(3, '0');
  $('#copyStatus').textContent = '';
  buildMessage();
  $('#result').hidden = false;
  $('#result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

async function copyText() {
  const text = $('#msgBox').textContent;
  try { await navigator.clipboard.writeText(text); $('#copyStatus').textContent = tr('copied'); return true; }
  catch (_) {
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch (_) {}
    ta.remove(); $('#copyStatus').textContent = ok ? tr('copied') : tr('copy_fail'); return ok;
  }
}
$('#copyBtn').addEventListener('click', copyText);
$('#copyLineBtn').addEventListener('click', async () => { await copyText(); window.open(LINE_URL, '_blank', 'noopener'); });

/* ---------- 頁尾彩蛋 ---------- */
$('#egg').addEventListener('click', () => { const m = $('#eggMsg'); m.hidden = !m.hidden; });

/* 啟動 */
harvestZh();
