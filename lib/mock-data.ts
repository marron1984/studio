// 株式会社祥瑞 マネジメントプラットフォーム - モックデータ

export type Role = "ceo" | "director" | "store_manager" | "staff" | "accounting";

export interface User {
  id: string;
  name: string;
  role: Role;
  storeId?: string;
  position: string;
  email: string;
  avatar?: string;
}

export interface Store {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  managerId: string;
  status: "営業中" | "準備中" | "休業";
}

export interface DailyReport {
  id: string;
  storeId: string;
  storeName: string;
  date: string;
  hallReport: string;
  kitchenReport: string;
  photos: string[];
  submittedBy: string;
  submittedAt: string;
}

export interface MonthlyReport {
  id: string;
  storeId: string;
  storeName: string;
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  customers: number;
  highlights: string;
  snsFollowers: number;
  snsEngagement: number;
}

export interface Approval {
  id: string;
  title: string;
  category: string;
  amount?: number;
  submittedBy: string;
  submittedAt: string;
  status: "審査中" | "承認済" | "差戻し";
  description: string;
  approvedBy?: string;
}

export interface CashFlowEntry {
  id: string;
  date: string;
  category: string;
  storeName: string;
  income: number;
  expense: number;
  balance: number;
  note: string;
}

export interface Employee {
  id: string;
  name: string;
  nameKana: string;
  storeId: string;
  storeName: string;
  position: string;
  department: "ホール" | "キッチン" | "管理";
  joinDate: string;
  status: "在籍" | "休職" | "退職";
  phone: string;
  email: string;
}

export interface Applicant {
  id: string;
  name: string;
  position: string;
  storeName: string;
  appliedAt: string;
  status: "書類選考" | "面接予定" | "面接済" | "内定" | "不採用";
  source: string;
  note: string;
}

export interface Reservation {
  id: string;
  storeName: string;
  date: string;
  time: string;
  guestName: string;
  partySize: number;
  course?: string;
  status: "確定" | "仮予約" | "キャンセル";
  phone: string;
  note: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  channel: string;
}

// --- 店舗データ ---
export const stores: Store[] = [
  {
    id: "zen-en-nishi",
    name: "禅園 西梅田店",
    type: "日本料理",
    address: "大阪市北区梅田3-1-1",
    phone: "06-1234-5678",
    managerId: "mgr-tanaka",
    status: "営業中",
  },
  {
    id: "zen-en-shinsaibashi",
    name: "禅園 心斎橋店",
    type: "日本料理",
    address: "大阪市中央区心斎橋筋1-5-1",
    phone: "06-2345-6789",
    managerId: "mgr-suzuki",
    status: "営業中",
  },
  {
    id: "oden-stand",
    name: "おでん×スタンド",
    type: "おでん・立ち飲み",
    address: "大阪市北区曾根崎2-3-1",
    phone: "06-3456-7890",
    managerId: "mgr-yamada",
    status: "営業中",
  },
  {
    id: "yakiniku-arata",
    name: "やきにく新 ARATA",
    type: "焼肉",
    address: "大阪市中央区東心斎橋1-8-1",
    phone: "06-4567-8901",
    managerId: "mgr-sato",
    status: "営業中",
  },
];

// --- ユーザーデータ ---
export const users: User[] = [
  { id: "ceo-enomoto", name: "榎本", role: "ceo", position: "代表取締役", email: "enomoto@shozui.co.jp" },
  { id: "acc-kimura", name: "木村", role: "accounting", position: "経理", email: "kimura@shozui.co.jp" },
  { id: "mgr-tanaka", name: "田中", role: "store_manager", storeId: "zen-en-nishi", position: "店長", email: "tanaka@shozui.co.jp" },
  { id: "mgr-suzuki", name: "鈴木", role: "store_manager", storeId: "zen-en-shinsaibashi", position: "店長", email: "suzuki@shozui.co.jp" },
  { id: "mgr-yamada", name: "山田", role: "store_manager", storeId: "oden-stand", position: "店長", email: "yamada@shozui.co.jp" },
  { id: "mgr-sato", name: "佐藤", role: "store_manager", storeId: "yakiniku-arata", position: "店長", email: "sato@shozui.co.jp" },
];

