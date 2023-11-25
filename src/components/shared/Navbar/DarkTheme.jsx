import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const DarkTheme = () => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    const handleChangeTheme = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    useEffect(() => {
        localStorage.setItem("theme", theme)
        const myTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", myTheme);
    }, [theme])

    return (
        <div>
            <div>
                <label className="swap swap-rotate">

                    {/* this checkbox controls the state */}
                    <input type="checkbox" onChange={handleChangeTheme} checked={theme === "light" ? false : true} />

                    {/* sun icon */}
                    <LuSun className="text-4xl swap-on text-yellow-400 fill-yellow-400" />

                    {/* moon icon */}
                    <IoMoonOutline className="text-4xl swap-off"></IoMoonOutline>

                </label>
            </div>
        </div>
    );
};

export default DarkTheme;