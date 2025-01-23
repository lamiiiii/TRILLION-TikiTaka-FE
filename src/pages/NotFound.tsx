// import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">존재하지 않는 페이지입니다</p>
        {/* <Link to="/" className="mt-4 text-blue-500">
        </Link> */}
      </div>
    </div>
  );
}
