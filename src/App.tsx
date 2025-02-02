import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import ManagerHome from './pages/manager/ManagerHome';
import './global.css'; // Tailwind CSS 적용
import TopBar from './components/common/TopBar';
import SideBar from './components/common/SideBar';
import UserHome from './pages/user/UserHome';
import AdminHome from './pages/admin/AdminHome';
import ManagerTickets from './pages/manager/ManagerTickets';
import ManagerStatistics from './pages/manager/ManagerStatistics';
import NotFound from './pages/NotFound';
import ManagerInquiry from './pages/manager/ManagerInquiry';
import ManagerPwdChange from './pages/manager/ManagerPwdChange';
import UserNewTicket from './pages/user/UserNewTicket';
import ManagerTicketDetail from './pages/manager/ManagerTicketDetail';
import UserInquiry from './pages/user/UserInquiry';
import UserPwdChange from './pages/user/UserPwdChange';

function App() {
  const managerRoutes = [
    {path: '', element: <ManagerHome />},
    {path: 'statistics', element: <ManagerStatistics />},
    {path: 'tickets', element: <ManagerTickets />},
    {path: 'detail', element: <ManagerTicketDetail />},
    {path: 'inquiry', element: <ManagerInquiry />},
    {path: 'pwdChange', element: <ManagerPwdChange />}, //todo 명칭 변경하셔도 됩니다!
  ];

  const userRoutes = [
    {path: '', element: <UserHome />},
    {path: 'newTicket', element: <UserNewTicket />},
    {path: 'inquiry', element: <UserInquiry />},
    {path: 'pwdChange', element: <UserPwdChange />},
  ];

  const adminRoutes = [{path: '', element: <AdminHome />}];

  return (
    <Router>
      <div className="App flex h-screen">
        {/* TopBar 고정 */}
        <TopBar />

        {/* SideBar 고정 */}
        <SideBar />
        {/* 나머지 영역은 콘텐츠 -  탑바, 사이드바 아래 위치*/}
        <div className="flex-1 overflow-auto ml-52 mt-14">
          <Routes>
            {/* 담당자 */}
            <Route path="/manager">
              {managerRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
            {/* 사용자 */}
            <Route path="/user">
              {userRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
            {/* 관리자 */}
            <Route path="/admin">
              {adminRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
            {/* 404 페이지 설정 */}
            <Route path="*" element={<NotFound />} /> {/* 이 부분에서 모든 잘못된 경로를 처리 */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
