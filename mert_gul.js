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
                    
                }

                .container {
                    width: 100%;
                }

                .carousel-container{
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    height: 100vh;
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
                    height: 400px;
                    overflow: hidden;
                }

                .inner-slider{
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    display: flex;
                    gap: 5px;
                    pointer-events: none;
                }

                .product-item{
                    width: 230px;
                    height: 100%;
                    text-align: center;
                    padding: 1rem;
                }

                .product-item img{
                    max-width: 100%;
                    height: 203px;
                    object-fit: contain;
                }
            `;

        const init = () => {
            fetchProducts();
            buildHTML();
            buildCSS();
            setEvents();
        };
        
        const buildHTML = () =>{
            let carouselItem ;
            const container = document.createElement("div");
            container.className = "container";
            

            const html = `
            <div class="carousel-container"> 
                <i class="fas fa-arrow-left"></i>
                <div class="carousel-wrapper">
                    <div class="banner-titles">
                        <h2 class="title-primary">Beğenebileceğinizi düşündüklerimiz</h2>
                    </div>
                    <div class="slider">
                        <div class="inner-slider">    
                        </div>
                    </div>
                </div>
                <i class="fas fa-arrow-right"></i>
            </div>
            `;


            document.body.appendChild(container);

            container.innerHTML = html;
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
            const innerSlider = document.querySelector('.inner-slider');
            innerSlider.innerHTML = "";
            if(fetchedProducts){
                fetchedProducts.forEach((product) => {
                    innerSlider.innerHTML += `
                        <div class="product-item">
                            <img src="${product.img}" alt="${product.name}">
                            <h2>${product.name}</h2>
                        <div>

                    `
                    
                })
            }
        };

        init();
    }
)();