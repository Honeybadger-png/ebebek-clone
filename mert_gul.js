(
    ()=> {
        const API_URL = `https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json`;
        let fetchedProducts = window.localStorage.getItem("fetchedProducts");

        const init = () => {
            fetchProducts();
            buildHTML();
            buildCSS();
            setEvents();
        };
        
        const buildHTML = () =>{
            const container = document.createElement("div");
            container.className = "container";
            
            const carouselContainer = document.createElement("div");
            carouselContainer.className = "carousel-container";
            
            const bannerTitles = document.createElement("div")
            bannerTitles.className = "banner-titles";

            const h1 = document.createElement("h1");
            h1.textContent = "Hello";
            
            document.body.appendChild(container);
            container.appendChild(carouselContainer);
            carouselContainer.appendChild(bannerTitles);
        };

        const buildCSS = () =>{
            const css = `
                body{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    background-color: aqua;
                
                }

                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: 100%;
                }

                .carousel-container{
                    width:100%;
                    padding-right: 15px;
                    padding-left: 15px;
                    margin-right: auto;
                    margin-left: auto;
                    max-width: 1320px;
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
            `;
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
                console.log('fetched products aint empty');
            }
        }

        const setEvents = () => {
            const container = document.querySelector(".container");
            container.addEventListener("click",()=> {
                console.log("clicked");
            })
        };

        init();
    }
)();