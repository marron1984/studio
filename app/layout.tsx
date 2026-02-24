import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "祥瑞 Management OS",
  description: "株式会社祥瑞 社内マネジメントプラットフォーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
