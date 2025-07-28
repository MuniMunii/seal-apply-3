import { useEffect } from "react";
import EmblaCarousel from "../component/carousel/carousel";
import useFetch from "../hook/useHook";
import NewsTerbaru from "../component/berita_populer";
import RekomendasiBerita from "../component/rekomendasi_berita";
import CarouselBottom from "../component/carousel/carouselBottom";
export default function IndexPage(){
  // 
      const { value: newsDataTerbaru, isLoading: isNewsTerbaruLoading } = useFetch(
    `/cnn/terbaru`,
    (data) => ({
      news: data.data.posts as CNNProps[]
    }),"GET"
  );
  useEffect(()=>{console.log(newsDataTerbaru?.news)},[newsDataTerbaru])
    return (<>
    <div className="w-full max-w-[1210px] mx-auto h-full min-h-screen pt-[170px]">
        <EmblaCarousel slides={newsDataTerbaru?.news.slice(0,5)} isLoading={isNewsTerbaruLoading}/>
        <NewsTerbaru news={newsDataTerbaru?.news.slice(0,3)} isLoading={isNewsTerbaruLoading}/>
        <RekomendasiBerita news={newsDataTerbaru?.news} isLoading={isNewsTerbaruLoading}/>
        <CarouselBottom slides={[1,2,3]}/>
    </div>
    </>)
}