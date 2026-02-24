"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demo authentication
    if (email && password) {
      document.cookie = "shozui-auth=authenticated; path=/; max-age=86400";
      document.cookie = `shozui-user=${encodeURIComponent(email)}; path=/; max-age=86400`;
      router.push("/dashboard");
    } else {
      setError("メールアドレスとパスワードを入力してください。");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-950 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-black" />
        <div className="relative z-10 text-center px-12">
          <div className="mb-8">
            <h1 className="text-6xl font-light text-white tracking-[0.3em] mb-2">
              祥瑞
            </h1>
            <div className="w-16 h-px bg-gold-500 mx-auto my-6" />
            <p className="text-gold-500 text-sm tracking-[0.2em] font-light">
              SHOZUI MANAGEMENT OS
            </p>
          </div>
          <p className="text-navy-400 text-sm leading-relaxed max-w-sm mx-auto">
            株式会社祥瑞の社内マネジメントプラットフォーム。
            <br />
            店舗運営から経営管理まで、すべてをひとつに。
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 border border-navy-800 rounded-full -translate-y-1/3 translate-x-1/3 opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 border border-navy-800 rounded-full translate-y-1/2 -translate-x-1/4 opacity-20" />
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-4xl font-light text-navy-950 tracking-[0.2em]">
              祥瑞
            </h1>
            <div className="w-12 h-px bg-gold-500 mx-auto my-4" />
            <p className="text-gray-400 text-xs tracking-[0.15em]">
              MANAGEMENT OS
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              ログイン
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              アカウント情報を入力してください
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent transition-all"
                placeholder="name@shozui.co.jp"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent transition-all"
                placeholder="パスワードを入力"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-navy-950 text-white rounded-lg text-sm font-medium hover:bg-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              &copy; 2026 株式会社祥瑞 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
