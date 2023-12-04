import PropTypes from 'prop-types';

const DoctorCard = ({ doctor }) => {
    return (
        <div>
            <div
                className="card w-96 h-[420px] border-y-2 border-[#05d6f7] shadow-xl"
            >
                <div className='rounded-full w-96 mx-auto'>
                    <figure>
                        <img
                            src={doctor?.image}
                            alt="instructor"
                            className={`rounded-full w-1/4 pt-2`}
                        />
                    </figure>
                </div>
                <div className="lg:pl-5 px-2 py-4 lg:py-2 w-96 my-auto space-y-1">
                    <h2 className="card-title text-[#05d6f7]">{doctor?.name}</h2>
                    <p><span className="font-medium"></span> {doctor?.degree}</p>
                    <div className="bg-base-200 rounded py-1">
                        <p className="text-center">Specialties</p>
                        <div className="grid grid-cols-2 gap-2 place-items-center text-center">
                            {doctor?.specialties.map((list, index) => (
                                <p className="text-sm p-1 border bg-[#05d7f7bc] rounded flex justify-between" key={index}>
                                    {list}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="bg-base-200 rounded py-1">
                        <p className="text-center">Practice Days</p>
                        <div className="grid grid-cols-3 gap-2 place-items-center text-center">
                            {doctor?.practiceDays.map((list, index) => (
                                <p className="text-sm p-1 border bg-lime-200 rounded" key={index}>
                                    {list}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center pt-2">
                        <button className='btn bg-[#e00000] border-red-600 text-white hover:bg-orange-600 '>Get Appointment Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

DoctorCard.propTypes = {
    doctor: PropTypes.object.isRequired
}
export default DoctorCard;