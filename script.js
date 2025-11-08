const resources = [
    { 
        id: 1, 
        title: 'Cybersecurity Basics', 
        icon: '🔒', 
        description: 'Learn the fundamentals of cybersecurity', 
        url: 'https://www.youtube.com/watch?v=inWWhr5tnEA' 
    },
    { 
        id: 2, 
        title: 'Full Stack Development', 
        icon: '💻', 
        description: 'Complete guide to FSD', 
        url: 'https://www.youtube.com/watch?v=nu_pCVPKzTk' 
    },
    { 
        id: 3, 
        title: 'Artificial Intelligence', 
        icon: '🤖', 
        description: 'Introduction to AI concepts', 
        url: 'https://www.youtube.com/watch?v=ad79nYk2keg' 
    },
    { 
        id: 4, 
        title: 'Machine Learning', 
        icon: '🧠', 
        description: 'ML fundamentals explained', 
        url: 'https://www.youtube.com/watch?v=ukzFI9rgwfU' 
    },
    { 
        id: 5, 
        title: 'Data Analytics', 
        icon: '📊', 
        description: 'Master data analysis techniques', 
        url: 'https://www.youtube.com/watch?v=yZvFH7B6gKI' 
    },
    { 
        id: 6, 
        title: 'Cloud Computing', 
        icon: '☁️', 
        description: 'Understanding cloud platforms', 
        url: 'https://www.youtube.com/watch?v=M988_fsOSWo' 
    }
];

const courses = [
    { 
        id: 1, 
        title: 'Advanced Cybersecurity', 
        icon: '🛡️', 
        description: 'Master ethical hacking and security', 
        price: 49.99 
    },
    { 
        id: 2, 
        title: 'Full Stack Mastery', 
        icon: '🚀', 
        description: 'Become a full stack expert', 
        price: 79.99 
    },
    { 
        id: 3, 
        title: 'AI & Deep Learning', 
        icon: '🧬', 
        description: 'Advanced AI techniques', 
        price: 99.99 
    },
    { 
        id: 4, 
        title: 'Machine Learning Pro', 
        icon: '⚡', 
        description: 'Professional ML course', 
        price: 89.99 
    },
    { 
        id: 5, 
        title: 'Data Science Complete', 
        icon: '📈', 
        description: 'Complete data science bootcamp', 
        price: 69.99 
    },
    { 
        id: 6, 
        title: 'DevOps Engineering', 
        icon: '⚙️', 
        description: 'Master DevOps practices', 
        price: 59.99 
    }
];

let cart = [];
let isLoggedIn = false;
let currentUser = null;

// Initialize
function init() {
    renderResources();
    renderCourses();
    updateCartDisplay();
}

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    if (pageId === 'checkout') {
        if (!isLoggedIn) {
            alert('Please login to proceed to checkout');
            showPage('login');
            return;
        }
        if (cart.length === 0) {
            alert('Your cart is empty');
            showPage('cart');
            return;
        }
        renderCheckoutSummary();
    }
}

// Render Resources
function renderResources() {
    const grid = document.getElementById('resourcesGrid');
    grid.innerHTML = resources.map(resource => `
        <div class="resource-card" onclick="window.open('${resource.url}', '_blank')">
            <div class="resource-icon">${resource.icon}</div>
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <button class="btn-primary" style="width: 100%;">Watch Now →</button>
        </div>
    `).join('');
}

// Render Courses
function renderCourses() {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-icon">${course.icon}</div>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-price">$${course.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${course.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Cart Functions
function addToCart(courseId) {
    if (!isLoggedIn) {
        alert('Please login to add courses to cart');
        showPage('login');
        return;
    }
    
    const course = courses.find(c => c.id === courseId);
    const existing = cart.find(item => item.id === courseId);
    
    if (existing) {
        alert('This course is already in your cart');
        return;
    }
    
    cart.push(course);
    updateCartDisplay();
    alert('Course added to cart!');
}

function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    updateCartDisplay();
    renderCart();
}

function updateCartDisplay() {
    document.getElementById('cartCount').textContent = cart.length;
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><h2>Your cart is empty</h2><p>Add some courses to get started!</p></div>';
        cartSummary.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
        cartSummary.style.display = 'block';
    }
}

function renderCheckoutSummary() {
    const summary = document.getElementById('checkoutSummary');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    summary.innerHTML = `
        <h2>Order Summary</h2>
        ${cart.map(item => `
            <div class="checkout-item">
                <span>${item.title}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `).join('')}
        <div class="cart-total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

// Authentication
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    isLoggedIn = true;
    currentUser = username;
    
    document.getElementById('userName').textContent = `Welcome, ${username}!`;
    document.getElementById('userInfo').classList.add('active');
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('registerBtn').style.display = 'none';
    
    alert('Login successful!');
    showPage('home');
}

function handleRegister(e) {
    e.preventDefault();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    const username = document.getElementById('regUsername').value;
    isLoggedIn = true;
    currentUser = username;
    
    document.getElementById('userName').textContent = `Welcome, ${username}!`;
    document.getElementById('userInfo').classList.add('active');
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('registerBtn').style.display = 'none';
    
    alert('Registration successful!');
    showPage('home');
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    cart = [];
    
    document.getElementById('userInfo').classList.remove('active');
    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('registerBtn').style.display = 'inline-block';
    
    updateCartDisplay();
    alert('Logged out successfully!');
    showPage('home');
}

function placeOrder(e) {
    e.preventDefault();
    
    document.getElementById('successMessage').classList.add('active');
    document.getElementById('checkoutForm').style.display = 'none';
    
    setTimeout(() => {
        cart = [];
        updateCartDisplay();
        document.getElementById('successMessage').classList.remove('active');
        document.getElementById('checkoutForm').style.display = 'block';
        document.getElementById('checkoutForm').reset();
        showPage('home');
    }, 3000);
}

// Initialize app
init();
