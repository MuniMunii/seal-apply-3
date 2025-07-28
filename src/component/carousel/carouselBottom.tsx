import React from 'react'
import type { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselUtils'
import useEmblaCarousel from 'embla-carousel-react'
import './carousel.css'
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const CarouselBottom: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick
//   } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla !my-[147px]">
      <div className="embla__viewport rounded-2xl mx-auto " ref={emblaRef}>
        <div className="embla__container h-[407px] ">
          {slides.map((index) => (
            <div className="embla__slide bg-[#00CAA3] text-white relative" key={index}>
              <div className="px-[92px] py-4 h-full flex justify-between w-full">
                <div className='max-w-[426px]'>
                <p className='text-[46.39px] font-semibold'>Petualangan Edukatif bersama Malang Mbois City Tour!</p>
                <p className='text-[20px]'>Petualangan Edukatif bersama Malang Mbois City Tour!</p>
                </div>
                </div>
                <img src="https://res.cloudinary.com/duyurqj38/image/upload/v1753727039/imasssge_k7itdk.png" alt="background-carousel-bottom" className="w-[583px] h-[378px] absolute right-10 top-10"/>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls text-black mx-auto w-fit">
        <div className="embla__dots gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot bg-Gray1 border border-blue-300'.concat(
                index === selectedIndex ? ' embla__dot--selected !bg-[#136EF0]' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CarouselBottom
