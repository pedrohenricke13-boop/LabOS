import "./globals.css";

export const metadata = {
  title: "LabOS",
  description: "Sistema de gestão de laboratório"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}