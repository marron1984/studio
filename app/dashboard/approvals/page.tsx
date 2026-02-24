import { approvals, formatCurrency } from "@/lib/mock-data";
import { FileCheck, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function ApprovalsPage() {
  const pending = approvals.filter((a) => a.status === "審査中");
  const approved = approvals.filter((a) => a.status === "承認済");
  const rejected = approvals.filter((a) => a.status === "差戻し");

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">稟議書</h1>
          <p className="text-sm text-gray-500 mt-1">
            承認申請の管理・承認処理
          </p>
        </div>
        <button className="px-4 py-2.5 bg-navy-950 text-white rounded-lg text-sm font-medium hover:bg-navy-900 transition-colors">
          新規稟議書作成
        </button>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <Clock className="w-8 h-8 text-amber-600" />
          <div>
            <p className="text-2xl font-bold text-amber-700">{pending.length}</p>
            <p className="text-xs text-amber-600">審査中</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-2xl font-bold text-green-700">{approved.length}</p>
            <p className="text-xs text-green-600">承認済</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <XCircle className="w-8 h-8 text-red-600" />
          <div>
            <p className="text-2xl font-bold text-red-700">{rejected.length}</p>
            <p className="text-xs text-red-600">差戻し</p>
          </div>
        </div>
      </div>

      {/* Approval list */}
      <div className="space-y-4">
        {approvals.map((approval) => (
          <div
            key={approval.id}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <StatusIcon status={approval.status} />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {approval.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>申請者: {approval.submittedBy}</span>
                    <span>申請日: {approval.submittedAt}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                      {approval.category}
                    </span>
                  </div>
                </div>
              </div>
              {approval.amount && (
                <p className="text-lg font-bold text-gray-900">
                  {formatCurrency(approval.amount)}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-4">
              {approval.description}
            </p>

            {approval.status === "審査中" && (
              <div className="flex gap-3 justify-end">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                  差戻し
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                  承認する
                </button>
              </div>
            )}

            {approval.status === "承認済" && approval.approvedBy && (
              <p className="text-xs text-green-600 text-right">
                承認者: {approval.approvedBy}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "審査中":
      return <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />;
    case "承認済":
      return <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />;
    case "差戻し":
      return <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />;
    default:
      return <FileCheck className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />;
  }
}
