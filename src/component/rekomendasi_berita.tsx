import { useState, useMemo } from "react";
import { BsDot } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { formatLatinDate } from "../utils/latinDate";
import { Link } from "react-router-dom";
import { slugifyTitle } from "../utils/slugTitle";

export default function RekomendasiBerita({
  news,
  isLoading
}: {
  news: CNNProps[] | null | undefined;
  isLoading:boolean
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleNews = news?.slice(startIndex, endIndex);
  const totalPages = Math.ceil((news?.length || 0) / itemsPerPage);

  // Create array of all pages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const leftItem = pages.slice(0, 3);
  const rightPage = useMemo(() => {
    return pages.slice(Math.max(pages.length - 3, 0));
  }, [pages]);
  const leftPage = useMemo(() => {
    if (currentPage === 1) {
      return leftItem;
    }

    if (currentPage >= rightPage[0] || currentPage === rightPage[0] - 1) {
      return [
        rightPage[0] - 3,
        rightPage[1] - 3,
        rightPage[2] - 3,
      ];
    }

    const getCurrentLeftPage = () => {
      if (currentPage === 1) return leftItem;
      return [currentPage - 1, currentPage, currentPage + 1];
    };

    const tempLeftPage = getCurrentLeftPage();
    
    if (tempLeftPage.indexOf(currentPage) === 1) {
      return [currentPage - 1, currentPage, currentPage + 1];
    }

    if (tempLeftPage.indexOf(currentPage) === 2) {
      return [currentPage - 2, currentPage - 1, currentPage];
    }

    return [currentPage, currentPage + 1, currentPage + 2];
  }, [currentPage, rightPage, leftItem]);

  const isVisibleEllipsis = useMemo(() => {
    return leftPage[1] + 2 === rightPage[0] ? false : true;
  }, [leftPage, rightPage]);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEllipsis = () => {
    setCurrentPage(leftPage[2] + 1);
  };

  const handleLeftEllipsis = () => {
    setCurrentPage(leftPage[0] - 1);
  };

  return (
    <div className="w-full p-4 mt-32">
      <div
        className={"py-4 text-black relative flex justify-between items-center"}
      >
        <h2 className="px-4 border-l-button-primary border-l-4 text-2xl font-bold">
          Rekomendasi Untuk Anda
        </h2>
        <div className="relative">
          <label htmlFor="input-search relative">
            <FaMagnifyingGlass className="absolute right-[23px] top-[23px]" />
            <input
              id="input-search"
              className="w-[344px] h-[62px] py-4 px-2 border border-gray-300 rounded-2xl"
              placeholder="Cari Disini..."
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-y-10 gap-x-[23px] justify-between mt-8">
        {isLoading&&[1,2,3,4].map((i)=><div key={'skeleton-loading-search-'+i} className="w-[276px] h-[358px] rounded-md flex gap-3 flex-col">
            <div className="w-full h-[154px] bg-Gray3 animate-pulse"/>
            <div className="flex flex-col gap-2">
                <div className="w-full h-3 rounded-full bg-Gray3 animate-pulse"/>
                <div className="w-full h-3 rounded-full bg-Gray3 animate-pulse"/>
                <div className="w-full h-3 rounded-full bg-Gray3 animate-pulse"/>
                <div className="flex">
                    <div className="w-1/2 h-3 rounded-full bg-gradient-to-bl animate-pulse"/>
                    <div className="w-1/2 h-3 rounded-full bg-gradient-to-bl animate-pulse"/>
                </div>
            </div>
        </div>)}
        {visibleNews?.map((news) => (
          <div
            key={news.description}
            className="w-[276px] h-[358px] rounded-md flex gap-3 flex-col"
          >
            <img
            loading='lazy'
              src={news.thumbnail}
              alt={"card-content-" + news.thumbnail}
              className="rounded-xl"
              onError={(e)=>{
                    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://res.cloudinary.com/duyurqj38/image/upload/v1753720099/visuals-JpTY4gUviJM-unsplash_gtlbvd.jpg";
              }}
            />
            <Link to={`/beranda/nasional/${slugifyTitle(news.title)}`} className="text-ellipsis line-clamp-3 h-[78px] text-Gray1 text-[18px] font-semibold leading-[26px] hover:underline">
              {news.title}
            </Link>
            <div className="flex flex-row-reverse justify-end gap-2">
              <p className="text-secondary">{formatLatinDate(news.pubDate)}</p>
              <BsDot className="text-secondary self-center" />
              <p className="text-button-primary">Nasional</p>
            </div>
          </div>
        ))}
      </div>

      {/* pagination section */}
      <div className="flex items-center justify-between w-full px-4 py-3 mt-[95px]">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, news?.length || 0)} of{" "}
          {news?.length || 0} results
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-gray-600 hover:text-black disabled:opacity-50 cursor-pointer"
          >
            ← Previous
          </button>
          {/* Left ellipsis */}
          {!isVisibleEllipsis && totalPages > 7 && (
            <button 
              onClick={handleLeftEllipsis}
              className="px-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ...
            </button>
          )}
          {/* Left pages */}
          {leftPage.map((page) => (
            <button
              key={`left-${page}`}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-full text-sm ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          {/* Right ellipsis */}
          {isVisibleEllipsis && totalPages > 7 && (
            <button 
              onClick={handleEllipsis}
              className="px-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ...
            </button>
          )}
          {/* Right pages */}
          {totalPages > 3 && rightPage.map((page) => (
            <button
              key={`right-${page}`}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-full text-sm ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-gray-600 hover:text-black disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}