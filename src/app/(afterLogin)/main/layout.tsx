import Category from "./_components/Category";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Category />
      {children}
    </>
  );
}
