import { FiMail } from "react-icons/fi";
import { Heading } from "../component";

function NewsLetter() {
  return (
    <section className="py-10 lg:container lg:mx-auto">
      <div className="wrapper  w-[90%] mx-auto rounded-2xl p-10 bg-black ">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <Heading
            title={"  Stay upto date with about our latest offers"}
            style={"text-light text-center basis-2/3"}
          />
          <div className="flex flex-col justify-center items-center gap-2 basis-1/3">
            <label
              htmlFor=""
              className="flex items-center gap-2   !bg-white w-fit sm:w-[18rem] py-2 rounded-badge px-2  h-fit"
            >
              <span className="text-dark">
                <FiMail />
              </span>
              <input
                type="text"
                className="outline-none px-2 text-dark"
                placeholder="Enter Your Mail"
              />
            </label>

            <button className="capitalize w-fit max-w-sm text-dark rounded-badge px-8 py-4 integral text-sm bg-light">
              Subscribe to NewsLetter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