// --- 日報データ ---
export const dailyReports: DailyReport[] = [
  {
    id: "dr-001",
    storeId: "zen-en-nishi",
    storeName: "禅園 西梅田店",
    date: "2026-02-23",
    hallReport: "ランチ42名、ディナー28名。常連の山本様がご来店。新人の研修順調。",
    kitchenReport: "花緑青コース12件提供。仕入れ：鯛、和牛A5（松阪）。在庫良好。",
    photos: [],
    submittedBy: "田中",
    submittedAt: "2026-02-23 22:30",
  },
  {
    id: "dr-002",
    storeId: "zen-en-shinsaibashi",
    storeName: "禅園 心斎橋店",
    date: "2026-02-23",
    hallReport: "ランチ38名、ディナー35名。団体予約1件（8名）。接客クレームなし。",
    kitchenReport: "宗伝唐茶コース8件提供。新メニュー試作完了。",
    photos: [],
    submittedBy: "鈴木",
    submittedAt: "2026-02-23 23:00",
  },
  {
    id: "dr-003",
    storeId: "oden-stand",
    storeName: "おでん×スタンド",
    date: "2026-02-23",
    hallReport: "来客数65名。金曜のため混雑、ピーク時20分待ち。",
    kitchenReport: "おでん出汁追加仕込み。大根・卵が人気。日本酒の在庫補充必要。",
    photos: [],
    submittedBy: "山田",
    submittedAt: "2026-02-23 23:15",
  },
  {
    id: "dr-004",
    storeId: "yakiniku-arata",
    storeName: "やきにく新 ARATA",
    date: "2026-02-23",
    hallReport: "ランチ25名、ディナー32名。週末予約好調。",
    kitchenReport: "黒毛和牛の仕入れ完了。新しいタレのレシピ完成。",
    photos: [],
    submittedBy: "佐藤",
    submittedAt: "2026-02-23 22:45",
  },
];

// --- 月次報告データ ---
export const monthlyReports: MonthlyReport[] = [
  { id: "mr-001", storeId: "zen-en-nishi", storeName: "禅園 西梅田店", month: "2026-01", revenue: 8500000, expenses: 5200000, profit: 3300000, customers: 1850, highlights: "年始特別コースが好調。客単価12,000円達成。", snsFollowers: 4200, snsEngagement: 320 },
  { id: "mr-002", storeId: "zen-en-shinsaibashi", storeName: "禅園 心斎橋店", month: "2026-01", revenue: 7800000, expenses: 4800000, profit: 3000000, customers: 1720, highlights: "新年会需要で団体増加。ランチの売上が前月比120%。", snsFollowers: 3800, snsEngagement: 280 },
  { id: "mr-003", storeId: "oden-stand", storeName: "おでん×スタンド", month: "2026-01", revenue: 3200000, expenses: 1800000, profit: 1400000, customers: 3100, highlights: "冬季のため来客数増加。新メニューの牛すじが好評。", snsFollowers: 2100, snsEngagement: 450 },
  { id: "mr-004", storeId: "yakiniku-arata", storeName: "やきにく新 ARATA", month: "2026-01", revenue: 5600000, expenses: 3400000, profit: 2200000, customers: 1400, highlights: "新年会コースが好調。客単価8,500円。", snsFollowers: 2800, snsEngagement: 380 },
];

// --- 稟議書データ ---
export const approvals: Approval[] = [
  { id: "ap-001", title: "禅園 西梅田店 内装改修工事", category: "設備投資", amount: 3500000, submittedBy: "田中", submittedAt: "2026-02-20", status: "審査中", description: "カウンター席の改修及び照明のLED化。工期は3月中旬〜4月上旬を予定。" },
  { id: "ap-002", title: "春の販促キャンペーン費用", category: "広告宣伝", amount: 800000, submittedBy: "鈴木", submittedAt: "2026-02-18", status: "承認済", description: "SNS広告・チラシ制作・DM発送。4月の桜シーズンに向けた集客施策。", approvedBy: "榎本" },
  { id: "ap-003", title: "キッチン機器更新（おでん×スタンド）", category: "設備投資", amount: 1200000, submittedBy: "山田", submittedAt: "2026-02-15", status: "承認済", description: "業務用IHヒーター2台及びおでん鍋の交換。", approvedBy: "榎本" },
  { id: "ap-004", title: "新メニュー開発費", category: "開発費", amount: 450000, submittedBy: "佐藤", submittedAt: "2026-02-22", status: "審査中", description: "やきにく新の春限定コース開発に伴う食材テスト費用。" },
];

