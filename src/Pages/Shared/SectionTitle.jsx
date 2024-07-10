import PropTypes from "prop-types";

const SectionTitle = ({ header }) => {
  const { title, desc } = header;
  return (
    <div>
      <div className="text-center my-4 bg-slate-100 p-5 rounded-lg shadow-md font-cinzel">
        <p className="text-lg text-[#D99904] font-semibold italic">{title}</p>
        <h3 className="text-3xl mt-3 text-[#151515] font-bold">{desc}</h3>
      </div>
    </div>
  );
};

SectionTitle.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default SectionTitle;
