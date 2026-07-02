import { useState, useCallback } from 'react';
import productsDataRaw from './productsData.json';

// Transform raw DB rows into the expected frontend format
const fixUrl = (url) => url && url.startsWith('/uploads') ? `${process.env.PUBLIC_URL || ''}${url}` : url;

const productsData = productsDataRaw.map(row => ({
  ...row,
  images: {
    front: fixUrl(row.image_front),
    detail: fixUrl(row.image_detail),
    room: fixUrl(row.image_room)
  },
  materials: typeof row.materials === 'string' ? JSON.parse(row.materials || '[]') : row.materials,
  swatches: (typeof row.swatches === 'string' ? JSON.parse(row.swatches || '[]') : (row.swatches || [])).map(swatch => {
    let imgUrl = swatch.image;
    if (imgUrl && imgUrl.includes('http://localhost:5000')) {
      imgUrl = imgUrl.replace('http://localhost:5000', '');
    }
    return {
      ...swatch,
      image: fixUrl(imgUrl)
    };
  }),
  additional_images: (typeof row.additional_images === 'string' ? JSON.parse(row.additional_images || '[]') : (row.additional_images || [])).map(url => typeof url === 'string' ? fixUrl(url) : url)
}));

export default function useProducts() {
  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(() => {
    // With static frontend, data is always loaded instantly.
    setProducts(productsData);
    setLoading(false);
    setError(null);
  }, []);

  return {
    products,
    loading,
    error,
    refresh: fetchProducts
  };
}
