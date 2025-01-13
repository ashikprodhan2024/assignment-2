let allProducts = [];

const loadAllproduct = () => {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);

            allProducts = data; 
            displayProduct(data);
        });
};

const displayProduct = (products) => {
    const productsContainer = document.getElementById("product_container");
    productsContainer.innerHTML = ""; // Clear previous products

    if (products.length === 0) {
        productsContainer.innerHTML = `<h5>No Products Found</h5>`;
        return;
    }

    products.forEach((product) => {
        // console.log(product);
        const div = document.createElement("div");

        div.classList.add("card");
        div.innerHTML = `
            <img class="card-img" src="${product.image}" alt="">
            <h5>${product.title}</h5>
            <h3>Price: ${product.price}</h3>
            <p>${product.description.slice(0, 50)}...</p>
            <button onclick="silgleProduct(${product.id})">Details</button>
            <button onclick="handleAddToCart('${product.title.slice(0,12)}', ${product.price})">Add to Cart</button>
        `;
        productsContainer.appendChild(div);
    });
};

const handleAddToCart = (name, price) => {
    const cartCount = document.getElementById("count").innerText;

    let convert = parseInt(cartCount);
    convert = convert + 1;

    document.getElementById("count").innerText = convert;
    // console.log(convert);

    const container = document.getElementById("card_main_cintainer");
    // console.log(name, price);

    const div = document.createElement("div");

    div.classList.add("cart_info");
    div.innerHTML = `
        <p>${name}</p>
        <h3 class="price">${price}</h3>
    `;
    container.appendChild(div);
    updatePrice();
};

const updatePrice = () => {
    const allPrice = document.getElementsByClassName("price");

    let count = 0;
    for (const element of allPrice) {
        count += parseFloat(element.innerText);
    }
    document.getElementById("add_total").innerText = count.toFixed(2);
};

const silgleProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            alert(`
                Title: ${data.title}
                Price: $${data.price}
                Description: ${data.description}
                Category: ${data.category}
            `);
        });
};

const handleSearch = () => {
    const searchValue = document.getElementById("search_field").value.toLowerCase();
    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue)
    );
    displayProduct(filteredProducts);
};

loadAllproduct();
