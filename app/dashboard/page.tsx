import {
  stores,
  monthlyReports,
  reservations,
  approvals,
  dailyReports,
  employees,
  messages,
  formatCurrency,
} from "@/lib/mock-data";
import {
  Store,
  TrendingUp,
  Users,
  CalendarDays,
  FileCheck,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function DashboardPage() {
  const totalRevenue = monthlyReports.reduce((sum, r) => sum + r.revenue, 0);
  const totalProfit = monthlyReports.reduce((sum, r) => sum + r.profit, 0);
  const totalCustomers = monthlyReports.reduce(
    (sum, r) => sum + r.customers,
    0
  );
  const todayReservations = reservations.filter(
    (r) => r.date === "2026-02-24" && r.status !== "キャンセル"
  );
  const pendingApprovals = approvals.filter((a) => a.status === "審査中");

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-sm text-gray-500 mt-1">
          株式会社祥瑞 経営状況一覧
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="月間売上（1月）"
          value={formatCurrency(totalRevenue)}
          change="+8.2%"
          positive
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          title="月間利益（1月）"
          value={formatCurrency(totalProfit)}
          change="+12.5%"
          positive
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          title="月間来客数（1月）"
          value={`${totalCustomers.toLocaleString()}名`}
          change="+5.3%"
          positive
          icon={<Users className="w-5 h-5" />}
        />
        <KPICard
          title="本日の予約"
          value={`${todayReservations.length}件`}
          subtitle={`${todayReservations.reduce((s, r) => s + r.partySize, 0)}名`}
          icon={<CalendarDays className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store status */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Store className="w-5 h-5 text-gold-500" />
            店舗状況
          </h2>
          <div className="space-y-3">
            {stores.map((store) => {
              const report = monthlyReports.find(
                (r) => r.storeId === store.id
              );
              const storeReservations = todayReservations.filter((r) =>
                r.storeName.includes(store.name.split(" ")[0])
              );
              const todayReport = dailyReports.find(
                (r) => r.storeId === store.id
              );

              return (
                <div
                  key={store.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">{store.name}</p>
                      <p className="text-xs text-gray-500">{store.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">1月売上</p>
                      <p className="font-medium">
                        {report ? formatCurrency(report.revenue) : "—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">本日予約</p>
                      <p className="font-medium">
                        {storeReservations.length}件
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">日報</p>
                      <p className="font-medium">
                        {todayReport ? (
                          <span className="text-green-600">提出済</span>
                        ) : (
                          <span className="text-gray-400">未提出</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Pending approvals */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-gold-500" />
              承認待ち
              {pendingApprovals.length > 0 && (
                <span className="ml-auto bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  {pendingApprovals.length}
                </span>
              )}
            </h2>
            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="p-3 bg-amber-50 border border-amber-200 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {approval.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {approval.submittedBy} ・{" "}
                        {approval.amount
                          ? formatCurrency(approval.amount)
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent messages */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              最新メッセージ
            </h2>
            <div className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center text-xs font-medium text-navy-700 flex-shrink-0">
                    {msg.senderName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">
                      {msg.senderName} ・{" "}
                      {msg.timestamp.split(" ")[1]}
                    </p>
                    <p className="text-sm text-gray-700 truncate">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employee summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              社員概要
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-navy-900">
                  {employees.filter((e) => e.status === "在籍").length}
                </p>
                <p className="text-xs text-gray-500">在籍社員</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-navy-900">
                  {stores.length}
                </p>
                <p className="text-xs text-gray-500">店舗数</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  title,
  value,
  change,
  positive,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  subtitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-gray-400">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="mt-1 flex items-center gap-1">
        {change && (
          <>
            {positive ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 text-red-600" />
            )}
            <span
              className={`text-xs font-medium ${positive ? "text-green-600" : "text-red-600"}`}
            >
              {change}
            </span>
            <span className="text-xs text-gray-400 ml-1">前月比</span>
          </>
        )}
        {subtitle && (
          <span className="text-xs text-gray-500">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
