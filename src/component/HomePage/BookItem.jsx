import "./BookItem.scss";
import bg2 from "../../assets/bg2.jpg";
import bg1 from "../../assets/aa.jpg";
import bg3 from "../../assets/aaa.jpg";
import _ from "lodash";
import { useEffect, useState } from "react";
const CardItem = ({product, handleClickViewBook}) => {
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (!_.isEmpty(product)) {
      if (product.images && product.images.length > 0) {
        setPreviewImage(
          `data:image/jpeg;base64,${product.images[0]?.imageData}`
        );
      }
    }
  }, [product]);
  return (
    <div className="book-item">
      <img src={previewImage} alt="Book picture" className="img-book-item cursor"  onClick={() => handleClickViewBook(product)}/>
      <h3 className="book-name cursor" onClick={() => handleClickViewBook(product)} >{product.name}</h3>
      <p className="book-name-authors cursor" onClick={() => handleClickViewBook(product)}>
        {product.authors && product.authors.length > 0
          ? product.authors[0].name
          : ""}
      </p>
      <p className="book-price cursor" onClick={() =>handleClickViewBook(product)}>{product.price}</p>
      <button className="btn-add-cart">Add to Cart</button>
    </div>
  );
};

const BookItem = (props) => {
  const { listProduct, handleClickViewBook } = props;

// Chia listProduct thành các nhóm 4 sản phẩm
const groupedProducts = [];
for (let i = 0; i < listProduct.length; i += 4) {
  groupedProducts.push(listProduct.slice(i, i + 4));
}

return (
  <div className="book-container">
    {groupedProducts.map((group, index) => (
      <div className={`book-trending ${index}`} key={index}>
        {group.map((product, productIndex) => (
          <CardItem key={productIndex} product={product} handleClickViewBook={handleClickViewBook} />
        ))}
      </div>
    
    ))}
   
  </div>
)
};
export default BookItem;
