import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetCategoryProducts } from "../../../querys/categoryQuery";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import {
  DeleteModal,
  DropDown,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from "../../../components/component";
import AdminTableLayout from "../../../layouts/AdminTableLayout";
import TableDataSkeleton from "../../../components/skeleton/TableDataSkeleton";

const CategoryProducts = () => {
  const [params] = useSearchParams();
  const { id } = useParams();
  let param = params.get("query");
  const { data, isLoading } = useGetCategoryProducts(param);
  const products = data?.products;
  const queryClient = useQueryClient();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [deleteSelect, setDeleteSelect] = useState("");
  const modalRef = useRef(null);
  // Toggle product selection
  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  // Select or deselect all products
  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product?._id));
    }
  };
  const { mutate: deleteMutation } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (id) => deleteProduct(id),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      if (modalRef?.current) {
        modalRef.current?.close();
      }
      queryClient.invalidateQueries("adminproducts");
    },
  });
  const handleDelete = () => {
    deleteMutation(deleteSelect);
  };

  return (
    <>
      <AdminTableLayout title={"Category Products"}>
        <div className=" ms-auto flex">
          <Link to={"add"}>
            <button className="btn btn-primary">Add Product</button>
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
                "Product",
                "SKU",
                "Category",
                "Stock",
                "Price",
                "Status",
                "Added",
                "Action",
              ]}
              input={true}
              oncheck={selectedProducts.length === products?.length}
              onchange={toggleSelectAll}
              style="!text-primary"
            />

            <TableBody
              columnsData={products}
              renderItem={(product) => {
                return (
                  <tr key={product?._id} className="text-black text-lg">
                    {/* Checkbox */}

                    {/* Product Name */}
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product?._id)}
                          onChange={() => toggleSelectProduct(product?._id)}
                          className="checkbox"
                        />
                        <div className="flex space-x-3">
                          <div className="avatar">
                            <div className="w-8 h-8 rounded-full">
                              <img
                                src={
                                  product?.firstVariant?.images?.[0]?.url ||
                                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                alt="Tailwind-CSS-Avatar-component"
                              />
                            </div>
                          </div>
                          <p className="inline-flex flex-col">
                            <span className="capitalize font-medium">
                              {product?.name}
                            </span>
                            <span className="text-sm text-gray-400">
                              {product?.totalVariants} variants
                            </span>
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* SKU */}
                    <TableCell>{product?.sku}</TableCell>

                    {/* Category */}
                    <TableCell>{product?.category || "category"}</TableCell>

                    {/* Stock */}
                    <TableCell>{product?.totalStock}</TableCell>

                    {/* Price */}
                    <TableCell>
                      ${product?.firstVariant?.sellPrice || 300}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {product?.totalStock < 10 ? (
                        <span
                          className={`px-2 py-1 rounded text-sm ${"bg-red-100 text-red-800"}`}
                        >
                          Low Stock
                        </span>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded text-sm ${" bg-gray-400"}`}
                        >
                          normal
                        </span>
                      )}
                    </TableCell>

                    {/* Added Date */}
                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <DropDown>
                        <li>
                          <Link
                            to={`/admin/products/${product?._id}`}
                            className="hover:bg-gray-500 text-start font-medium"
                          >
                            <IoEye />
                            View
                          </Link>
                        </li>
                        <li>
                          <button className="hover:bg-gray-500 text-start font-medium">
                            <MdModeEdit />
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="hover:bg-gray-500 text-start font-medium"
                            onClick={() => {
                              if (modalRef?.current) {
                                setDeleteSelect(product?._id);
                                modalRef.current?.showModal();
                              }
                            }}
                          >
                            <FaRegTrashAlt />
                            Delete
                          </button>
                        </li>
                      </DropDown>
                    </TableCell>
                  </tr>
                );
              }}
            />
          </Table>
        </div>
      </AdminTableLayout>
      {/* modal for delete product */}
      <DeleteModal modalRef={modalRef} func={handleDelete} />
    </>
  );
};

export default CategoryProducts;
