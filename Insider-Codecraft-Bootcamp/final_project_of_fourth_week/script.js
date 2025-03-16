const appContainer = document.createElement("div");
appContainer.id = "app";
appContainer.style.cssText = `
    font-family: 'Arial', sans-serif; 
    text-align: center; 
    padding: 20px; 
    background-color: #f4f7fc; 
    min-height: 100vh;
`;

const header = document.createElement("h1");
header.textContent = "Kullanıcı Listesi";
header.style.cssText = `
    color: #2C3E50; 
    margin-bottom: 20px; 
    font-size: 2rem; 
    font-weight: bold;
`;

const appendLocation = document.createElement("div");
appendLocation.id = "user-container";
appendLocation.style.cssText = `
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    gap: 15px;
`;

appContainer.appendChild(header);
appContainer.appendChild(appendLocation);
document.body.appendChild(appContainer);

const storageKey = "users";
const sessionKey = "buttonUsed";
let userCache = [];

// localStorage güvenliği için kontrol
const safeLocalStorage = {
    getItem: (key) => {
        try {
            const expiry = localStorage.getItem("users_expiry"); 
            const currentTime = new Date().getTime();
            if (expiry && currentTime > parseInt(expiry)) {
                console.warn("Veri süresi dolmuş, yeni veri çekiliyor.");
                localStorage.removeItem(storageKey);
                localStorage.removeItem("users_expiry");
                return null;
            }
            return localStorage.getItem(key);
        } catch (error) {
            console.warn("localStorage erişimi engellendi, alternatif yöntem kullanılıyor.");
            return null;
        }
    },
    setItem: (key, value, expiryDuration = 3600000) => {
        try {
            localStorage.setItem(key, value);
            const expiryTime = new Date().getTime() + expiryDuration;
            localStorage.setItem("users_expiry", expiryTime.toString());
        } catch (error) {
            console.warn("localStorage'a yazılamadı, geçici değişken kullanılıyor.");
        }
    }
};

const fetchUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        safeLocalStorage.setItem(storageKey, JSON.stringify(users), 3600000);
        displayUsers(users);
    } catch (error) {
        console.error("Kullanıcıları çekerken hata oluştu:", error);
    }
};


const displayUsers = users => {
    appendLocation.textContent = "";
    users.forEach(user => {
        const userElement = document.createElement("div");
        userElement.style.cssText = `
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            background: #ffffff; 
            padding: 20px; 
            border-radius: 8px; 
            width: 320px; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        `;
        
        const userText = document.createElement("p");
        userText.textContent = user.name;
        userText.style.cssText = `
            margin: 0; 
            font-weight: bold; 
            font-size: 1.3rem; 
            color: #34495E;
        `;

        const userAddress = document.createElement("p");
        userAddress.textContent = `${user.address.street}, ${user.address.city}`;
        userAddress.style.cssText = `
            margin: 10px 0 0 0; 
            font-size: 1rem; 
            color: #7F8C8D;
            font-style: italic;
        `;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Sil";
        deleteButton.style.cssText = `
            background: #E74C3C; 
            color: white; 
            border: none; 
            padding: 8px 16px; 
            cursor: pointer; 
            border-radius: 5px; 
            font-weight: bold;
            transition: background 0.3s ease;
            margin-top: 15px;
        `;
        deleteButton.onclick = () => deleteUser(user.id);

        deleteButton.onmouseover = () => {
            deleteButton.style.background = "#C0392B";
        };
        deleteButton.onmouseout = () => {
            deleteButton.style.background = "#E74C3C";
        };

        userElement.appendChild(userText);
        userElement.appendChild(userAddress);
        userElement.appendChild(deleteButton);
        appendLocation.appendChild(userElement);
        userElement.onmouseover = () => {
            userElement.style.transform = "scale(1.05)";
        };
        userElement.onmouseout = () => {
            userElement.style.transform = "scale(1)";
        };
    });
    checkUsers();
};
const checkUsers = () => {
    if (appendLocation.children.length === 0) {
        createResetButton();
    }
};
const deleteUser = userId => {
    let users = JSON.parse(safeLocalStorage.getItem(storageKey)) || [];
    users = users.filter(user => user.id !== userId);
    safeLocalStorage.setItem(storageKey, JSON.stringify(users), 3600000);
    displayUsers(users);
};

const createResetButton = () => {
    if (!sessionStorage.getItem(sessionKey)) {
        const button = document.createElement("button");
        button.textContent = "Kullanıcıları Yeniden Getir";
        button.style.cssText = `
            background: #3498DB; 
            color: white; 
            border: none; 
            padding: 12px 20px; 
            cursor: pointer; 
            border-radius: 8px; 
            font-weight: bold;
            font-size: 1rem;
            margin-top: 30px;
            transition: background 0.3s ease;
        `;
        button.onclick = () => {
            fetchUsers();
            sessionStorage.setItem(sessionKey, "true");
            button.remove();
        };

        button.onmouseover = () => {
            button.style.background = "#2980B9";
        };
        button.onmouseout = () => {
            button.style.background = "#3498DB";
        };

        appendLocation.appendChild(button);
    }
};

const observer = new MutationObserver(() => {
    checkUsers();
});
observer.observe(appendLocation, { childList: true });
const storedUsers = safeLocalStorage.getItem(storageKey);
if (storedUsers) {
    displayUsers(JSON.parse(storedUsers));
} else {
    fetchUsers();
}
