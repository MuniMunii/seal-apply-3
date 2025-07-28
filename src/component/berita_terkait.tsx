import { BsDot } from "react-icons/bs"
import { formatLatinDate } from "../utils/latinDate";

export default function RelatedNews({ news }:{news:CNNProps[]|null|undefined}) {
  return (
    <div className="w-full max-w-6xl h-fit mx-auto px-4 mt-[140px] mb-[101px]">
      <div
        className={"py-4 text-black relative flex justify-between items-center"}
      >
        <h2 className="px-4 border-l-button-primary border-l-4 text-2xl font-bold">
          Berita Terkait
        </h2>
        <button className="border border-button-primary text-button-primary bg-[#B9DDFF] px-5 py-[14px] rounded-[8px] cursor-pointer">Lihat Semua</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {news?.map((item, index) => (
          <div key={index} className="rounded-md overflow-hidden transition-shadow ">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-[187px] object-cover rounded-[8px]"
            />
            <div className="flex flex-col mt-2">
              <p className="text-sm font-medium leading-snug line-clamp-3 text-ellipsis h-[71px] text-Gray1">
                {item.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <p className="text-blue-600 font-medium">Nasional</p>
                <BsDot/>
                <p>{formatLatinDate(item.pubDate)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}