import { Link } from "react-router-dom";
import { formatLatinDate } from "../utils/latinDate";
import { BsDot } from "react-icons/bs";
import { slugifyTitle } from "../utils/slugTitle";
export default function NewsTerbaru({
  news,
  isLoading,
  goVertical,
}: {
  news: CNNProps[] | null | undefined;
  isLoading: boolean;
  goVertical?: boolean;
}) {
  return (
    <div className={`${goVertical ? "w-fit h-fit" : "w-full mt-32"} p-4 `}>
      <div className={"py-4 text-black relative size-fit"}>
        <h2 className="px-4 border-l-button-primary border-l-4 text-2xl font-bold">
          Berita Terpopuler
        </h2>
      </div>
      <div className={`flex ${goVertical ? "flex-col" : "flex-row"}`}>
        {/* skeleton loading */}
        {isLoading
          ? [1, 2, 3].map((i) => (
              <div
                key={"skeleton-populer" + i}
                className="border-r border-r-card-default last:border-r-0 flex items-center p-4 gap-4"
              >
                <div className="bg-gray-400 animate-pulsew-40 h-32 rounded-2xl" />
                <div className="flex flex-col h-[115px] max-w-[205px] self-start items-start">
                  <div className="bg-gray-400 h-5 w-full rounded-full" />
                  <div className="bg-gray-400 h-5 w-full rounded-full" />
                  <div className="bg-gray-400 h-5 w-full rounded-full" />
                  <div className="mt-auto w-full">
                    <div className="bg-gray-400 h-5 w-1/2 rounded-full" />
                    <div className="bg-gray-400 h-5 w-1/2 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          : // Main content
            news?.map((news, index) => (
              <div
                key={news.description}
                className={`${
                  goVertical
                    ? "border-b border-b-card-default last:border-b-0"
                    : "border-r border-r-card-default last:border-r-0"
                } flex items-center p-4 gap-4`}
              >
                <div
                  className="relative before:absolute before:size-8 before:bg-dark700 before:-top-2 before:-left-2 before:rounded-full before:flex before:items-center before:justify-center before:text-white before:content-[attr(data-index)]"
                  data-index={index + 1}
                >
                  <img
                    loading="lazy"
                    src={news.thumbnail}
                    alt="card-terbaru"
                    className="object-cover w-40 h-32 rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://res.cloudinary.com/duyurqj38/image/upload/v1753720099/visuals-JpTY4gUviJM-unsplash_gtlbvd.jpg";
                    }}
                  />
                </div>{" "}
                <div className="flex flex-col h-[115px] max-w-[205px] self-start items-start">
                  <Link to={`/beranda/nasional/${slugifyTitle(news.title)}`} className="text-Gray1 hover:underline">{news.title}</Link>
                  <div className="flex flex-row-reverse justify-self-end mt-auto gap-2">
                    <p className="text-secondary">
                      {formatLatinDate(news.pubDate)}
                    </p>
                    <BsDot className="text-secondary self-center" />
                    <p className="text-button-primary">Nasional</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
