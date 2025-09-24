import BottomNavigation from "./_components/bottomNavigation";
import Header from "./_components/header";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <BottomNavigation /> {/* 모바일에만 존재 */}
    </>
  );
}
