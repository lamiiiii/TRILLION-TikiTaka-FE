import {useState} from 'react';

export default function Pagenation() {
  const [currentPage, setCurrentPage] = useState(5);
  const totalPages = 20;
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        type="button"
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
      >
        <img src="/icons/ic-arrow-left.svg" alt="왼쪽 화살표" />
      </button>

      {[...Array(Math.min(10, totalPages))].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-3 py-[6px] rounded-lg hover:bg-gray-100 ${currentPage === index + 1 && 'bg-white-1 boder border-gray-200'}`}
        >
          {index + 1}
        </button>
      ))}

      {totalPages > 10 && (
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
        >
          <img src="/icons/ic-arrow-right.svg" alt="오른쪽 화살표" />
        </button>
      )}
    </div>
  );
}
