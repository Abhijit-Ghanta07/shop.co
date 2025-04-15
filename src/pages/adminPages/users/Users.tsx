import { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAdminAllUser } from "../../../querys/admin/adminQuery";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  DropDown,
  Modal,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "../../../components/component";
import { AdminPagination } from "../adminPages";
import { DeleteUserMutation } from "../../../querys/user/userQuery";
import { DateFormat, ImageLetter } from "../../../utils/utils";
import { AdminBadge } from "../../../components/button/btn";
import { FcGoogle } from "react-icons/fc";
import { MdMarkEmailRead } from "react-icons/md";
import AdminTableLayout from "../../../layouts/AdminTableLayout";
import TableDataSkeleton from "../../../components/skeleton/TableDataSkeleton";

const UsersTable = () => {
  const deleteMutation = DeleteUserMutation();
  const itemsperpage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAdminAllUser(currentPage, itemsperpage);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [deleteSelect, setDelectSelect] = useState("");
  const modalRef = useRef(null);
  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === data?.allUsers?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(data?.allUsers?.map((user) => user?._id));
    }
  };
  const handleDelete = () => {
    deleteMutation.mutate(deleteSelect);
  };

  return (
    <>
      <AdminTableLayout title={"users"}>
        <div className=" ms-auto flex">
          <Link to={"add"}>
            <button className="btn btn-primary">Add User</button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            loading={isLoading}
            loader={
              <Skeleton count={5}>
                <TableDataSkeleton />
              </Skeleton>
            }
          >
            <TableHeader
              columns={[
                "",
                "Name",
                "Access",
                "Status",
                "Date Added",
                "Actions",
              ]}
              input={true}
              oncheck={selectedProducts.length === data?.allUsers?.length}
              onchange={toggleSelectAll}
            />
            <TableBody
              columnsData={data?.allUsers}
              renderItem={(eachUser) => {
                return (
                  <tr key={eachUser?._id} className="text-gray-800 text-base">
                    {/* Checkbox */}
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(eachUser?._id)}
                        onChange={() => toggleSelectProduct(eachUser?._id)}
                        className="checkbox"
                      />
                    </TableCell>

                    {/* user Name */}
                    <TableCell>
                      <div className="inline-flex gap-2">
                        <Link to={eachUser?._id}>
                          {eachUser?.imgUrl !== "" ? (
                            <>
                              <div className="avatar">
                                <div className="w-14 rounded-full">
                                  <img src={eachUser?.imgUrl} />
                                </div>
                              </div>
                            </>
                          ) : (
                            <ImageLetter name={eachUser?.username} />
                          )}
                        </Link>

                        <div className="inline-flex flex-col">
                          <p className="text-gray-800 text-base inline-flex items-center gap-2 capitalize">
                            <span>{eachUser?.username}</span>
                            {eachUser?.authProvider === "google" ? (
                              <span>
                                <FcGoogle />
                              </span>
                            ) : (
                              <span>
                                <MdMarkEmailRead />
                              </span>
                            )}
                          </p>
                          <span className="text-gray-400 text-sm">
                            {eachUser?.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* SKU */}
                    <TableCell>
                      <div className="flex gap-2">
                        {eachUser?.roles?.map((role) => (
                          <AdminBadge status={role} />
                        ))}
                      </div>
                    </TableCell>

                    {/* active */}
                    <TableCell>
                      {eachUser?.isActive ? (
                        <span className="badge badge-success badge-outline">
                          Active
                        </span>
                      ) : (
                        <span className="badge badge-neutral">Active</span>
                      )}
                    </TableCell>

                    {/* added */}
                    <TableCell>{DateFormat(eachUser?.createdAt)}</TableCell>

                    {/* Price */}

                    {/* Actions */}
                    <TableCell>
                      <DropDown>
                        <li>
                          <Link
                            to={`${eachUser?._id}`}
                            className="hover:bg-gray-300 font-medium"
                          >
                            <IoEye />
                            View
                          </Link>
                        </li>
                        <li>
                          <button
                            className="hover:bg-gray-300 font-medium"
                            onClick={() => {
                              if (modalRef?.current) {
                                setDelectSelect(eachUser?._id);
                                modalRef?.current?.showModal();
                              }
                            }}
                          >
                            <FaRegTrashAlt />
                            Delete
                          </button>
                        </li>
                        {/* <button className="btn btn-sm btn-ghost rounded-full">
            <MdModeEdit />
          </button> */}
                      </DropDown>
                    </TableCell>
                  </tr>
                );
              }}
            />
          </Table>
        </div>
        <AdminPagination
          currentPage={currentPage}
          setPage={setCurrentPage}
          totalPage={Math.ceil(data?.totalUsers / itemsperpage)}
          totalLen={data?.totalUsers}
          itemperPage={itemsperpage}
        />
      </AdminTableLayout>
      {/* modal for confirm delete */}
      <Modal modalRef={modalRef}>
        <div className="card flex justify-center flex-col gap-3 items-center">
          <div className="flex justify-center border-spacing-1 bg-red-400 w-20 rounded-full p-5">
            <span>
              <FaRegTrashCan size={30} color="white" />
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="font-bold text-xl">Delete This User!!</h3>
            <p className="py-4">Press Delete or Cancel !!</p>
          </div>

          <div className="btn-group w-full px-5 flex justify-between">
            <button
              className="btn btn-outline text-lg font-medium"
              onClick={() => {
                if (modalRef?.current) {
                  modalRef.current?.close();
                }
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-error text-lg font-medium"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UsersTable;
