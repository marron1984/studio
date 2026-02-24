import { cashFlowEntries, formatCurrency } from "@/lib/mock-data";
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

export default function CashFlowPage() {
  const latestBalance = cashFlowEntries[0]?.balance ?? 0;
  const totalIncome = cashFlowEntries.reduce((s, e) => s + e.income, 0);
  const totalExpense = cashFlowEntries.reduce((s, e) => s + e.expense, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">資金繰り表</h1>
        <p className="text-sm text-gray-500 mt-1">
          現金残高・入出金状況の確認
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Wallet className="w-4 h-4" />
            <span className="text-xs">現金残高</span>
          </div>
          <p className="text-2xl font-bold text-navy-900">
            {formatCurrency(latestBalance)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <ArrowUpRight className="w-4 h-4 text-green-600" />
            <span className="text-xs">今週の入金</span>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <ArrowDownRight className="w-4 h-4 text-red-600" />
            <span className="text-xs">今週の出金</span>
          </div>
          <p className="text-2xl font-bold text-red-700">
            {formatCurrency(totalExpense)}
          </p>
        </div>
      </div>

      {/* Cash flow table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gold-500" />
            入出金明細
          </h2>
          <input
            type="month"
            defaultValue="2026-02"
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  日付
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  区分
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  店舗
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">
                  入金
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">
                  出金
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">
                  残高
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  備考
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cashFlowEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-900">{entry.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        entry.income > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {entry.category}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-700">{entry.storeName}</td>
                  <td className="px-6 py-3 text-right text-green-700 font-medium">
                    {entry.income > 0 ? formatCurrency(entry.income) : "—"}
                  </td>
                  <td className="px-6 py-3 text-right text-red-700 font-medium">
                    {entry.expense > 0 ? formatCurrency(entry.expense) : "—"}
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-gray-900">
                    {formatCurrency(entry.balance)}
                  </td>
                  <td className="px-6 py-3 text-gray-500">{entry.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
