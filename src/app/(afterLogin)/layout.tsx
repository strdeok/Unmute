import BottomNavigation from "./_components/bottomNavigation";
import MobileFooter from "./_components/footer";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex flex-row w-full px-4 py-2 items-center justify-between">
        <div>햄버거</div>
        <img src="/logo.png" className="w-32" />
        <div className="size-12 bg-gray-600"></div>
      </header>
      <main className="p-4">{children}</main>
      <BottomNavigation />
      <MobileFooter />
    </>
  );
}
