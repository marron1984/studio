import { applicants } from "@/lib/mock-data";
import { UserPlus, FileUser, Calendar, CheckCircle2, XCircle, Clock, Search } from "lucide-react";

export default function RecruitmentPage() {
  const statusOrder = ["書類選考", "面接予定", "面接済", "内定", "不採用"];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">採用管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            応募者の管理・選考プロセス
          </p>
        </div>
        <button className="px-4 py-2.5 bg-navy-950 text-white rounded-lg text-sm font-medium hover:bg-navy-900 transition-colors">
          応募者を登録
        </button>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {statusOrder.map((status) => {
          const count = applicants.filter((a) => a.status === status).length;
          return (
            <div
              key={status}
              className="bg-white rounded-xl border border-gray-200 p-4 text-center"
            >
              <p className="text-2xl font-bold text-navy-900">{count}</p>
              <p className="text-xs text-gray-500 mt-1">{status}</p>
            </div>
          );
        })}
      </div>

      {/* Applicant cards */}
      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <FileUser className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {applicant.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span>希望職種: {applicant.position}</span>
                    <span>配属希望: {applicant.storeName}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      応募日: {applicant.appliedAt}
                    </span>
                    <span>経路: {applicant.source}</span>
                  </div>
                </div>
              </div>

              <StatusBadge status={applicant.status} />
            </div>

            {applicant.note && (
              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">{applicant.note}</p>
              </div>
            )}

            <div className="mt-4 flex gap-2 justify-end">
              <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                履歴書を表示
              </button>
              <button className="px-3 py-1.5 text-xs bg-navy-950 text-white rounded-lg hover:bg-navy-900 transition-colors">
                ステータスを更新
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    書類選考: "bg-gray-100 text-gray-700",
    面接予定: "bg-blue-100 text-blue-700",
    面接済: "bg-purple-100 text-purple-700",
    内定: "bg-green-100 text-green-700",
    不採用: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}
