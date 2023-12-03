import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AddBanner = () => {
    const axiosSecure = useAxiosSecure();

    const handleAddBanner = (e) => {
        e.preventDefault();

        // get data from user input
        const form = e.target;
        const name = form.name.value;
        const title = form.title.value;
        const image = form.image.value;
        const description = form.description.value;
        const couponCodeName = form.couponCodeName.value;
        const couponRate = form.couponRate.value;

        const newBanner = {
            name, title, image, description, couponCodeName, couponRate, isActive: false
        }
        // console.log(newBanner);

        const toastId = toast.loading('Adding a new Banner...');

        // send New Banner data to server
        axiosSecure.post('/addBanner', newBanner)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('New Banner Added Successful', { id: toastId });
                    form.reset();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <Helmet>
                <title>Add Banner | Admin Dashboard</title>
            </Helmet>
            <div>
                <div className='py-4 lg:py-10 w-full'>
                    <div className="bg-white px-4 lg:px-20 py-4 lg:py-6 m-4 lg:mx-28  shadow-2xl rounded-xl">
                        <SectionTitle heading="Add Banner" subheading="Banner for Home Page"></SectionTitle>
                        <form onSubmit={handleAddBanner}>

                            {/* form Name &  Banner Title row */}
                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control md:w-full">
                                    <label className="label">
                                        <span className="text-lg font-medium ">Banner Name</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="text" name="name" required placeholder="Banner Name" className="w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900" />
                                    </label>
                                </div>
                            </div>
                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control md:w-full">
                                    <label className="label">
                                        <span className="text-lg font-medium">Banner Title</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="text" name="title" required placeholder="Banner Title" className="w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900" />
                                    </label>
                                </div>
                            </div>

                            {/* form coupon code name &  coupon rate  row */}
                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="text-lg font-medium ">Coupon Code</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="text" name="couponCodeName" required placeholder="Coupon Code Name" className="w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900" />
                                    </label>
                                </div>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="text-lg font-medium">Coupon Rate</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="text" name="couponRate" required placeholder="Coupon Rate" className="w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900" />
                                    </label>
                                </div>
                            </div>

                            {/* form banner image*/}
                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control md:w-full">
                                    <label className="label">
                                        <span className="text-lg font-medium">Banner Image</span>
                                    </label>
                                    <label className="rounded">
                                        <input type="url" name="image" placeholder=" Banner Image URL" required className="w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900" />
                                    </label>
                                </div>
                            </div>

                            {/* form Short description row */}
                            <div className="md:flex gap-4 mb-8">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="text-lg font-medium">Banner Description</span>
                                    </label>
                                    <label className="rounded">
                                        <textarea type="text" name="description" placeholder="Banner Description" required className='w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-[#00d260] bg-base-200 text-gray-900' />
                                    </label>
                                </div>
                            </div>

                            <input type="submit" value="Add Banner" className="btn-block btn bg-[#e00000] text-xl font-medium text-white py-3 rounded-lg hover:bg-[#ff9416] hover:shadow-lg mb-2" style={{ textTransform: "none" }} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBanner;