import styled from "styled-components";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCards,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../assets/Ruleta/ruleta1.jpeg";
import img2 from "../../assets/Ruleta/ruleta2.png";
import img3 from "../../assets/Ruleta/ruleta3.png";
import img4 from "../../assets/Ruleta/ruleta4.png";
import img5 from "../../assets/Ruleta/ruleta5.png";
import img6 from "../../assets/Ruleta/ruleta6.png";
import "swiper/css/effect-cards";
import Arrow from "../../assets/arrow.png";

export function Carrusel() {
  return (
    <Container>
      <Swiper
        // install Swiper modules
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectCards,
          Autoplay,
        ]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        effect={"cards"}
      >
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} alt="" />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
}
const Container = styled.div`
  width: 25vw;
  height: 70vh;

  @media (max-width: 70em) {
    height: 60vh;
    padding: 15px 0;
  }

  @media (max-width: 64em) {
    height: 50vh;
    width: 30vw;
  }

  @media (max-width: 48em) {
    height: 35vh;
    width: 40vw;
  }

  @media (max-width: 30em) {
    height: 45vh;
    width: 60vw;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      display: block;
      height: 100%;
      object-fit: contain;
    }
  }

  .swiper-button-next {
    color: ${({ theme }) => theme.text};
    right: 0;
    width: 4rem;
    top: 60%;
    //background-image: url(${Arrow});
    background-position: center;
    background-size: cover;
    //&:after {
    //display: none;
    //}
    @media (max-width: 64em) {
      width: 3rem;
    }
    @media (max-width: 30em) {
      width: 2rem;
    }
  }

  .swiper-button-prev {
    color: ${({ theme }) => theme.text};
    right: 0;
    width: 4rem;
    top: 60%;
    //background-image: url(${Arrow});
    background-position: center;
    background-size: cover;
    //transform: rotate(180deg);
    //display: none;

    @media (max-width: 64em) {
      width: 3rem;
    }
    @media (max-width: 30em) {
      width: 2rem;
    }
  }
`;
