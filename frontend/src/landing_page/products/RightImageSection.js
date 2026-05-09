import React from "react";

function RightImageSection(
  {imageURL,
  productName,
  productDescription,
  learnMore}
) {
  return (
    <div className="container ao-product-section mt-5">
      <div className="row align-items-center">

         <div className="col-5 p-5" >
          <h1 style={{fontSize:"1.8rem"}} className="mb-3">{productName}</h1>
          <p style={{ color: '#9a9ab0', lineHeight: '1.8' }}>{productDescription}</p>
          <div className="mt-4">
            <a href={learnMore}>Learn More →</a>
          </div>
        </div>

        <div className="col-2"></div>
        
        <div className="col-5">
          <img src={imageURL} className="p-2" style={{ width: '100%', borderRadius: '16px' }} alt={productName} />
        </div>
      </div>
    </div>
  );
}

export default RightImageSection;
