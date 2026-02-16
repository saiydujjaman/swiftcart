
// active or remove
removeActive = () => {
    const removeActive = document.querySelectorAll('.removeActive')
    removeActive.forEach(btn => btn.classList.remove('active'))
}



// loader
const loader = (status) => {
    if (status == true) {
        document.getElementById('loader').classList.remove('hidden')
        document.getElementById('all-products').classList.add('hidden')

    } else {
        document.getElementById('loader').classList.add('hidden')
        document.getElementById('all-products').classList.remove('hidden')
    }
}


const allCategory = () => {
    const url = fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => displayCategory(data))
}

// product
const allProduct = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {

            displayAllProducts(data)
        })
}

//category product function
const categoryProducts = (category) => {
    loader(true)
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => displayAllProducts(data))


}

// display all product
const displayAllProducts = (products) => {
    // console.log(products)
    const allProduct = document.getElementById('all-products')
    allProduct.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement('div')
        productDiv.innerHTML = `
        <div class="card bg-base-100 shadow-md border">

                    <!-- Image -->
                    <figure class="bg-gray-100 p-10 h-64">
                        <img src=${product.image} class="w-52 h-full object-contain" />
                    </figure>

                    <div class="card-body">

                        <!-- Category + Rating -->
                        <div class="flex justify-between items-center">
                            <span class="badge badge-primary badge-outline">
                               ${product.category}
                            </span>

                            <div class="flex items-center gap-1 text-sm text-gray-500">
                                <i class="fa-solid fa-star text-warning"></i> 
                                <button className="btn">${product.rating.rate}</button>
                                <button className="btn">${product.rating.count}</button>
                            </div>
                        </div>

                        <!-- Title -->
                        <h3 class="font-semibold text-lg">
                            ${product.title}
                        </h3>

                        <!-- Price -->
                        <p class="text-xl font-bold">$${product.price}</p>

                        <!-- Buttons -->
                        <div class="flex gap-4 mt-4">
                            <button class="btn btn-outline flex-1">
                                <i class="fa-solid fa-eye"></i> Details
                            </button>
                            <button class="btn btn-primary flex-1">
                                <i class="fa-solid fa-cart-shopping"></i> Add
                            </button>
                        </div>

                    </div>
                </div>
        `
        allProduct.append(productDiv)
        loader(false)
    })


}

allProduct()

// display Category list
const displayCategory = (categorys) => {

    const categories = document.getElementById('category')
    categories.innerHTML = " "
    categorys.forEach(category => {
        // console.log(category)
        const btn = document.createElement('button')
        btn.className = "btn btn-outline btn-primary px-4 rounded-xl removeActive"
        btn.innerText = `${category}`
        btn.addEventListener("click", () => {
            removeActive()
            btn.classList.add('active')
            categoryProducts(`${category}`)
        })
        categories.append(btn)
    })
}






allCategory()










