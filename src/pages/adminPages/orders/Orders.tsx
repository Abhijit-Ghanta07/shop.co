import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import {
  getadminOrdersKey,
  useAdminOrders,
} from "../../../querys/admin/adminQuery";
import {
  DropDown,
  Skeleton,
  TableBody,
  TableCell,
  TableHeader,
} from "../../../components/component";
import { useQueryClient } from "@tanstack/react-query";
import { AdminPagination } from "../adminPages";
import { UpdateOrderStausMutaion } from "../../../querys/order/orderQuery";
import { DateFormat } from "../../../utils/utils";
import Badge from "../../../components/button/Badge";
import { toast } from "react-toastify";
const ordersStatus = ["pending", "shipped", "delivered"];
const Orders = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAdminOrders(+page, itemsPerPage);
  const queryClient = useQueryClient();
  const updateOrderMutaion = UpdateOrderStausMutaion();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [orderStatusstate, setOrdersStatus] = useState("");
  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === data?.orders?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(data?.orders.map((product) => product._id));
    }
  };
  const handleUpdateOrderStatus = () => {
    if (orderStatusstate !== "" && selectedOrder) {
      updateOrderMutaion.mutate({
        id: selectedOrder,
        data: { status: orderStatusstate },
      });
    }
  };

  useEffect(() => {
    if (updateOrderMutaion.isSuccess) {
      toast.success(updateOrderMutaion.data?.message);
      queryClient.invalidateQueries([getadminOrdersKey]);
    }
  }, [updateOrderMutaion.isSuccess]);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex">
        <div className=" mb-6">
          <p className="text-gray-800 text-2xl font-bold">All Orders</p>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link to={"/admin/dash"}>Admin</Link>
              </li>
              <li>
                <Link to={-1}>Dashbroad</Link>
              </li>
              <li>Orders</li>
            </ul>
          </div>
        </div>
        {/* <div className=" ms-auto flex">
          <Link to={"add"}>
            <button className="btn btn-primary">Add Product</button>
          </Link>
        </div> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <Skeleton count={5}>
            <div className="flex w-full justify-between bg-white">
              <div className="flex gap-2 flex-col ">
                <div className=" skeleton bg-inherit w-8 h-8 rounded-full"></div>
                <div className="skeleton bg-inherit h-2 w-14"></div>
              </div>
              <div className="skeleton bg-inherit h-4 w-20"></div>
              <div className="skeleton bg-inherit h-4 w-20"></div>
              <div className="skeleton bg-inherit h-4 w-20"></div>
              <div className="skeleton bg-inherit h-4 w-20"></div>
            </div>
          </Skeleton>
        ) : (
          <table className="w-full rounded overflow-y-hidden">
            <TableHeader
              columns={[
                "",
                "Order ID",
                "Products",
                "Dated",
                "Customer",
                "Total",
                "Payment",
                "Status",
                "Action",
              ]}
              input={true}
              oncheck={selectedProducts.length === data?.orders?.length}
              onchange={toggleSelectAll}
              style="!text-primary"
            />

            <TableBody
              columnsData={data?.orders}
              renderItem={(order) => {
                return (
                  <tr key={order._id} className="text-gray-800 text-base">
                    {/* Checkbox */}
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(order._id)}
                        onChange={() => toggleSelectProduct(order._id)}
                        className="checkbox"
                      />
                    </TableCell>
                    <TableCell>
                      <Link to={order._id} title={order?._id}>
                        {order._id.slice(0, 8)}
                      </Link>
                    </TableCell>
                    {/* Products Name */}
                    <TableCell>
                      <Link
                        to={`/admin/products/${order?.firstProduct?.id}`}
                        className="flex gap-1"
                      >
                        <div className="avatar">
                          <div className="w-8 h-8 rounded">
                            <img
                              src={order?.firstProduct?.variantImages?.[0]?.url}
                              alt="variant image"
                            />
                          </div>
                        </div>
                        <div className="inline-flex flex-col capitalize">
                          <span className="text-wrap capitalize text-sm md:text-base text-gray-800">
                            {order?.firstProduct?.productName || "product name"}
                          </span>
                          {order?.products?.length - 1 > 0 && (
                            <span className="text-sm text-gray-600">
                              +{order?.products?.length - 1} More Products
                            </span>
                          )}
                        </div>
                      </Link>
                    </TableCell>

                    {/* date */}
                    <TableCell>{DateFormat(order?.createdAt)}</TableCell>

                    {/* Category */}
                    <TableCell>{order?.userDetails?.username}</TableCell>

                    {/* Stock */}
                    <TableCell>${order?.totalAmount}</TableCell>

                    {/* Price */}
                    <TableCell>{order?.paymentGateway}</TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge status={order?.status} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <DropDown>
                        <li>
                          <Link
                            to={`${order?._id}`}
                            className="hover:bg-gray-300 font-medium"
                          >
                            <IoEye />
                            View
                          </Link>
                        </li>
                        <li>
                          <select
                            className="select select-bordered  w-full bg-white !text-black"
                            onChange={(ev) => {
                              setSelectedOrder(order?._id);
                              setOrdersStatus(ev.target.value);
                            }}
                          >
                            {/* <option disabled selected className="text-black">
                      Update Status
                    </option> */}
                            {ordersStatus.map((ele) => (
                              <option
                                className="capitalize text-black"
                                value={ele}
                                selected={order?.status == ele}
                              >
                                {ele}
                              </option>
                            ))}
                          </select>
                          <button
                            className="hover:bg-gray-300 btn btn-neutral my-3 font-medium"
                            onClick={handleUpdateOrderStatus}
                          >
                            <div className="flex gap-1">
                              <MdModeEdit />
                              <span className="text-white">Update</span>
                            </div>
                          </button>
                        </li>
                      </DropDown>
                    </TableCell>
                  </tr>
                );
              }}
            />
          </table>
        )}
      </div>
      <AdminPagination
        currentPage={+page}
        setPage={setCurrentPage}
        totalPage={Math.ceil(data?.totalOrders / itemsPerPage)}
        itemperPage={itemsPerPage}
        totalLen={data?.totalOrders}
      />
    </div>
  );
};

export default Orders;
