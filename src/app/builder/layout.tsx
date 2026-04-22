export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="h-dvh overflow-hidden bg-[#0A0A0A]">{children}</main>;
}
