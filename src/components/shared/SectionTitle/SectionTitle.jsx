import PropTypes from 'prop-types';

const SectionTitle = ({ heading, subheading }) => {
    return (
        <div className='mx-auto sm:w-4/6 md:w-3/4 lg:w-10/12 text-center px-6 lg:px-0 pt-4'>
            <h3 className='text-3xl lg:text-4xl font-bold border-b-2 lg:border-b-2 text-[#e00000ab] border-[#00d260] py-2 font-kanit'>{heading}</h3>
            <h4 className="text-[#f97316] py-1 font-normal lg:font-medium">----- {subheading} -----</h4>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string.isRequired,
    subheading: PropTypes.string.isRequired
}

export default SectionTitle;