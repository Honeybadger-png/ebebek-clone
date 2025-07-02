(
    ()=> {
        const API_URL = `https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json`;
        let fetchedProducts = JSON.parse(window.localStorage.getItem("fetchedProducts"));
        const primaryColor = '#f28e00';

        const css = `
                body{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: Poppins, "cursive";
                }

                .container {
                    width: 100%;
                }

                .carousel-container{
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    gap: 10px;
                    height: 100vh;
                }

                .prev-swiper{
                    background-color: #fef6eb;
                    color: ${primaryColor};
                    border-radius: 100%;
                    font-size: 1rem;
                    border: 2px solid transparent;
                    padding: 16px;
                }

                .next-swiper{
                    background-color: #fef6eb;
                    color: ${primaryColor};
                    font-size: 1rem;
                    border: 2px solid transparent;
                    border-radius: 100%;
                    padding: 16px;
                }

                .prev-swiper:hover {
                    background-color: white;
                    cursor: pointer;
                    border: 2px solid ${primaryColor};
                }

                .next-swiper:hover{
                    background-color: white;
                    cursor: pointer;
                    border: 2px solid ${primaryColor};                    
                }

                .carousel-wrapper{
                    width: 50vw;
                    padding-left: 15px;
                    padding-right: 15px;
                    max-width: 1120px;
                }

                .banner-titles{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #fef6eb;
                    padding: 25px 67px;
                    border-top-left-radius: 35px;
                    border-top-right-radius: 35px;
                    font-family: sans-serif;
                    font-weight: 700;
                }

                .title-primary{
                    font-size: 3rem;
                    font-weight: 700;
                    line-height: 1.11;
                    color: ${primaryColor};
                    margin: 0;
                }
                
                .slider-wrapper{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .slider{
                    position: relative;
                    width: 100%;
                    height: 500px;
                    overflow: hidden;
                }

                .inner-slider{
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    display: flex;
                }

                .product-item{
                    border: 2px solid transparent;
                    width: 230px;
                    heigh: 450px;
                    text-align: center;
                }

                .product-item:hover{
                    border: 2px solid ${primaryColor};
                    cursor: pointer;
                    border-radius: 8px;
                }

                .product-item img{
                    max-width: 100%;
                    height: 203px;
                    object-fit: contain;
                }

                .title{
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-family: Poppins, "cursive";
                    overflow:hidden;
                    text-overflow: ellipsis;
                }

                .btn-product{
                    background-color: #fff7ec;
                    border-radius: 37.5px;
                    font-size: 1.4rem;
                    font-weight: 700;
                    font-family: Poppins, "cursive";
                    color: ${primaryColor};
                    border: 1px solid ${primaryColor};
                    padding: 15px 20px;
                }
                @media (max-width: 1200px){
                    .title-primary{
                        font-size: 2rem;
                    }
                }

                @media (max-width: 768px){
                    .title-primary{
                        font-size: 20px;
                    }
                }

            `;

        const init = () => {
            fetchProducts();
            buildHTML();
            buildCSS();
            setEvents();
        };
        
        const buildHTML = () =>{
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = "stylesheet";
            link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
            document.head.appendChild(link);
            const container = document.createElement("div");
            container.className = "container";
            

            const html = `
            <div class="carousel-container">
                <button class="prev-swiper">
                    <i class="fas fa-arrow-left"></i>
                </button> 
                <div class="carousel-wrapper">
                    <div class="banner-titles">
                        <h4 class="title-primary">Beğenebileceğinizi düşündüklerimiz</h4>
                    </div>
                    <div class="slider">
                        <div class="inner-slider">    
                        </div>
                    </div>
                </div>
                <button class="next-swiper">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
            `;

            document.body.appendChild(container);

            container.innerHTML = html;

            const innerSlider = document.querySelector('.inner-slider');
            innerSlider.innerHTML = "";
            if(fetchedProducts){
                fetchedProducts.forEach((product) => {
                    if(product.price === product.original_price){
                        innerSlider.innerHTML += `
                            <div class="product-item">
                                <img src="${product.img}" alt="${product.name}">
                                <h4 class="title">${product.name}</h4>
                                <h3>${product.price} TL</h3>
                                <button class="btn-product">Sepete Ekle</button>
                            <div>
    
                        `;
                    }else{
                        innerSlider.innerHTML += `
                            <div class="product-item">
                                <img src="${product.img}" alt="${product.name}">
                                <h4 class="title">${product.name}</h4>
                                <h4>${product.original_price}</h4>
                                <h3>${product.price}</h3>
                                <button class="btn-product">Sepete Ekle</button>
                            <div>
    
                        `;
                    }
                })
            }
        };

        const buildCSS = () =>{
            
            const style = document.createElement("style");
            style.textContent = css;
            document.head.appendChild(style);
        };

        const fetchProducts = async() => {
            if(!fetchedProducts){
                const response = await fetch(`${API_URL}`);
                let data = await response.json();
                window.localStorage.setItem("fetchedProducts", JSON.stringify(data));
                console.log(data);
            }else{
                console.log('fetched products isnt empty');
            }
        }

        const setEvents = () => {
            let slider = document.querySelector('.slider');
            let innerSlider = document.querySelector('.inner-slider');
            let products = document.querySelectorAll('.product-item');
            let prevButton = document.querySelector('.prev-swiper');
            let nextButton = document.querySelector('.next-swiper');
            let productContainer = document.querySelector('.product-item');
            let productContainerWidth = productContainer.getBoundingClientRect().width;

            let x = 0;

            products.forEach((product)=> {
            })

            prevButton.addEventListener('mousedown', (e)=>{
                let moveAmount = productContainerWidth;
                x = x + moveAmount
                if(x > 0){
                    x = 0;
                    innerSlider.style.left = '0px';
                }else{
                    innerSlider.style.left = `${x}px`;
                }
            })

            nextButton.addEventListener('mousedown',(e)=>{
                let outer = slider.getBoundingClientRect();
                let inner = innerSlider.getBoundingClientRect();
                let moveAmount = productContainerWidth;
                x = x - moveAmount

                if(-x > (inner.width - outer.width)){
                    x = -(inner.width - outer.width);
                    innerSlider.style.left = `${x}px`
                }else{
                    innerSlider.style.left = `${x}px`
                }
            })
        };

        init();
    }
)();