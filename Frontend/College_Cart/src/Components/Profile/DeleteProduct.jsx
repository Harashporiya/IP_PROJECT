import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './deleteProduct.module.css';
import { getToken } from '../../util/tokenService';
import axios from 'axios';
const backend_url = import.meta.env.VITE_BACKEND_API_URL;
import toast, { Toaster } from 'react-hot-toast';

const DeleteProduct = ({ isOpen, onClose, productId}) => {
  const dialogRef = useRef(null);
   console.log(productId)
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (isOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [isOpen]);

  const handleClose = (e) => {
    e.preventDefault();
   
    onClose();
  };
  const handleDeleteProduct = async () => {
      const token = getToken();
      try {
        await axios.delete(`${backend_url}/${productId}/product-delete`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        toast.success("Product delete successfull");
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error("Product delete during error");
      }
    };
  

  return (
    <>
    <dialog 
      ref={dialogRef} 
      className={styles.dialogContainer}
      onCancel={handleClose}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.openDialog}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className={styles.deleteText}>Delete Product</h2>
            <p className={styles.deleteConfirmation}>
              Are you sure you want to delete this product?
            </p>
            <div className={styles.buttonContainer}>
              <button 
                className={styles.cancelButton} 
                onClick={handleClose}
              >
                Cancel
              </button>
              <button 
                className={styles.deleteButton} 
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
    <Toaster/>
    </>
  );
};

export default DeleteProduct;