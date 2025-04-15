import cl from "classnames";
import { Link, useLocation } from "react-router-dom";
const AdminTableLayout = ({ title, style, children }) => {
  const { pathname } = useLocation();
  return (
    <>
      <div className={cl("p-6 bg-white rounded-lg shadow-md", style)}>
        {/* bread */}
        <div className="flex">
          <div className=" mb-6">
            <p className="text-gray-800 uppercase text-2xl font-bold">
              {title}
            </p>
            {/* breadcrumbs */}
            <div className="breadcrumbs text-sm">
              <ul>
                {pathname.split("/").map((ele) => (
                  <li>
                    <Link className="capitalize" to={ele}>
                      {ele}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default AdminTableLayout;
