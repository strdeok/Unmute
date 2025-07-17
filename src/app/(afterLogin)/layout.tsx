import BottomNavigation from "./_components/bottomNavigation";
import MobileFooter from "./_components/footer";
import Header from "./_components/header";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header/>
      <main className="p-4">{children}</main>
      <MobileFooter />
      <BottomNavigation /> {/* 모바일에만 존재 */}
    </>
  );
}