// --- 資金繰りデータ ---
export const cashFlowEntries: CashFlowEntry[] = [
  { id: "cf-001", date: "2026-02-23", category: "売上", storeName: "禅園 西梅田店", income: 420000, expense: 0, balance: 45200000, note: "通常営業" },
  { id: "cf-002", date: "2026-02-23", category: "売上", storeName: "禅園 心斎橋店", income: 385000, expense: 0, balance: 45585000, note: "通常営業" },
  { id: "cf-003", date: "2026-02-23", category: "売上", storeName: "おでん×スタンド", income: 180000, expense: 0, balance: 45765000, note: "通常営業" },
  { id: "cf-004", date: "2026-02-23", category: "売上", storeName: "やきにく新 ARATA", income: 290000, expense: 0, balance: 46055000, note: "通常営業" },
  { id: "cf-005", date: "2026-02-22", category: "仕入れ", storeName: "禅園 西梅田店", income: 0, expense: 280000, balance: 44780000, note: "鮮魚・肉類仕入れ" },
  { id: "cf-006", date: "2026-02-22", category: "仕入れ", storeName: "やきにく新 ARATA", income: 0, expense: 350000, balance: 45060000, note: "黒毛和牛仕入れ" },
  { id: "cf-007", date: "2026-02-21", category: "人件費", storeName: "全店", income: 0, expense: 2800000, balance: 45410000, note: "2月分給与支払（パート）" },
  { id: "cf-008", date: "2026-02-20", category: "設備", storeName: "おでん×スタンド", income: 0, expense: 1200000, balance: 48210000, note: "キッチン機器更新" },
];

// --- 社員データ ---
export const employees: Employee[] = [
  { id: "emp-001", name: "田中 健一", nameKana: "タナカ ケンイチ", storeId: "zen-en-nishi", storeName: "禅園 西梅田店", position: "店長", department: "ホール", joinDate: "2018-04-01", status: "在籍", phone: "090-1111-2222", email: "tanaka@shozui.co.jp" },
  { id: "emp-002", name: "鈴木 美咲", nameKana: "スズキ ミサキ", storeId: "zen-en-shinsaibashi", storeName: "禅園 心斎橋店", position: "店長", department: "ホール", joinDate: "2019-07-01", status: "在籍", phone: "090-2222-3333", email: "suzuki@shozui.co.jp" },
  { id: "emp-003", name: "山田 太郎", nameKana: "ヤマダ タロウ", storeId: "oden-stand", storeName: "おでん×スタンド", position: "店長", department: "ホール", joinDate: "2020-03-01", status: "在籍", phone: "090-3333-4444", email: "yamada@shozui.co.jp" },
  { id: "emp-004", name: "佐藤 翔太", nameKana: "サトウ ショウタ", storeId: "yakiniku-arata", storeName: "やきにく新 ARATA", position: "店長", department: "キッチン", joinDate: "2020-10-01", status: "在籍", phone: "090-4444-5555", email: "sato@shozui.co.jp" },
  { id: "emp-005", name: "木村 香", nameKana: "キムラ カオリ", storeId: "zen-en-nishi", storeName: "本社", position: "経理", department: "管理", joinDate: "2017-04-01", status: "在籍", phone: "090-5555-6666", email: "kimura@shozui.co.jp" },
  { id: "emp-006", name: "高橋 直人", nameKana: "タカハシ ナオト", storeId: "zen-en-nishi", storeName: "禅園 西梅田店", position: "副店長", department: "ホール", joinDate: "2021-04-01", status: "在籍", phone: "090-6666-7777", email: "takahashi@shozui.co.jp" },
  { id: "emp-007", name: "渡辺 裕子", nameKana: "ワタナベ ユウコ", storeId: "zen-en-shinsaibashi", storeName: "禅園 心斎橋店", position: "料理長", department: "キッチン", joinDate: "2019-04-01", status: "在籍", phone: "090-7777-8888", email: "watanabe@shozui.co.jp" },
  { id: "emp-008", name: "伊藤 大輝", nameKana: "イトウ ダイキ", storeId: "yakiniku-arata", storeName: "やきにく新 ARATA", position: "ホールスタッフ", department: "ホール", joinDate: "2023-06-01", status: "在籍", phone: "090-8888-9999", email: "ito@shozui.co.jp" },
  { id: "emp-009", name: "中村 さくら", nameKana: "ナカムラ サクラ", storeId: "oden-stand", storeName: "おでん×スタンド", position: "スタッフ", department: "ホール", joinDate: "2024-01-15", status: "在籍", phone: "090-9999-0000", email: "nakamura@shozui.co.jp" },
  { id: "emp-010", name: "小林 誠", nameKana: "コバヤシ マコト", storeId: "zen-en-nishi", storeName: "禅園 西梅田店", position: "料理長", department: "キッチン", joinDate: "2018-04-01", status: "在籍", phone: "090-0000-1111", email: "kobayashi@shozui.co.jp" },
];

