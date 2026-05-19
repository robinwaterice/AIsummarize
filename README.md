# AI 會議紀錄生成與翻譯工具

一個專業、極簡且美觀的 AI 會議記錄生成與翻譯工具，支援將會議逐字稿快速整理成結構化會議紀錄，並自動翻譯為專業英文版本。

## 🌟 核心功能

- **會議主題與時間自動擷取**：從對話內容中自動判斷並擷取會議主題與時間。
- **與會人員整理**：精準列出參與會議的所有人員。
- **會議重點總結**：精簡條列 3 至 5 個會議核心關鍵重點。
- **待辦事項 (Action Items)**：明確列出後續待辦任務與對應負責人。
- **專業英文翻譯**：一鍵生成對照的專業英文版會議紀錄。
- **現代化介面**：基於 React、TailwindCSS 與 Lucide Icons 設計的高質感響應式 UI。

## 🛠️ 開發與運行

本專案採用 React + Vite 作為前端，並結合 Express 作為後端伺服器 (BFF)，透過 `@google/genai` 串接最新版 Gemini API。

### 系統需求
- [Node.js](https://nodejs.org/) (建議版本 v18+)

### 1. 安裝依賴套件
```bash
npm install
```

### 2. 設定環境變數
將專案根目錄下的 `.env` 檔案打開，並填入您的 Gemini API Key：
```env
GEMINI_API_KEY="您的_GEMINI_API_KEY"
```
> 💡 您可以在 [Google AI Studio](https://aistudio.google.com/) 免費申請 API 金鑰。

### 3. 啟動開發伺服器
```bash
npm run dev
```
啟動後，請在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 即可開始使用！

### 4. 專案打包與生產環境運行
若要進行生產環境部署，可以執行：
```bash
# 編譯打包前端與後端
npm run build

# 啟動生產伺服器
npm run start
```
