import {Outlet, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
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
import Landing from './pages/common/signin/Landing';
import SignIn from './pages/common/signin/SignIn';
import SignUp from './pages/common/signin/SignUp';
import ResetPwd from './pages/common/signin/ResetPwd';
import ManagerTicketDetail from './pages/manager/ManagerTicketDetail';
import AdminAccounts from './pages/admin/AdminAccounts';
import AdminCategory from './pages/admin/AdminCategory';
import AdminInquiry from './pages/admin/AdminInquiry';
import ManagerHistories from './pages/manager/ManagerHistories';
import ChangePwd from './pages/common/signin/ChangePwd';
import UserInquiry from './pages/user/UserInquiry';
import UserPwdChange from './pages/user/UserPwdChange';
import AdminStatistics from './pages/admin/AdminStatistics';

function Layout() {
  return (
    <div className="flex h-screen">
      <TopBar />
      <SideBar />
      <div className="flex-1 overflow-auto ml-52 mt-14">
        <Outlet />
      </div>
    </div>
  );
}
function App() {
  const managerRoutes = [
    {path: '', element: <ManagerHome />},
    {path: 'statistics', element: <ManagerStatistics />},
    {path: 'tickets', element: <ManagerTickets />},
    {path: 'histories', element: <ManagerHistories />},
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

  const adminRoutes = [{path: '', element: <AdminHome />},
    {path: 'accounts', element: <AdminAccounts />},
    {path: 'categories', element: <AdminCategory />},
    {path: 'statistics', element: <AdminStatistics/>},
    {path: 'inquiries', element: <AdminInquiry />},
  ];

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* 레이아웃 없음 */}
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpwd" element={<ResetPwd />} />
          <Route path="/changepwd" element={<ChangePwd />} />

          <Route path="*" element={<NotFound />} />

          {/* 레이아웃 있음 */}
          <Route element={<Layout />}>
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
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
