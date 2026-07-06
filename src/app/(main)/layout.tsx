import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col text-slate-50">
      <Header />
      <main
        id="main-content"
        className="flex-1 pb-24 md:pb-0 supports-[env(safe-area-inset-bottom)]:pb-[calc(6rem+env(safe-area-inset-bottom))] md:supports-[env(safe-area-inset-bottom)]:pb-0"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
