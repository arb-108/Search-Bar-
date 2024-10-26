const url = "https://fakestoreapi.com/products";
(async () => {
  const fetchdata = async () => {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      return error;
    }
  };
  const generateCard=(product)=>{
    return `<div class="card">
    <div class="image">
        <img src="${product.image}" alt="">
    </div>
    <div class="content">
        <h2>${product.title.split(" ").slice(0,10).join(" ")}</h2>
        <p>${product.description.split(" ").slice(0,15).join(" ")}</p>
            <button>$${product.price}</button>
        
    </div>
</div>`
  }
  const Allproducts = await fetchdata();
  console.log(Allproducts);
  const renderProducts = (products) => {
    const containerEl=document.getElementById("container");
    containerEl.innerHTML="";
    products.forEach((product) => {
        containerEl.innerHTML +=generateCard(product);
    });
  };
  renderProducts(Allproducts);
  const checkText=(text,searchText)=>{
    return text.toString().toLowerCase().includes(searchText);
  };
  const searchEl=document.getElementById("searchID");
  const filterhandler=(event)=>{
    const searchtext=event.target.value.toLowerCase();
    const filered=Allproducts.filter((element)=>{
        return ( 
            checkText(element.title, searchtext) ||
            checkText(element.price,searchtext) ||
            checkText(element.description,searchtext)
        );
    });
    renderProducts(filered);
    console.log(searchtext);
  }
searchEl.addEventListener("keyup",filterhandler);
})();

