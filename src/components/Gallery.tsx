import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import "../App.css";

interface ThumbProps {
  selected: boolean;
  onClick: () => void;
  imgSrc: string;
}

const Thumb = ({ selected, onClick, imgSrc }: ThumbProps) => (
  <div className={`embla__slide--thumb ${selected ? "is-selected" : ""}`}>
    <button
      onClick={onClick}
      className="embla__slide__inner--thumb"
      type="button"
    >
      <img className="embla__slide__thumbnail" src={imgSrc} alt="A cool cat." />
    </button>
  </div>
);

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel(
    {
      skipSnaps: false,
    },
    [ClassNames({ draggable: "is-draggable", dragging: "is-dragging" })]
  );
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    axis: "y",
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  const [slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    setSlides([
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Y_BlxI7DWGfuXuLakHUPuQHaI4%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tshirtloot.com%2Fwp-content%2Fuploads%2F2016%2F02%2F2-b.png&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.missguided.com%2Fi%2Fmissguided%2FTW627404_04%3Ffmt%3Djpeg%26fmt.jpeg.interlaced%3Dtrue%26%24product-page__main--2x%24&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdna.lystit.com%2Fphotos%2F2013%2F09%2F09%2Fmen-grey-denim-slimfit-grey-denim-shirt-product-2-13340520-971707607.jpeg&f=1&nofb=1",
      "https://cdn11.bigcommerce.com/s-405b0/images/stencil/590x590/products/71/18017/gildan-5000-tee-t-shirt.ca-antique-jade-dome__19096.1637746764.jpg?c=2",
      "https://marks.scene7.com/is/image/marksp/315059_2CEAWRFA20-400_PROD_1_BURPLD?bgColor=0,0,0,0&op_sharpen=1&resMode=sharp2&fmt=jpg&qlt=85,0&wid=460&hei=528",
    ]);
  }, []);

  return (
    <>
      <div className="embla--thumb">
        <div className="vertical__viewport" ref={thumbViewportRef}>
          <div className="embla__container--thumb">
            {Array.from(Array(6).keys()).map((index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={slides[index]}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="embla">
        <div className="embla__viewport" ref={mainViewportRef}>
          <div className="embla__container">
            {Array.from(Array(6).keys()).map((index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <img
                    className="embla__slide__img"
                    src={slides[index]}
                    alt="A cool cat."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
