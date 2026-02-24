import { dailyReports, stores } from "@/lib/mock-data";
import { FileText, Clock, ChefHat, ConciergeBell } from "lucide-react";

export default function DailyReportsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">日報管理</h1>
        <p className="text-sm text-gray-500 mt-1">
          各店舗のホール・キッチン日報を確認
        </p>
      </div>

      {/* Date filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex items-center gap-4 flex-wrap">
        <label className="text-sm font-medium text-gray-700">日付：</label>
        <input
          type="date"
          defaultValue="2026-02-23"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
        />
        <div className="flex gap-2 ml-auto">
          {stores.map((store) => (
            <button
              key={store.id}
              className="px-3 py-1.5 text-xs border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            >
              {store.name.split(" ")[0] === "禅園"
                ? store.name
                : store.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dailyReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Report header */}
            <div className="bg-navy-950 text-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gold-500" />
                  <h3 className="font-semibold">{report.storeName}</h3>
                </div>
                <div className="flex items-center gap-2 text-navy-300 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {report.submittedAt}
                </div>
              </div>
              <p className="text-xs text-navy-400 mt-1">
                提出者: {report.submittedBy}
              </p>
            </div>

            {/* Report content */}
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ConciergeBell className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-semibold text-gray-900">
                    ホール報告
                  </h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed bg-blue-50 rounded-lg p-3">
                  {report.hallReport}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ChefHat className="w-4 h-4 text-orange-600" />
                  <h4 className="text-sm font-semibold text-gray-900">
                    キッチン報告
                  </h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed bg-orange-50 rounded-lg p-3">
                  {report.kitchenReport}
                </p>
              </div>

              {report.photos.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    写真
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {report.photos.map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gray-100 rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
