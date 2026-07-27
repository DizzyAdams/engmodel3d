import "./globals.css";

export const metadata = {
  title: "Model3DEng | AI 3D engineering for commercial pilots",
  description: "AI-assisted 3D engineering platform for parametric design, validation, export readiness, and pilot-friendly delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
