import { reservations } from "@/lib/mock-data";
import { CalendarDays, Users, Clock, MapPin } from "lucide-react";

export default function ReservationsPage() {
  const today = "2026-02-24";
  const todayReservations = reservations.filter((r) => r.date === today);
  const tomorrowReservations = reservations.filter(
    (r) => r.date === "2026-02-25"
  );
  const totalGuests = todayReservations.reduce(
    (sum, r) => sum + r.partySize,
    0
  );
  const confirmedCount = todayReservations.filter(
    (r) => r.status === "確定"
  ).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">予約管理</h1>
        <p className="text-sm text-gray-500 mt-1">
          TableCheck連携・本日の予約状況
        </p>
      </div>

      {/* Date selector & summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <label className="text-xs text-gray-500 block mb-2">表示日</label>
          <input
            type="date"
            defaultValue={today}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-900"
          />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">本日の予約件数</p>
          <p className="text-2xl font-bold text-navy-900 mt-1">
            {todayReservations.length}件
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">本日のゲスト数</p>
          <p className="text-2xl font-bold text-navy-900 mt-1">
            {totalGuests}名
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">確定予約</p>
          <p className="text-2xl font-bold text-green-700 mt-1">
            {confirmedCount}/{todayReservations.length}
          </p>
        </div>
      </div>

      {/* Today's reservations */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-gold-500" />
          本日の予約 — {today}
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    時間
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    店舗
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    ゲスト名
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    人数
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    コース
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    状態
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                    備考
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {todayReservations
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((res) => (
                    <tr key={res.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {res.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-700">{res.storeName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {res.guestName}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span>{res.partySize}名</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-gray-700">
                        {res.course || "—"}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            res.status === "確定"
                              ? "bg-green-100 text-green-700"
                              : res.status === "仮予約"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {res.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-500 text-xs max-w-48 truncate">
                        {res.note || "—"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tomorrow's reservations */}
      {tomorrowReservations.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-gray-400" />
            明日の予約 — 2026-02-25
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      時間
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      店舗
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      ゲスト名
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      人数
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      コース
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      状態
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      備考
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tomorrowReservations
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((res) => (
                      <tr key={res.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {res.time}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-gray-700">
                          {res.storeName}
                        </td>
                        <td className="px-6 py-3 font-medium text-gray-900">
                          {res.guestName}
                        </td>
                        <td className="px-6 py-3">{res.partySize}名</td>
                        <td className="px-6 py-3 text-gray-700">
                          {res.course || "—"}
                        </td>
                        <td className="px-6 py-3">
                          <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                            {res.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-500 text-xs max-w-48 truncate">
                          {res.note || "—"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
