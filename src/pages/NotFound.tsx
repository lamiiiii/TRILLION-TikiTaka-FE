// import {Link} from 'react-router-dom';

import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col text-center gap-1">
        <p className="text-4xl font-bold">404 - Page Not Found</p>
        <p className="mt-4">존재하지 않는 페이지입니다</p>
        <Link to="/" className="mt-4 text-title-bold text-gray-2 underline hover:text-main">
          TIKITAKA
        </Link>
      </div>
    </div>
  );
}
