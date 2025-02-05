import {useEffect, useRef} from 'react';
import TopBar from './components/common/TopBar';
import SideBar from './components/common/SideBar';
import {Outlet, useLocation} from 'react-router-dom';

export default function Layout() {
  //브라우저 스크롤 상단 고정 처리
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // RAF(requestAnimationFrame)를 사용한 최적화
    requestAnimationFrame(() => {
      containerRef.current?.scrollTo({top: 0, behavior: 'auto'});
    });
  }, [location.pathname]);

  return (
    <div className="flex h-screen">
      <TopBar />
      <SideBar />
      <div ref={containerRef} className="flex-1 overflow-auto ml-52 mt-14" id="scroll-container">
        <Outlet />
      </div>
    </div>
  );
}
