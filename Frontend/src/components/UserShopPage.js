import React, { useState, useEffect, useCallback } from 'react';
import Cart from './Cart';
import ShowProduct from './ShowProduct';
const UserShopPage = (props) => {
  const [shop, setShop] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [currentPagecategory, setCurrentPagecategory] = useState(1);
  const itemsPerPagecategory = 5;
  const productchoose = useCallback(() => {
    setSelectedCategory(selectedCategory);
  }, [setSelectedCategory]);
  useEffect(() => {
    const fetchShopData = async () => {
      const utoken = localStorage.getItem("token");
      const payload = {
        "shopId": props.id
      };
      try {
        const response = await fetch('http://localhost:27017/api/v1/shop', {
          method: 'POST',
          headers: { Authorization: `Bearer ${utoken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        setShop(data.shop.shop);

      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShopData();
  }, [props.id]);
  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log("hii", product)
  const goBack = () => {
    // Implement logic to add the product to the cart
    setProduct([]);
  };
  const indexOfLastItemcategory = currentPagecategory * itemsPerPagecategory;
  const indexOfFirstItemcategory = indexOfLastItemcategory - itemsPerPagecategory;
  // Function to change the current page
  const paginatecategory = (pageNumbercategory) => setCurrentPagecategory(pageNumbercategory);
  return (
    <>
      <div>
        <div className="side-panel">
          <header>
            <h1>{shop.name}</h1>
          </header>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="button">🔍Search</button>
          </div>
          <Cart count={ShowProduct.count} />
          <div>
            <h3>Categories</h3>
            <select value={selectedCategory} onChange={(e) => { if (e.target.value !== "All") { setSelectedCategory(e.target.value); paginate(1); setProduct([]) } else { setSelectedCategory(null); paginate(1); setProduct([]) } }}>
              <option value={null}>All</option>
              {shop.categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {product.id ? <div><br /><button3 onClick={goBack}>&lt;</button3> <ShowProduct product={product} do={productchoose} /></div> :
            <div>
              <div className="pagination">
                <p>Pages</p>
                {Array.from({ length: Math.ceil(shop.categories?.length / itemsPerPagecategory) }, (_, index) => index + 1).map((pageNumbercategory) => (
                  <button2 key={pageNumbercategory} onClick={() => paginatecategory(pageNumbercategory)}>
                    {pageNumbercategory}
                  </button2>
                ))}
              </div>

              <div className='page'>
                <main>
                  {selectedCategory && (
                    <>
                      <div>
                        <h4>{shop.categories.find((c) => c.id === selectedCategory)?.name}</h4>
                        <div className="pagination">
                          <p>Pages</p>
                          {Array.from({ length: Math.ceil(shop.categories.find((c) => c.id === selectedCategory)?.products.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                            <button2 key={pageNumber} onClick={() => paginate(pageNumber)}>
                              {pageNumber}
                            </button2>
                          ))}
                        </div>
                        <div className="product-list">
                          {shop.categories.find((c) => c.id === selectedCategory)?.products
                            .slice(indexOfFirstItem, indexOfLastItem)
                            .map((product) => (
                              <div key={product.id} className="product-card" onClick={() => setProduct(product)} >
                                {product.image ? <img src={product.image} alt={product.name} className='product-image' /> :
                                  <img src="images/defaultproduct.png" alt="not here" className='product-image' />}
                                <h5>{product.name}</h5>
                                <p>Rs.{product.price}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                  {!selectedCategory && shop.categories?.slice(indexOfFirstItemcategory, indexOfLastItemcategory).map((category) => (
                    <div key={category.id}>
                      <h2>{category.name}</h2>
                      <div className='product-list'>
                        {category.products
                          .slice(indexOfFirstItem, indexOfLastItem)
                          .map((product) => (
                            <div key={product.id} className="product-card" onClick={() => setProduct(product)} >
                              {product.image ? <img src={product.image} alt={product.name} className='product-image' /> :
                                <img src="images/defaultproduct.png" alt="not here" className='product-image' />}
                              <h3>{product.name}</h3>
                              <span className="price">Rs.{product.price}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </main>
              </div>
              </div>
          }
            </div>
      </div>
      </>
      );
};

      export default UserShopPage;
