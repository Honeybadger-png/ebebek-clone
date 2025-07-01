(
    ()=> {
        const init = () => {
            buildHTML();
            buildCSS();
            setEvents();
        };
        
        const buildHTML = () =>{
            const container = document.createElement("div");
            const h1 = document.createElement("h1");
            container.className = "container";
            h1.textContent = "Hello";
            
            container.appendChild(h1);
            document.body.appendChild(container);
        };

        const buildCSS = () =>{
            const css = `
                .container {
                    background-color: red;
                    height: 100px;
                    width: 100px;
                }
            `;
            const style = document.createElement("style");
            style.textContent = css;
            document.head.appendChild(style);
        };

        const setEvents = () => {
            const container = document.querySelector(".container");
            container.addEventListener("click",()=> {
                console.log("clicked");
            })
        };

        init();
    }
)();