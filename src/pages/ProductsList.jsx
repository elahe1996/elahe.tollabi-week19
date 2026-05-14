import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import api from "../services/api";
import styles from "./ProductsList.module.css";
import AddProductModal from "../components/AddProductModal";
import Header from "../components/Header";
import DeleteModal from "../components/DeleteModal";
import EditProductModal from "../components/EditProductModal";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) navigate("/login");
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products", {
        params: {
          page,
          limit: 5,
          name: searchTerm || undefined,
        },
      });

      setProducts(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("خطا در دریافت محصولات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await api.delete(`/products/${productToDelete.id}`);

      setPage(1);
      setSearchTerm("");
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف محصول");
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = async () => {
    setPage(1);
    setSearchTerm("");
    setSearchTerm("");
    await fetchProducts();
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleProductAdded = async () => {
    setPage(1);
    setSearchTerm("");
    setSearchTerm("");
    await fetchProducts();
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.searchRow}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              key="search-input"
              type="text"
              placeholder="جستجو کالا"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.headerRow}>
          <h1 className={styles.title}>مدیریت کالا</h1>
          <button className={styles.addButton} onClick={handleAdd}>
            افزودن محصول
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {loading ? (
          <div className={styles.loading}>در حال بارگذاری...</div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>نام کالا</th>
                    <th>موجودی</th>
                    <th>قیمت (تومان)</th>
                    <th>شناسه کالا</th>
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price.toLocaleString()}</td>
                      <td>{product.id.slice(0, 8)}...</td>
                      <td>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEdit(product)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteClick(product)}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className={styles.noData}>
                        محصولی یافت نشد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 0 && (
              <div className={styles.pagination}>
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className={styles.pageBtn}
                >
                  قبلی
                </button>
                <span className={styles.pageInfo}>
                  صفحه {page} از {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className={styles.pageBtn}
                >
                  بعدی
                </button>
              </div>
            )}
          </>
        )}
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          productName={productToDelete?.name}
        />
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={selectedProduct}
          onProductUpdated={handleProductUpdated}
        />
      </div>
    </>
  );
}

export default ProductsList;
