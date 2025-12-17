# 工單系統 開發參考資料

> 基於 OrderManagement-2025 系統的簡化版工單系統開發素材包

---

## 資料夾結構

```
工單系統/
├── README.md                 # 本說明檔
├── docs/
│   └── SYSTEM_ARCHITECTURE.md   # 完整系統架構文件
├── assets/
│   ├── logo/                    # Logo 素材
│   │   ├── suiyao-logo.png
│   │   └── suiyao-logo.jpg
│   ├── colors/                  # 色彩規範
│   │   ├── BRAND_COLORS.md      # 品牌色彩說明文件
│   │   └── color-palette.css    # CSS 變數定義檔
│   └── ui-components/           # UI 組件規範
│       └── UI_COMPONENTS_GUIDE.md  # 組件樣式指南
```

---

## 快速開始

### 1. 建立專案

```bash
# 建立前端專案
npm create vite@latest work-order-frontend -- --template react-ts
cd work-order-frontend
npm install

# 安裝常用套件
npm install react-router-dom axios zustand
npm install antd  # 或其他 UI 框架
```

### 2. 複製色彩設定

將 `assets/colors/color-palette.css` 複製到專案的 `src/styles/` 目錄，並在 `main.tsx` 引入：

```tsx
import './styles/color-palette.css';
```

### 3. 參考架構文件

閱讀 `docs/SYSTEM_ARCHITECTURE.md` 了解：
- 資料模型設計
- API 端點規劃
- 前後端架構

---

## 建議技術棧

| 類別 | 技術 | 說明 |
|------|------|------|
| 前端框架 | React + TypeScript | 組件化開發 |
| 建構工具 | Vite | 快速開發體驗 |
| UI 元件庫 | Ant Design / MUI | 加速 UI 開發 |
| 狀態管理 | Zustand | 輕量簡單 |
| HTTP | Axios | API 呼叫 |
| 後端 | Express + TypeScript | RESTful API |
| 資料庫 | MongoDB + Mongoose | 文件型資料庫 |

---

## 核心功能模組

### 必要功能

- [ ] 使用者認證（登入/登出）
- [ ] 工單 CRUD
- [ ] 客戶管理
- [ ] 狀態追蹤

### 可選功能

- [ ] 工單指派
- [ ] 優先級管理
- [ ] 附件上傳
- [ ] 報表匯出

---

## 聯絡資訊

**公司名稱**：穗鈅科技有限公司
**統一編號**：00091103

---

*建立日期：2025-12-10*
