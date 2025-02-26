const user = {
    name: prompt("Adınız nedir?"),
    age: prompt("Yaşınız kaç?"),
    job: prompt("Mesleğiniz nedir?")
};

document.getElementById("userInfo").innerText = `Ad: ${user.name}, Yaş: ${user.age}, Meslek: ${user.job}`;

const cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerText = `${item.product} - ${item.price} TL `;
        
        let removeButton = document.createElement("button");
        removeButton.innerText = "Sil";
        removeButton.onclick = () => removeFromCart(index); 

        li.appendChild(removeButton);
        cartList.appendChild(li);
    });

    let total = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById("totalPrice").innerText = `Toplam Fiyat: ${total} TL`;
}
while (true) {
    let productName = prompt("Sepete eklemek istediğiniz ürünü yazın (Çıkmak için 'q' yazın):");
    if (productName.toLowerCase() === 'q') break;

    let price = parseFloat(prompt("Ürünün fiyatı:"));
    if (!isNaN(price) && price > 0) {
        addToCart(productName, price);
    } else {
        alert("Geçersiz fiyat girdiniz.");
    }
}
