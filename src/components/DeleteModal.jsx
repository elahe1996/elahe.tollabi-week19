import styles from "./DeleteModal.module.css";

function DeleteModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>آیا از حذف محصول مطمئنید؟</h3>
        <p className={styles.productName}> {productName}</p>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancelBtn}>
            لغو
          </button>
          <button onClick={onConfirm} className={styles.confirmBtn}>
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
