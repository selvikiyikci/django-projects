javascript: (function () {
    const API_URL = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
    const STORAGE_KEY = "ebebek_favorites";
    const CACHE_KEY = "ebebek_products";

    const getRandomStars = () => "⭐".repeat(5);


    let favoriteProducts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

 
    async function initCarousel() {
     
        let products = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (!products) {
            try {
                const response = await fetch(API_URL);
                products = await response.json();
                localStorage.setItem(CACHE_KEY, JSON.stringify(products));
            } catch (error) {
                console.error("Ürünler yüklenemedi:", error);
                return;
            }
        }

        const mainContainer = document.createElement("div");
        mainContainer.className = "product-carousel-container";
        mainContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: 0 auto;
            position: relative;
            background-color: #FFFFFF;
            padding-top: 20px;
        `;

  
        const innerContainer = document.createElement("div");
        innerContainer.className = "carousel-title-Div";
        innerContainer.style.cssText = `
         
            width: 100%;
            background-color: #fef6eb;
            font-family: Quicksand-Bold;
            border-top-left-radius: 35px;
            border-top-right-radius: 35px;
        `;

        const title = document.createElement("h2");
        title.textContent = "Beğenebileceğinizi Düşündüklerimiz";
        title.style.cssText = `
            padding: 25px 67px;
            text-align: start;
            font-size: 3rem;
            font-weight: 700;
            color: #f28e00;
            line-height: 1.11;
            font-family: Quicksand-Bold;
            margin: 0;
        `;

        const sliderContainer = document.createElement("div");
        sliderContainer.className = "product-carousel";
        sliderContainer.style.cssText = `
         
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 0;
            padding: 20px 0;
            scroll-behavior: smooth;
            width: 100%;
            max-width: 1320px;
            margin: 0 auto;
        `;

     
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.style.cssText = `
                flex: 0 0 auto;
                background: #fff;
                border-radius: 10px;
                border: 1px solid #ededed;
                padding: 15px;
                text-align: center;
                gap: 4rem;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                transition: all 0.3s ease;
                position: relative;
                width: 242px;
                margin-right: 20px;
                padding:5px;
            `;

          
            productCard.onmouseover = () => {
                productCard.style.border = '4px solid #f28e00';
                productCard.style.padding = '12px';
            };
            productCard.onmouseout = () => {
                productCard.style.border = '1px solid #ededed';
                productCard.style.padding = '15px';
            };

       
            const bestSellerTag = document.createElement("img");
            bestSellerTag.src = "https://www.e-bebek.com/assets/images/cok-satan.png";
            bestSellerTag.alt = "Çok Satan";
            bestSellerTag.style.cssText = `
                position: absolute;
                top: 8px;
                left: 8px;
                width: 48px;
                height: 48px;
                z-index: 1;
            `;
            productCard.appendChild(bestSellerTag);

      
            const productLink = document.createElement("a");
            productLink.href = product.url;
            productLink.target = "_blank";
            productLink.style.cssText = `
                text-decoration: none;
                color: inherit;
                display: block;
            `;


            const productImage = document.createElement("img");
            productImage.src = product.img;
            productImage.alt = product.name;
            productImage.style.cssText = `
                width: 100%;
                height: 232px;
                object-fit: contain;
                background: #FFFFFF;
            `;

       
            const ratingContainer = document.createElement("div");
            ratingContainer.style.cssText = `
                display: flex;
                align-items: center;
                gap: 4px;
                margin-bottom: 8px;
                justify-content: center;
            `;

            const stars = document.createElement("div");
            stars.textContent = getRandomStars();
            stars.style.cssText = `
                font-size: 14px;
                line-height: 1;
            `;
            ratingContainer.appendChild(stars);

            const reviewCount = document.createElement("span");
            reviewCount.textContent = "(85)";
            reviewCount.style.cssText = `
                color: #808080;
                font-size: 14px;
                margin-left: 4px;
            `;
            ratingContainer.appendChild(reviewCount);

            const brand = document.createElement("p");
            brand.textContent = product.brand;
            brand.style.cssText = `
                font-family: "AvenirNext-Insider", sans-serif;
                font-size: 16px;
                line-height: 24px;
                font-weight: 600;
                color: #1A1A1A;
                margin: 0;
                text-align: left;
            `;

       
            const name = document.createElement("p");
            name.textContent = product.name;
            name.style.cssText = `
                font-family: "AvenirNext-Insider", sans-serif;
                font-size: 14px;
                line-height: 20px;
                color: #4D4D4D;
                margin: 8px 0;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                height: 40px;
                text-align: left;
            `;

        
            const priceContainer = document.createElement("div");
            priceContainer.style.cssText = `
                margin-bottom: 12px;
            `;

            if (product.original_price && product.original_price !== product.price) {
                const originalPriceDiv = document.createElement("div");
                originalPriceDiv.style.cssText = `
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 4px;
                    justify-content: center;
                `;

                const originalPrice = document.createElement("span");
                originalPrice.textContent = `${product.original_price.toFixed(2)} TL`;
                originalPrice.style.cssText = `
                    color: #808080;
                    font-size: 14px;
                    text-decoration: line-through;
                    font-weight: 600;
                `;

                const discount = document.createElement("span");
                const discountAmount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
                discount.textContent = `%${discountAmount}`;
                discount.style.cssText = `
                    background: #4CAF50;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 700;
                    margin-left: 8px;
                `;

                originalPriceDiv.appendChild(originalPrice);
                originalPriceDiv.appendChild(discount);
                priceContainer.appendChild(originalPriceDiv);
            }

            const currentPrice = document.createElement("div");
            const [whole, decimal] = product.price.toFixed(2).split('.');
            currentPrice.innerHTML = `${whole},<sup style="font-size: 14px;">${decimal}</sup> TL`;
            currentPrice.style.cssText = `
                font-family: "GreycliffCF", sans-serif;
                font-size: 24px;
                line-height: 32px;
                font-weight: 700;
                color: #1A1A1A;
            `;
            priceContainer.appendChild(currentPrice);

     
            const addToCartButton = document.createElement("button");
            addToCartButton.textContent = "Sepete Ekle";
            addToCartButton.style.cssText = `
                width: 100%;
                padding: 15px;
                background: #fff7ec;
                color: #f28e00;
                border-radius: 37.5px;
                border: none;
                font-weight: 700;
                font-size: 1.4rem;
                margin-top: auto;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            addToCartButton.onmouseover = () => {
                addToCartButton.style.backgroundColor = '#f28e00';
                addToCartButton.style.color = 'white';
            };
            addToCartButton.onmouseout = () => {
                addToCartButton.style.backgroundColor = '#fff7ec';
                addToCartButton.style.color = '#f28e00';
            };

            const favoriteButton = document.createElement("button");
            favoriteButton.innerHTML = favoriteProducts.includes(product.id) ?
                `<svg width="24" height="24" viewBox="0 0 24 24" fill="#f28e00" stroke="#f28e00" stroke-width="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>` :
                `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f28e00" stroke-width="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>`;
            favoriteButton.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                width: 50px;
                height: 50px;
                background: white;
                border: none;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                z-index: 2;
                transition: all 0.3s ease;
            `;

            favoriteButton.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const index = favoriteProducts.indexOf(product.id);
                if (index === -1) {
                    favoriteProducts.push(product.id);
                    favoriteButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="#f28e00" stroke="#f28e00" stroke-width="2">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>`;
                } else {
                    favoriteProducts.splice(index, 1);
                    favoriteButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f28e00" stroke-width="2">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>`;
                }
                localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteProducts));
            };

            favoriteButton.onmouseover = () => {
                if (!favoriteProducts.includes(product.id)) {
                    favoriteButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f28e00" stroke-width="2">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>`;
                }
            };

            favoriteButton.onmouseout = () => {
                if (!favoriteProducts.includes(product.id)) {
                    favoriteButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f28e00" stroke-width="2">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>`;
                }
            };

    
            const contentContainer = document.createElement("div");
            contentContainer.style.cssText = `
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
            `;

            const productInfoContainer = document.createElement("div");
            productInfoContainer.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                width: 100%;
                margin: 16px 0;
            `;

            productLink.appendChild(productImage);
            productInfoContainer.appendChild(brand);
            productInfoContainer.appendChild(name);
            productLink.appendChild(productInfoContainer);
            productLink.appendChild(ratingContainer);
            productLink.appendChild(priceContainer);
            productLink.appendChild(addToCartButton);

            contentContainer.appendChild(productLink);
            productCard.appendChild(contentContainer);
            productCard.appendChild(bestSellerTag);
            productCard.appendChild(favoriteButton);
            sliderContainer.appendChild(productCard);
        });

        // Navigasyon butonları
        const createNavButton = (direction) => {
            const button = document.createElement("button");
            button.className = `carousel-${direction}`;
            button.innerHTML = direction === 'prev' ?
                `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg);">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>` :
                `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
            button.style.cssText = `
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #fef6eb;
                color: #f28e00;
                cursor: pointer;
                z-index: 99;
                border: none;
                ${direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
                transition: all 0.3s ease;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            `;

            button.onclick = () => {
                const scrollAmount = 300;
                sliderContainer.scrollBy({
                    left: direction === 'prev' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                });
            };

            return button;
        };

        const prevButton = createNavButton('prev');
        prevButton.style.left = "-65px";
        const nextButton = createNavButton('next');
        nextButton.style.right = "-65px";

    
        const style = document.createElement('style');
        style.textContent = `


            @media(min-width: 1200px) {
                .product-card {
                    width: 242px;
                }
            }
            
            @media(max-width: 1199px) {
                .product-card {
                    width: 242px;
                }
            }
            
            @media(max-width: 768px) {
                .product-card {
                    width: 242px;
                }
                .carousel-prev,
                .carousel-next {
                    display: none !important;
                }
            }

            .product-carousel::-webkit-scrollbar {
                display: none;
            }

            .product-carousel-container {
                background-color: #FFFFFF;
            }
        `;
        document.head.appendChild(style);

   
        sliderContainer.appendChild(prevButton);
        sliderContainer.appendChild(nextButton);
        innerContainer.appendChild(title);
        mainContainer.appendChild(innerContainer);
        mainContainer.appendChild(sliderContainer);

   
        const bannerElement = document.querySelector('.Section1');
        if (bannerElement) {
            bannerElement.parentNode.insertBefore(mainContainer, bannerElement.nextSibling);
        }
    }


    initCarousel();
})(); 
