import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = () => {
  const slides = [
    {
      title: "Manage Your Bills Easily",
      subtitle: "Electricity, Gas, Water, Internet — all in one place!",
      img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Track Payments Instantly",
      subtitle: "Stay on top of your monthly expenses with ease.",
      img: "https://images.unsplash.com/photo-1519873174361-37788c5a73c7?q=80&w=641&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Smart Billing System",
      subtitle: "Simple, fast and secure bill management.",
      img: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div
            className="relative h-[70vh] flex items-center justify-center text-center text-white"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="z-10 max-w-2xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200">{slide.subtitle}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
