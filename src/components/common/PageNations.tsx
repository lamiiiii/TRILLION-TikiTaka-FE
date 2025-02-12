interface PagenationProps {
  currentPage: number;
  totalPages: number | undefined;
  onPageChange: (page: number) => void;
}

export default function PageNations({currentPage, totalPages, onPageChange}: PagenationProps) {
  const pagesPerGroup = 10; // 한 그룹 당 10개 페이지
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup); // 현재 페이지 그룹
  const startPage = currentGroup * pagesPerGroup + 1; // 현재 그룹의 시작 페이지
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages ?? 0); // 현재 그룹의 끝 페이지

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* ◀ 왼쪽 화살표 (이전 페이지로 이동) */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // 1페이지에서는 비활성화
        className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
      >
        <img src="/icons/ic-arrow-left.svg" alt="왼쪽 화살표" />
      </button>

      {/* 페이지 번호 목록 */}
      {totalPages &&
        [...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-[6px] rounded-lg hover:bg-gray-100 ${
                currentPage === pageNumber ? 'bg-white border border-gray-200' : ''
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

      {/* ▶ 오른쪽 화살표 (다음 페이지로 이동) */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // 마지막 페이지에서는 비활성화
        className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100"
      >
        <img src="/icons/ic-arrow-right.svg" alt="오른쪽 화살표" />
      </button>
    </div>
  );
}
