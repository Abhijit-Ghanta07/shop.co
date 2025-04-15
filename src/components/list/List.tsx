import { Link } from "react-router-dom";
import cl from "classnames";
import style from "./list.module.scss";
const List = ({
  title = "",
  data = [],
  renderItem,
  exstyle = "",
  viewLink = "",
}) => {
  return (
    <section>
      <div className="wrapper">
        {title !== "" && (
          <h2 className="font-extrabold text-center capitalize py-10 text-primary text-4xl">
            {title}
          </h2>
        )}

        {/* map the products */}
        <div
          className={cl(
            "flex gap-4 flex-wrap",
            exstyle == "" ? style.list : "",
            exstyle
          )}
        >
          {data?.map((item) => renderItem(item))}
        </div>
        <div className="flex justify-center py-7">
          {viewLink !== "" && (
            <Link
              to={viewLink}
              className=" px-5 py-2 text-light bg-primary rounded-badge"
            >
              View All
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default List;
