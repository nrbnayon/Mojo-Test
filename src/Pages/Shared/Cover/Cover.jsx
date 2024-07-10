import PropTypes from "prop-types";
import { Parallax } from "react-parallax";

const Cover = ({ img, title, desc }) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={img}
      bgImageAlt={title}
      strength={200}
    >
      <div className="relative w-full h-[250px] md:h-[600px] overflow-hidden rounded-lg shadow-lg">
        <div className="absolute w-[90%] md:w-[75%] md:h-1/2 my-6 md:my-auto rounded-2xl mx-auto bg-[#15151599] inset-0 flex flex-col justify-center items-center p-6 text-center text-white font-cinzel">
          <h3 className="text-3xl md:text-5xl font-bold">{title}</h3>
          <p className="mt-2 md:w-2/3 text-xl md:text-2xl font-semibold mx-auto">
            {desc}
          </p>
        </div>
      </div>
    </Parallax>
  );
};

Cover.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default Cover;
