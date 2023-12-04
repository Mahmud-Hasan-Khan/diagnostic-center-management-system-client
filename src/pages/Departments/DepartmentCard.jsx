import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import PropTypes from 'prop-types';

const DepartmentCard = ({ department }) => {
    return (
        <div>
            <p className="flex items-center border-b-[1px] w-fit hover:bg-[#e2faf2] hover:text-lg hover:cursor-pointer  "><span><MdKeyboardDoubleArrowRight /></span> {department?.name} </p>
        </div>
    );
};

DepartmentCard.propTypes = {
    department: PropTypes.object.isRequired
}
export default DepartmentCard;