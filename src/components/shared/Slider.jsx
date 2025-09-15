import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Slider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const totalSlides = extendedSlides.length;

  const goToSlide = useCallback((idx, isTransitionOn = true) => {
    setIsTransitioning(isTransitionOn);
    setCurrentSlide(idx);
  }, []);

  const prevSlide = () => goToSlide(currentSlide - 1);

  const nextSlide = () => goToSlide(currentSlide + 1);

  useEffect(() => {
    if (currentSlide === 0) {
      setTimeout(() => {
        goToSlide(slides.length, false);
      }, 300);
    } else if (currentSlide === totalSlides - 1) {
      setTimeout(() => {
        goToSlide(1, false);
      }, 300);
    }
  }, [currentSlide, totalSlides, slides.length]);

  // useEffect for auto sliding
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative mx-auto aspect-[82/29] group/slider">
      <div className="w-full overflow-hidden">
        {/* slider container */}
        <div
          className={`flex transform-cpu ${
            isTransitioning ? "duration-300 ease-linear" : ""
          }`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {extendedSlides.map((slide, idx) => (
            <Link to={slide.url} title={slide.label} className="min-h-full min-w-full" key={idx}>
              <img
                width={300}
                height={300}
                src={slide.image}
                className="size-full"
                alt={slide.label}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* navigation buttons */}
      <>
        {/* arrow left */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-0 bg-black/50 lg:bg-black/35 lg:hover:bg-black/50 p-1 md:p-1.5 lg:p-2 rounded-r-full shadow cursor-pointer lg:invisible group-hover/slider:visible"
          aria-label="Previous Slide"
        >
          <ChevronLeftIcon className="size-3 md:size-4 lg:size-5 text-white" />
        </button>

        {/* arrow right */}
        <button
          onClick={nextSlide}
          className="absolute z-50 top-1/2 -translate-y-1/2 right-0 bg-black/50 lg:bg-black/35 lg:hover:bg-black/50 p-1 md:p-1.5 lg:p-2 rounded-l-full shadow cursor-pointer lg:invisible group-hover/slider:visible"
          aria-label="Next Slide"
        >
          <ChevronRightIcon className="size-3 md:size-4 lg:size-5 text-white" />
        </button>
      </>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 z-50 flex w-full items-center justify-center gap-1 rounded-full">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx + 1)}
            className={`rounded-full bg-white duration-500 cursor-pointer ${
              currentSlide === idx + 1 ? "w-8" : "w-2"
            } h-2`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
