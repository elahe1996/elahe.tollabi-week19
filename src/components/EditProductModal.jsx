import { useState, useEffect } from "react";
import api from "../services/api";
import styles from "./EditProductModal.module.css";

function EditProductModal({ isOpen, onClose, product, onProductUpdated }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // هر بار که product تغییر کند (مودال باز شود با محصول جدید)، فرم پر می‌شود
  useEffect(() => {
    if (product) {
      setName(product.name);
      setQuantity(product.quantity);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) {
      alert("تمامی فیلدها الزامی است");
      return;
    }
    setLoading(true);
    try {
      await api.put(`/products/${product.id}`, {
        name,
        price: Number(price),
        quantity: Number(quantity),
      });
      onProductUpdated(); // رفرش لیست
      onClose();
    } catch (err) {
      console.error(err);
      alert("خطا در ویرایش محصول");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>ویرایش اطلاعات محصول</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>نام کالا</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label>تعداد موجودی</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label>قیمت</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "در حال ذخیره..." : "ثبت اطلاعات جدید"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