// --- 採用データ ---
export const applicants: Applicant[] = [
  { id: "app-001", name: "松本 亮", position: "ホールスタッフ", storeName: "禅園 西梅田店", appliedAt: "2026-02-20", status: "面接予定", source: "Indeed", note: "接客経験5年。3/1面接予定。" },
  { id: "app-002", name: "井上 麻衣", position: "キッチンスタッフ", storeName: "禅園 心斎橋店", appliedAt: "2026-02-18", status: "面接済", source: "タウンワーク", note: "調理師免許あり。即戦力として期待。" },
  { id: "app-003", name: "加藤 翼", position: "ホールスタッフ", storeName: "おでん×スタンド", appliedAt: "2026-02-22", status: "書類選考", source: "紹介", note: "山田店長の知人からの紹介。" },
  { id: "app-004", name: "吉田 恵", position: "ホールスタッフ", storeName: "やきにく新 ARATA", appliedAt: "2026-02-15", status: "内定", source: "マイナビバイト", note: "3月入社予定。大学生。" },
];

// --- 予約データ ---
export const reservations: Reservation[] = [
  { id: "res-001", storeName: "禅園 西梅田店", date: "2026-02-24", time: "12:00", guestName: "山本 様", partySize: 4, course: "花緑青コース", status: "確定", phone: "090-1234-5678", note: "個室希望" },
  { id: "res-002", storeName: "禅園 西梅田店", date: "2026-02-24", time: "18:30", guestName: "田村 様", partySize: 8, course: "宗伝唐茶コース", status: "確定", phone: "090-2345-6789", note: "接待利用。アレルギー確認済。" },
  { id: "res-003", storeName: "禅園 心斎橋店", date: "2026-02-24", time: "12:00", guestName: "佐々木 様", partySize: 2, status: "確定", phone: "090-3456-7890", note: "" },
  { id: "res-004", storeName: "禅園 心斎橋店", date: "2026-02-24", time: "19:00", guestName: "森 様", partySize: 6, course: "花緑青コース", status: "仮予約", phone: "090-4567-8901", note: "人数変更の可能性あり" },
  { id: "res-005", storeName: "やきにく新 ARATA", date: "2026-02-24", time: "18:00", guestName: "岡田 様", partySize: 4, course: "特選コース", status: "確定", phone: "090-5678-9012", note: "" },
  { id: "res-006", storeName: "やきにく新 ARATA", date: "2026-02-24", time: "19:30", guestName: "中島 様", partySize: 2, status: "確定", phone: "090-6789-0123", note: "誕生日ケーキ持ち込み" },
  { id: "res-007", storeName: "禅園 西梅田店", date: "2026-02-25", time: "12:00", guestName: "河野 様", partySize: 3, status: "確定", phone: "090-7890-1234", note: "" },
  { id: "res-008", storeName: "禅園 西梅田店", date: "2026-02-25", time: "18:00", guestName: "石井 様", partySize: 10, course: "宗伝唐茶コース", status: "確定", phone: "090-8901-2345", note: "還暦祝い。花束手配済。" },
];

// --- メッセージデータ ---
export const messages: Message[] = [
  { id: "msg-001", senderId: "ceo-enomoto", senderName: "榎本", content: "今月の売上数字、各店長確認お願いします。", timestamp: "2026-02-24 09:00", channel: "全体" },
  { id: "msg-002", senderId: "mgr-tanaka", senderName: "田中", content: "西梅田店、今月目標達成見込みです。", timestamp: "2026-02-24 09:15", channel: "全体" },
  { id: "msg-003", senderId: "mgr-suzuki", senderName: "鈴木", content: "心斎橋店も順調です。来月のメニュー会議の日程調整をお願いします。", timestamp: "2026-02-24 09:20", channel: "全体" },
  { id: "msg-004", senderId: "mgr-yamada", senderName: "山田", content: "おでん×スタンドは仕入れコストが少し上がっています。仕入先の見直しを検討中です。", timestamp: "2026-02-24 09:30", channel: "全体" },
  { id: "msg-005", senderId: "mgr-sato", senderName: "佐藤", content: "新ARAIの春限定コース、試食会を3月初旬に予定しています。", timestamp: "2026-02-24 09:45", channel: "全体" },
  { id: "msg-006", senderId: "ceo-enomoto", senderName: "榎本", content: "了解。各店とも順調で安心しました。メニュー会議は3月5日でどうでしょうか。", timestamp: "2026-02-24 10:00", channel: "全体" },
];

// --- ヘルパー関数 ---
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ja-JP").format(num);
}
