import React from "react";

function LeftImageSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container np-product-section">
      <div className="row mt-5 align-items-center">
        <div className="col-6 p-5">
          <img src={imageURL} className="p-2" style={{ width: '100%', borderRadius: '16px' }} alt={productName} />
        </div>
        <div className="col-1"></div>
        
        <div className="col-5 p-5">
          <h1 style={{fontSize:"1.8rem"}} className="mb-3">{productName}</h1>
          <p style={{ color: '#9a9ab0', lineHeight: '1.8' }}>{productDescription}</p>
          <div className="mt-4">
            <a href={tryDemo}>Try Demo →</a>
            <a href={learnMore} style={{marginLeft:"40px"}}>Learn More →</a>
          </div>
          <div className="mt-5">
            <a href={googlePlay} >
              <img src="\media\googlePlayBadge.svg" alt="Google Play" style={{ filter: 'brightness(0.85)' }} />
            </a>
            <a href={appStore} style={{marginLeft:"20px"}}>
              <img src="\media\appstoreBadge.svg" alt="App Store" style={{ filter: 'brightness(0.85)' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftImageSection;
