import { employees, stores } from "@/lib/mock-data";
import { Users, Search, Building2, UserCircle } from "lucide-react";

export default function EmployeesPage() {
  const activeEmployees = employees.filter((e) => e.status === "在籍");
  const byStore = stores.map((store) => ({
    store,
    employees: employees.filter(
      (e) => e.storeId === store.id && e.status === "在籍"
    ),
  }));

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">社員管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            社員票・配属情報の管理
          </p>
        </div>
        <button className="px-4 py-2.5 bg-navy-950 text-white rounded-lg text-sm font-medium hover:bg-navy-900 transition-colors">
          社員票を追加
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">在籍社員数</p>
          <p className="text-2xl font-bold text-navy-900 mt-1">
            {activeEmployees.length}名
          </p>
        </div>
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <p className="text-xs text-gray-500">{store.name}</p>
            <p className="text-2xl font-bold text-navy-900 mt-1">
              {
                employees.filter(
                  (e) => e.storeId === store.id && e.status === "在籍"
                ).length
              }
              名
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="社員名、カナ、店舗名で検索..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
          />
        </div>
      </div>

      {/* Employee list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  社員名
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  フリガナ
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  配属店舗
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  役職
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  部門
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  入社日
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                  状態
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-navy-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {emp.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-500">{emp.nameKana}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-700">{emp.storeName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-700">{emp.position}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        emp.department === "ホール"
                          ? "bg-blue-100 text-blue-700"
                          : emp.department === "キッチン"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">{emp.joinDate}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        emp.status === "在籍"
                          ? "bg-green-100 text-green-700"
                          : emp.status === "休職"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
