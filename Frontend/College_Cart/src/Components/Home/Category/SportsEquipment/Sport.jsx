import React, { useContext, useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import '../Books/book.css';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../../Header/context';


const ProductSkeleton = () => {
  return (
    <Box className="product-skeleton-book">
      <div className="skeleton-image-book">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: '4px' }}
        />
      </div>
      <div className="skeleton-text-book">
        <Skeleton
          variant="text"
          width="100%"
          height={20}
        />
      </div>
    </Box>
  );
};

const Sport = () => {
  const [productsSport, setProductsSport] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {products} = useContext(UserDataContext)
      useEffect(() => {
        if (products.length > 0) {
          const filterCategory = products.filter((item) => item.category === 'Sports Equipment').slice(0,6);
          setProductsSport(filterCategory);
          setLoading(false);
        }
      }, [products]);

  return (
    <div className="book-container" onClick={()=>navigate("/all-sport-item")}>
      <div className="book-header">
        <h2 className="book-title">
        Sports Equipment
          <span onClick={()=>navigate("/all-sport-item")}><Button/></span>
        </h2>
      </div>
      <div className="products-grid-book">
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <>
            <ProductSkeleton key={index} />
            </>
          ))
        ) : (
          productsSport.map(product => (
            <div key={product._id} className="product-card-book">
              <div className="product-image-container-book">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image-book"
                />
              </div>
              <div className="product-info-book">
                <h3 className="product-name-book">{product.name}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sport;