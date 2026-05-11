
import { useState } from "react";
import styles from "./AddProductModal.module.css";
import api from "../services/api";

function AddProductModal({ isOpen, onClose, onProductAdded }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) {
      alert("تمامی فیلدها الزامی است");
      return;
    }
    setLoading(true);
    try {
      
      await api.post("/products", { name, price: Number(price), quantity: Number(quantity) });
     
      onProductAdded(); 
      onClose();
      setName("");
      setQuantity("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("خطا در ایجاد محصول");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>ایجاد محصول جدید</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>نام کالا</label>
            <input
              type="text"
              placeholder="نام کالا"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label>تعداد موجودی</label>
            <input
              type="number"
              placeholder="تعداد"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label>قیمت</label>
            <input
              type="number"
              placeholder="قیمت"
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
              {loading ? "در حال ایجاد..." : "ایجاد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
