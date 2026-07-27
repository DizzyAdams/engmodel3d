import "./globals.css";

export const metadata = {
  title: "Model3DEng",
  description: "AI-assisted engineering platform for parametric design, validation, and export readiness.",
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
