import PropTypes from 'prop-types';

const BlogCard = ({ blog }) => {
    return (
        <div className="w-[800px] mx-auto border m-1 rounded-lg">
            <div className="mb-10 rounded overflow-hidden flex flex-col mx-auto">
                <a href="#"
                    className="text-xl sm:text-4xl font-semibold inline-block hover:text-indigo-600 transition duration-500 ease-in-out p-2 mb-2">{blog?.title} </a>

                <div className="relative">
                    <div>
                        <img className='w-full' src={blog?.image} alt="" />
                    </div>

                </div>
                <p className="text-gray-700 py-5 text-base leading-8 p-2">
                    {blog?.description}
                </p>
                <div className="py-5 text-sm font-regular text-gray-900 flex">
                    <span className="mr-3 flex flex-row items-center">
                        <svg className="text-indigo-600" fill="currentColor" height="13px" width="13px" version="1.1" id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <g>
                                    <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
        c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
        c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                                </g>
                            </g>
                        </svg>
                        <span className="ml-1">6 mins ago</span></span>
                    <a href="#" className="flex flex-row items-center hover:text-indigo-600">
                        <svg className="text-indigo-600" fill="currentColor" height="16px" aria-hidden="true" role="img"
                            focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor"
                                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
                            </path>
                            <path d="M0 0h24v24H0z" fill="none"></path>
                        </svg>
                        <span className="ml-1">Mahmud Hasan</span></a>
                </div>
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.object.isRequired
}

export default BlogCard;