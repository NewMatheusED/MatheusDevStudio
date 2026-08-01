import "./globals.css";
import { fontVariables } from "@/lib/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
