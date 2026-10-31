# JASON AT VIETNAM — 靜態網站

純 HTML / CSS / JavaScript，不需要安裝任何東西、不需要 build，直接放上 GitHub Pages 就能用。

檔案：`index.html`（內容與中文文案）、`styles.css`（樣式）、`script.js`（英文翻譯、語言切換、需求整理工具）。

---

## 1. 如何上傳到 GitHub Pages

1. 登入 GitHub → 右上角 **+** → **New repository**，名稱自訂（例如 `jason-at-vietnam`），選 **Public**，建立。
2. 在 repository 頁面按 **Add file → Upload files**，把 `index.html`、`styles.css`、`script.js`、`README.md` 一起拖進去，按 **Commit changes**。
3. 到 **Settings → Pages**：Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
4. 等 1～2 分鐘，頁面上方會顯示你的網址：`https://你的帳號.github.io/repo名稱/`。
5. 回到 `index.html` 最上面，把 `canonical` 與 `og:url`、`og:image` 裡的 `YOUR-USERNAME.github.io/YOUR-REPO` 換成這個網址。

更新網站：在 repository 裡點進檔案 → 鉛筆圖示 → 修改 → Commit，約 1 分鐘後生效。

## 2. 如何更換圖片

目前所有圖片都是 `picsum.photos` 的**隨機佔位圖**（不是越南照片），上線前請全部換掉。

1. 在 repository 新增資料夾 `assets`，把你的照片上傳進去（檔名用英文，例如 `hero.jpg`）。
2. 在 `index.html` 搜尋 `REPLACE IMAGE`（Hero、城市卡、關於）或搜尋 `picsum.photos`，把整個網址換成 `assets/hero.jpg` 這種相對路徑。
3. 建議尺寸：Hero／關於約 900×1100；城市卡約 700×940；文章與服務卡約 640×400。照片請先壓縮（每張 300KB 以內），網站才會快。
4. Q 版人物：把圖放成 `assets/jason-chibi.png`，「Jason 實戰筆記」旁的小圓徽章會自動顯示。找不到圖時顯示字母 J。
5. 分享預覽圖：放 `assets/og-cover.jpg`（1200×630）。

## 3. 如何更換官方 LINE、Telegram、IG、TikTok 連結

- **官方 LINE**：在 `index.html` 用「搜尋並取代全部」把 `https://lin.ee/NltI8Vl` 換成新連結；同時改 `script.js` 最上面的 `LINE_URL`。
- **Telegram / Instagram / TikTok**：同樣在 `index.html` 搜尋 `t.me/jason_at_vietnam`、`instagram.com/jason.at.vietnam`、`tiktok.com/@jason.at.vietnam` 取代（頂部社群列、頁尾與最上方的 SEO 資料各有一處）。

## 4. 如何修改中英文文案

- **中文**：直接改 `index.html` 裡的文字（每段文字都有一個 `data-i18n="..."` 標記，請保留標記，只改中間文字）。
- **英文**：在 `script.js` 的 `T.en` 裡找到同名的 key，改右邊的英文。
- **新增一段會切換語言的文字**：HTML 裡寫 `<p data-i18n="my_key">中文</p>`，再到 `T.en` 加上 `my_key: 'English'`。
- **新增文章卡／服務卡**：複製 HTML 裡整個 `<article>…</article>`，改圖片與文字；若要有英文，記得換成新的 key 並補到 `T.en`。
- 日期「2026/XX/XX」請在發布真實內容時改成真實日期。

## 5. 為什麼不能把密碼與客資處理放在 GitHub Pages 前端

GitHub Pages 的所有檔案都是**公開**的，任何人按「檢視原始碼」就能讀到 HTML 與 JavaScript 的每一行。因此：

- 寫在前端的密碼、API Key、Google Apps Script 網址，等於公開給全世界。「輸入密碼才顯示後台」只是視覺上的門，不是鎖。
- 客戶資料如果由前端直接讀寫，任何人都能複製同樣的請求去讀取、竄改或灌爆你的資料。
- 因此這個版本**沒有後台、沒有密碼、不收集資料**，所有詢問都導向官方 LINE。需求整理工具只在使用者自己的瀏覽器裡產生文字，不上傳。

**⚠️ 舊版網站的善後（很重要）**：舊版把後台密碼與 Apps Script 網址放在公開 repo 裡，請：
1. 到 Google Apps Script →「管理部署作業」→ 封存／停用舊的部署，並把 Google Sheet 設為不公開。
2. 如果舊密碼在其他地方也用過，請立即更換。
3. 舊 repo 的歷史紀錄仍看得到舊檔案；要徹底清除，請刪除舊 repo 或改為 Private。

## 6. 未來若要真實表單、後台、CRM 與 PWA

請使用具備**登入驗證與資料權限控制**的後端，例如 **Supabase**（Postgres + Auth + Row Level Security）或其他同等級服務：

- 表單資料寫入資料庫，用「列級權限」確保訪客只能新增、不能讀取別人的資料。
- 後台放在需要登入的獨立頁面，用 Supabase Auth（Email 登入或 Magic Link），而不是前端密碼。
- 公開 anon key 可以放前端，但**必須搭配 RLS 規則**；service key 絕對不能放前端。
- CRM、通知（例如新需求推播到 Telegram／LINE）可用 Supabase Edge Functions 處理。
- PWA：加上 `manifest.json` 與 service worker 即可讓網站像 App 一樣安裝，建議等後端穩定後再做。

在那之前，用官方 LINE 接單是最安全、也最省事的做法。
