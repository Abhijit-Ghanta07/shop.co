import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cl from "classnames";
import style from "./category.module.scss";
import { Heading } from "../component";
const Category = () => {
  const { category } = useSelector((store) => store.category);
  return (
    <section>
      <div className="wrapper">
        <div className="card w-[90%] mx-auto bg-gray-200 p-7 rounded-2xl">
          <Heading title={"browse by dress style"} style={"text-center"} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-10">
            {category?.map((ele, inx) => {
              return (
                <div
                  className={cl(
                    "rounded-lg relative max-h-80 overflow-hidden",
                    [1, 2, 5].includes(inx) ? "sm:col-span-2" : ""
                  )}
                >
                  <Link to={`/product/category/${ele.categoryName}`}>
                    <img
                      src={ele?.categoryImage}
                      className={cl("size-full aspect-square")}
                      alt="image"
                    />
                    <div className="flex h-full justify-center items-center">
                      <p
                        className={cl(
                          " sm:text-3xl integral absolute top-10 left-0 text-dark font-bold uppercase",
                          style.title
                        )}
                      >
                        {ele.categoryName}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
