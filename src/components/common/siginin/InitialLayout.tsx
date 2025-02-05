import InitialTopBar from './InitialTopBar';

interface InitialLayoutProps {
  children: React.ReactNode;
}

export default function InitialLayout({children}: InitialLayoutProps) {
  return (
    <div className="relative flex w-full min-h-screen">
      <InitialTopBar />
      {/* 우측 */}
      {children}
    </div>
  );
}
