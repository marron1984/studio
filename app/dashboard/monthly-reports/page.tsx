import { monthlyReports, formatCurrency, formatNumber } from "@/lib/mock-data";
import { BarChart3, TrendingUp, Users, Globe } from "lucide-react";

export default function MonthlyReportsPage() {
  const totalRevenue = monthlyReports.reduce((s, r) => s + r.revenue, 0);
  const totalExpenses = monthlyReports.reduce((s, r) => s + r.expenses, 0);
  const totalProfit = monthlyReports.reduce((s, r) => s + r.profit, 0);
  const totalCustomers = monthlyReports.reduce((s, r) => s + r.customers, 0);
  const totalFollowers = monthlyReports.reduce(
    (s, r) => s + r.snsFollowers,
    0
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">月次報告書</h1>
        <p className="text-sm text-gray-500 mt-1">
          各店舗の月次業績・SNS実績
        </p>
      </div>

      {/* Month selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">対象月：</label>
        <select
          defaultValue="2026-01"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
        >
          <option value="2026-02">2026年2月</option>
          <option value="2026-01">2026年1月</option>
          <option value="2025-12">2025年12月</option>
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <SummaryCard
          label="合計売上"
          value={formatCurrency(totalRevenue)}
          icon={<BarChart3 className="w-4 h-4" />}
        />
        <SummaryCard
          label="合計経費"
          value={formatCurrency(totalExpenses)}
          icon={<BarChart3 className="w-4 h-4" />}
        />
        <SummaryCard
          label="合計利益"
          value={formatCurrency(totalProfit)}
          icon={<TrendingUp className="w-4 h-4" />}
          highlight
        />
        <SummaryCard
          label="合計来客数"
          value={`${formatNumber(totalCustomers)}名`}
          icon={<Users className="w-4 h-4" />}
        />
        <SummaryCard
          label="SNSフォロワー"
          value={formatNumber(totalFollowers)}
          icon={<Globe className="w-4 h-4" />}
        />
      </div>

      {/* Store reports */}
      <div className="space-y-6">
        {monthlyReports.map((report) => {
          const profitMargin = ((report.profit / report.revenue) * 100).toFixed(
            1
          );
          return (
            <div
              key={report.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {report.storeName}
                </h3>
                <span className="text-xs text-gray-500">
                  {report.month.replace("-", "年")}月
                </span>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">売上</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(report.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">経費</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(report.expenses)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">利益</p>
                    <p className="text-lg font-bold text-green-700">
                      {formatCurrency(report.profit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">利益率</p>
                    <p className="text-lg font-bold text-navy-900">
                      {profitMargin}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">来客数</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatNumber(report.customers)}名
                    </p>
                  </div>
                </div>

                {/* Revenue bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>売上に対する経費率</span>
                    <span>
                      {((report.expenses / report.revenue) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-navy-700 rounded-full"
                      style={{
                        width: `${(report.expenses / report.revenue) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">ハイライト</p>
                    <p className="text-sm text-gray-700">
                      {report.highlights}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">SNS</p>
                    <p className="text-sm text-gray-700">
                      フォロワー{" "}
                      <span className="font-medium">
                        {formatNumber(report.snsFollowers)}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      エンゲージメント {formatNumber(report.snsEngagement)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${highlight ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}
    >
      <div className="flex items-center gap-1.5 text-gray-500 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p
        className={`text-lg font-bold ${highlight ? "text-green-700" : "text-gray-900"}`}
      >
        {value}
      </p>
    </div>
  );
}
