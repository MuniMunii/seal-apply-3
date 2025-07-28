import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../hook/useHook";
import { IoHomeOutline } from "react-icons/io5";
import NewsTerbaru from "../component/berita_populer";
import { formatLatinDate } from "../utils/latinDate";
import { BsDot } from "react-icons/bs";
import KomentarSection from "../component/komentar";
import RelatedNews from "../component/berita_terkait";
import { slugifyTitle } from "../utils/slugTitle";
export default function DetailBerita() {
  const [news, setNews] = useState<CNNProps>();
  const { title } = useParams();
  const titleBreakdown = decodeURIComponent(title?.split("-").join(" ") || "");
  const { value: newsData, isLoading: isNewsLoading } = useFetch(
    `/cnn/terbaru`,
    (data) => ({
      news: data.data.posts as CNNProps[],
    }),
    "GET"
  );

  useEffect(() => {
    if (!newsData?.news || !title) return;
    window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
    const found = newsData.news.find((n) => slugifyTitle(n.title) === title);
    setNews(found);
  }, [newsData, title, titleBreakdown]);
  return (
    <div className="w-full text-black max-w-[1210px] mx-auto h-full min-h-screen pt-[170px]">
      <div className="flex gap-1 items-center">
        <IoHomeOutline /> <Link to={"/"}>Beranda</Link>/
        <Link to="#">Nasional</Link>/ Detail
      </div>
      <div className="w-full h-full mt-16 flex">
        <div className="w-[800px]">
          <h1 className="text-4xl text-Gray1">{news?.title}</h1>
          <div className="flex flex-row-reverse justify-end my-6 gap-2">
            <p className="text-secondary">{formatLatinDate(news?.pubDate)}</p>
            <BsDot className="text-secondary self-center" />
            <p className="text-button-primary">National</p>
          </div>
          <img
            src={news?.thumbnail}
            alt="Thumbnail-detail"
            className="w-full h-[535px] rounded-2xl object-[100%_100%]"
          />
          <p className="text-[#959EA9] mt-2 mb-18">{news?.description}</p>
          <div className="flex flex-col gap-6 leading-6 text-[#526071]">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
              aliquam atque sed iste illo ab perferendis? Animi, ea vero
              sapiente enim perspiciatis quam error voluptatum sint ab cum
              veniam, aspernatur ipsum dolor itaque. Iure voluptatem similique,
              provident ut soluta dicta inventore aliquam cum quis repellendus
              eligendi iusto ea porro aut nesciunt facilis architecto quia
              mollitia dolor repellat velit distinctio. Quae itaque cumque sit
              assumenda quasi tempore sed quisquam magni iure. Nobis eveniet ex
              deserunt sunt explicabo ipsam aliquid omnis laboriosam veniam
              dolore. Consequatur assumenda laborum aliquam voluptas autem
              architecto voluptatem odit. Dolore veritatis fuga mollitia, qui
              atque quibusdam rerum aut!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              impedit repellat perspiciatis consequatur ullam sunt, animi nulla,
              officiis alias magni cumque blanditiis a accusantium id, ex dolor
              unde minima libero mollitia corporis earum? Facilis quod quibusdam
              non optio aliquam cumque ipsam laborum! Sapiente illum eum
              accusantium, ea voluptates odit optio cum praesentium error sed!
              Numquam, harum alias enim placeat est fuga? Possimus, iusto minus
              sunt eius magnam, nihil esse quam cumque sit expedita consequuntur
              aspernatur facere a unde! Ad suscipit quam nobis ullam,
              dignissimos vero sapiente possimus commodi impedit sint, tenetur
              reiciendis eligendi sed nesciunt mollitia omnis? Sit enim
              temporibus perspiciatis, fugit, quia laborum possimus, nobis
              placeat suscipit quam aliquam adipisci neque? Repudiandae, libero
              explicabo? Laudantium id nemo eum cumque possimus eligendi
              laboriosam laborum earum ex veniam numquam reprehenderit iure
              porro in itaque, delectus consequatur, minus sunt repudiandae nam
              adipisci ipsum sapiente. Ducimus tempora perspiciatis esse ea
              asperiores ipsam dignissimos!
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel,
              consequatur. Error modi iure ut, veniam dignissimos aperiam
              ratione voluptas aliquam iste nemo sunt tempora maiores eveniet at
              aut dolorum alias eum. Aspernatur nobis natus eos placeat,
              voluptates totam nihil, architecto, dolore magni recusandae
              dolores incidunt! Aut sed iure voluptatibus alias enim mollitia
              delectus eum quae, facere officiis fugit non, nulla harum numquam
              id earum ducimus itaque dignissimos voluptate assumenda. Iure
              illum libero reprehenderit magni at, aut sed nostrum vero hic.
            </p>
          </div>
          <KomentarSection />
          <RelatedNews news={newsData?.news.slice(0, 3)} />
        </div>
        <NewsTerbaru
          news={newsData?.news.slice(0, 3)}
          goVertical={true}
          isLoading={isNewsLoading}
        />
      </div>
    </div>
  );
}
