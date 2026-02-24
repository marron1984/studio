import { Image, FolderOpen, Calendar, Upload } from "lucide-react";

const menuMeetings = [
  {
    id: "mm-001",
    month: "2026年2月",
    date: "2026-02-05",
    title: "2月度メニュー会議",
    items: ["花緑青コース 春改訂", "おでん新メニュー3品", "焼肉春限定コース案"],
    photoCount: 24,
  },
  {
    id: "mm-002",
    month: "2026年1月",
    date: "2026-01-08",
    title: "1月度メニュー会議",
    items: ["新年特別コース", "冬季限定おでん", "バレンタインメニュー"],
    photoCount: 18,
  },
];

const seasonalPhotos = [
  { id: "sp-001", name: "花緑青コース 2月", category: "コース料理", count: 12, date: "2026-02-10" },
  { id: "sp-002", name: "宗伝唐茶コース", category: "コース料理", count: 8, date: "2026-01-25" },
  { id: "sp-003", name: "おでん×スタンド 冬メニュー", category: "一品料理", count: 15, date: "2026-01-15" },
  { id: "sp-004", name: "やきにく新 特選コース", category: "コース料理", count: 10, date: "2026-01-20" },
  { id: "sp-005", name: "禅園 店内写真", category: "店舗", count: 20, date: "2026-02-01" },
];

const dmMaterials = [
  { id: "dm-001", name: "2026年2月 バレンタインDM", status: "配信済", date: "2026-02-10", format: "A4チラシ" },
  { id: "dm-002", name: "2026年1月 新年ご挨拶", status: "配信済", date: "2026-01-05", format: "ハガキ" },
  { id: "dm-003", name: "2026年3月 春のコースご案内", status: "制作中", date: "2026-03-01", format: "A4チラシ" },
  { id: "dm-004", name: "Instagram リール素材（2月）", status: "配信済", date: "2026-02-15", format: "動画" },
];

export default function PromotionsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">プロモーション</h1>
        <p className="text-sm text-gray-500 mt-1">
          メニュー会議・季節写真・DM資料の管理
        </p>
      </div>

      {/* Menu meetings */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold-500" />
            メニュー会議
          </h2>
          <button className="px-3 py-1.5 text-sm bg-navy-950 text-white rounded-lg hover:bg-navy-900 transition-colors">
            会議を追加
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {menuMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                <span className="text-xs text-gray-500">{meeting.date}</span>
              </div>
              <ul className="space-y-1.5 mb-4">
                {meeting.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Image className="w-3.5 h-3.5" />
                写真 {meeting.photoCount}枚
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal photos */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Image className="w-5 h-5 text-gold-500" />
            季節料理写真・素材
          </h2>
          <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            アップロード
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seasonalPhotos.map((album) => (
            <div
              key={album.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="aspect-video bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                <FolderOpen className="w-10 h-10 text-navy-400" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-sm">
                  {album.name}
                </h3>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>{album.category}</span>
                  <span>{album.count}枚</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DM materials */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-gold-500" />
            DM資料
          </h2>
          <button className="px-3 py-1.5 text-sm bg-navy-950 text-white rounded-lg hover:bg-navy-900 transition-colors">
            新規DM作成
          </button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  タイトル
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  形式
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  配信日
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  状態
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dmMaterials.map((dm) => (
                <tr key={dm.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {dm.name}
                  </td>
                  <td className="px-6 py-3 text-gray-500">{dm.format}</td>
                  <td className="px-6 py-3 text-gray-500">{dm.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        dm.status === "配信済"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {dm.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
