// ============================================
// KAN COFFEE - COMPLETE WORKING JAVASCRIPT
// ============================================

// Global State
let currentUser = null;
let cart = [];
let isLoggedIn = false;

// DOM Elements
const userInfo = document.getElementById('userInfo');
const authButtons = document.getElementById('authButtons');
const username = document.getElementById('username');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const orderNotice = document.getElementById('orderNotice');

// Modals
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const confirmationModal = document.getElementById('confirmationModal');

// Forms
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const checkoutForm = document.getElementById('checkoutForm');

// Menu
const menuItemsContainer = document.getElementById('menuItems');

// Toast
const toast = document.getElementById('toast');

// Menu Data
const menuItems = [
    // Hot Coffee
    { id: 'hc1', name: 'អេស្ប្រេសូ (Espresso)', price: 8000, category: 'hot-coffee', description: 'កាហ្វេដ៏រឹងមាំ សម្រាប់អ្នកដែលចូលចិត្តភាពជូច' },
    { id: 'hc2', name: 'អាមេរិកាណូ (Americano)', price: 9000, category: 'hot-coffee', description: 'អេស្ប្រេសូជាមួយទឹកក្តៅបន្ថែម' },
    { id: 'hc3', name: 'កាហ្វេខ្មៅ (Black Coffee)', price: 8000, category: 'hot-coffee', description: 'កាហ្វេសុទ្ធដោយគ្មានទឹកដោះគោ' },
    { id: 'hc4', name: 'កាប៊ូឈីណូ (Cappuccino)', price: 10000, category: 'hot-coffee', description: 'កាហ្វេជាមួយទឹកដោះគោ និងហ្វុមស្កុម' },
    { id: 'hc5', name: 'ភីលតូ (Flat White)', price: 11000, category: 'hot-coffee', description: 'កាហ្វេដ៏រលូនជាមួយទឹកដោះគោចម្រុះ' },
    
    // Iced Coffee
    { id: 'ic1', name: 'អាមេរិកាណូអ៊ីស (Iced Americano)', price: 10000, category: 'iced-coffee', description: 'អាមេរិកាណូត្រជាក់ជាមួយទឹកកក' },
    { id: 'ic2', name: 'ម៉ូកា អ៊ីស (Iced Mocha)', price: 12000, category: 'iced-coffee', description: 'កាហ្វេត្រជាក់ជាមួយសូកូឡា' },
    { id: 'ic3', name: 'លាតេអ៊ីស (Iced Latte)', price: 11000, category: 'iced-coffee', description: 'កាហ្វេត្រជាក់ជាមួយទឹកដោះគោ' },
    { id: 'ic4', name: 'អេស្ប្រេសូអ៊ីស (Iced Espresso)', price: 9000, category: 'iced-coffee', description: 'អេស្ប្រេសូត្រជាក់សម្រាប់ថ្ងៃក្តៅ' },
    { id: 'ic5', name: 'ខ្លឹមខែអ៊ីស (Iced Coffee with Cream)', price: 12000, category: 'iced-coffee', description: 'កាហ្វេត្រជាក់ជាមួយហ្វុមក្រែម' },
    
    // Food
    { id: 'fd1', name: 'សាំងវិច (Sandwich)', price: 10000, category: 'food', description: 'សាំងវិចដុតស្រស់ៗជាមួយសាច់និងបន្លែ' },
    { id: 'fd2', name: 'ប៊ឺហ្គ័រ (Burger)', price: 15000, category: 'food', description: 'ប៊ឺហ្គ័រសាច់គោជាមួយបន្លែស្រស់' },
    { id: 'fd3', name: 'ផេស្តា (Pasta)', price: 13000, category: 'food', description: 'មាស់ផេស្តាជាមួយសូសដើមអេទ្លាលី' },
    
    // Frappe
    { id: 'fr1', name: 'ម៉ូកាហ្វ្រាប (Mocha Frappe)', price: 12000, category: 'frappe', description: 'កាហ្វេហ្វ្រាបជាមួយសូកូឡា' },
    { id: 'fr2', name: 'លាតេហ្វ្រាប (Latte Frappe)', price: 11000, category: 'frappe', description: 'កាហ្វេហ្វ្រាបជាមួយទឹកដោះគោ' },
    { id: 'fr3', name: 'កាប៊ូហ្វ្រាប (Cappuccino Frappe)', price: 12000, category: 'frappe', description: 'កាប៊ូឈីណូហ្វ្រាបដ៏រលូន' }
];

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data
    loadUserFromStorage();
    loadCartFromStorage();
    
    // Setup UI
    updateUI();
    renderMenu();
    setupEventListeners();
});

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Auth buttons
    loginBtn.addEventListener('click', () => openModal(loginModal));
    registerBtn.addEventListener('click', () => openModal(registerModal));
    logoutBtn.addEventListener('click', handleLogout);
    
    // Cart button
    cartBtn.addEventListener('click', () => {
        updateCartModal();
        openModal(cartModal);
    });
    
    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Modal switches
    document.getElementById('showRegister')?.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    
    document.getElementById('showLogin')?.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    checkoutForm.addEventListener('submit', handleCheckout);
    
    // Cart actions
    document.getElementById('clearCartBtn')?.addEventListener('click', clearCart);
    document.getElementById('checkoutBtn')?.addEventListener('click', function() {
        if (!isLoggedIn) {
            showToast('សូមចូលគណនីដើម្បីបញ្ជាទិញ', 'error');
            openModal(loginModal);
            return;
        }
        
        if (cart.length === 0) {
            showToast('រទេះទិញទទេ', 'error');
            return;
        }
        
        updateCheckoutForm();
        openModal(checkoutModal);
    });
    
    document.getElementById('backToCartBtn')?.addEventListener('click', function() {
        closeModal(checkoutModal);
        updateCartModal();
        openModal(cartModal);
    });
    
    document.getElementById('closeConfirmationBtn')?.addEventListener('click', function() {
        closeModal(confirmationModal);
    });
    
    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterMenu(category);
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close modals on outside click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// ============================================
// USER AUTHENTICATION
// ============================================
function loadUserFromStorage() {
    const savedUser = localStorage.getItem('kanCoffeeUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('សូមបំពេញអ៊ីមែល និងលេខសម្ងាត់', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('kanCoffeeUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        };
        isLoggedIn = true;
        
        localStorage.setItem('kanCoffeeUser', JSON.stringify(currentUser));
        
        updateUI();
        closeModal(loginModal);
        showToast('ចូលគណនីជោគជ័យ!', 'success');
        loginForm.reset();
    } else {
        showToast('អ៊ីមែល ឬ លេខសម្ងាត់មិនត្រឹមត្រូវ', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showToast('សូមបំពេញព័ត៌មានទាំងអស់', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('លេខសម្ងាត់មិនដូចគ្នា', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('លេខសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('kanCoffeeUsers') || '[]');
    if (users.find(u => u.email === email)) {
        showToast('អ៊ីមែលនេះមានរួចហើយ', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        phone: phone,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('kanCoffeeUsers', JSON.stringify(users));
    
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
    };
    isLoggedIn = true;
    
    localStorage.setItem('kanCoffeeUser', JSON.stringify(currentUser));
    
    updateUI();
    closeModal(registerModal);
    showToast('ចុះឈ្មោះជោគជ័យ!', 'success');
    registerForm.reset();
}

function handleLogout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('kanCoffeeUser');
    updateUI();
    showToast('អ្នកបានចាកចេញពីគណនី', 'info');
}

function updateUI() {
    if (isLoggedIn && currentUser) {
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
        username.textContent = currentUser.name;
        orderNotice.style.display = 'none';
    } else {
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
        orderNotice.style.display = 'flex';
    }
    updateCartBadge();
}

// ============================================
// CART FUNCTIONS
// ============================================
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('kanCoffeeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCartToStorage() {
    localStorage.setItem('kanCoffeeCart', JSON.stringify(cart));
}

function addToCart(itemId) {
    if (!isLoggedIn) {
        showToast('សូមចូលគណនីដើម្បីបន្ថែមទំនិញ', 'error');
        openModal(loginModal);
        return;
    }
    
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(ci => ci.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartBadge();
    updateQuantityDisplay(itemId);
    showToast(`បានបន្ថែម ${item.name}`, 'success');
}

function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(ci => ci.id === itemId);
    
    if (itemIndex !== -1) {
        const itemName = cart[itemIndex].name;
        cart.splice(itemIndex, 1);
        saveCartToStorage();
        updateCartBadge();
        updateCartModal();
        updateQuantityDisplay(itemId);
        showToast(`បានដក ${itemName} ចេញ`, 'info');
    }
}

function increaseQuantity(itemId) {
    if (!isLoggedIn) {
        showToast('សូមចូលគណនី', 'error');
        return;
    }
    addToCart(itemId);
}

function decreaseQuantity(itemId) {
    if (!isLoggedIn) return;
    
    const itemIndex = cart.findIndex(ci => ci.id === itemId);
    
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        saveCartToStorage();
        updateCartBadge();
        updateQuantityDisplay(itemId);
        updateCartModal();
    }
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
}

function updateQuantityDisplay(itemId) {
    const qtyElement = document.getElementById(`qty-${itemId}`);
    if (qtyElement) {
        const cartItem = cart.find(ci => ci.id === itemId);
        qtyElement.textContent = cartItem ? cartItem.quantity : 0;
    }
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('តើអ្នកពិតជាចង់សម្អាតរទេះទិញទាំងអស់មែនទេ?')) {
        cart = [];
        saveCartToStorage();
        updateCartBadge();
        updateCartModal();
        showToast('បានសម្អាតរទេះទិញ', 'info');
        
        // Reset all quantity displays
        menuItems.forEach(item => {
            updateQuantityDisplay(item.id);
        });
    }
}

function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItemsContainer || !emptyCart || !cartSummary) return;
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        cartItemsContainer.innerHTML = '';
    } else {
        emptyCart.style.display = 'none';
        cartSummary.style.display = 'block';
        
        // Render cart items
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalItems += item.quantity;
            totalPrice += itemTotal;
            
            const cartItemHTML = `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price.toLocaleString()}៛ x ${item.quantity}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="decreaseQuantity('${item.id}')">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="increaseQuantity('${item.id}')">+</button>
                        </div>
                        <button class="btn btn-outline" onclick="removeFromCart('${item.id}')" style="padding: 5px 10px; font-size: 12px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.innerHTML += cartItemHTML;
        });
        
        // Update summary
        document.getElementById('cartTotalItems').textContent = `${totalItems} ធាតុ`;
        document.getElementById('cartTotalPrice').textContent = `${totalPrice.toLocaleString()}៛`;
        document.getElementById('cartGrandTotal').textContent = `${totalPrice.toLocaleString()}៛`;
    }
}

// ============================================
// MENU FUNCTIONS
// ============================================
function renderMenu() {
    menuItemsContainer.innerHTML = '';
    
    menuItems.forEach(item => {
        const cartItem = cart.find(ci => ci.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        
        const menuItemHTML = `
            <div class="menu-item-card" data-category="${item.category}">
                <div class="menu-item-header">
                    <div class="menu-item-name">${item.name}</div>
                    <div class="menu-item-price">${item.price.toLocaleString()}៛</div>
                </div>
                <div class="menu-item-body">
                    <span class="menu-item-category">${getCategoryName(item.category)}</span>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="decreaseQuantity('${item.id}')">-</button>
                            <span class="quantity-display" id="qty-${item.id}">${quantity}</span>
                            <button class="quantity-btn" onclick="increaseQuantity('${item.id}')">+</button>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart('${item.id}')" id="btn-${item.id}">
                            <i class="fas fa-cart-plus"></i> បន្ថែម
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        menuItemsContainer.innerHTML += menuItemHTML;
    });
    
    updateAddToCartButtons();
}

function updateAddToCartButtons() {
    menuItems.forEach(item => {
        const btn = document.getElementById(`btn-${item.id}`);
        if (btn) {
            if (isLoggedIn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-cart-plus"></i> បន្ថែម';
            } else {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-lock"></i> ចូលគណនី';
            }
        }
    });
}

function filterMenu(category) {
    if (category === 'all') {
        renderMenu();
    } else {
        const filteredItems = menuItems.filter(item => item.category === category);
        menuItemsContainer.innerHTML = '';
        
        filteredItems.forEach(item => {
            const cartItem = cart.find(ci => ci.id === item.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            
            const menuItemHTML = `
                <div class="menu-item-card" data-category="${item.category}">
                    <div class="menu-item-header">
                        <div class="menu-item-name">${item.name}</div>
                        <div class="menu-item-price">${item.price.toLocaleString()}៛</div>
                    </div>
                    <div class="menu-item-body">
                        <span class="menu-item-category">${getCategoryName(item.category)}</span>
                        <p class="menu-item-description">${item.description}</p>
                        <div class="menu-item-actions">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="decreaseQuantity('${item.id}')">-</button>
                                <span class="quantity-display" id="qty-${item.id}">${quantity}</span>
                                <button class="quantity-btn" onclick="increaseQuantity('${item.id}')">+</button>
                            </div>
                            <button class="add-to-cart-btn" onclick="addToCart('${item.id}')" id="btn-${item.id}">
                                <i class="fas fa-cart-plus"></i> បន្ថែម
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            menuItemsContainer.innerHTML += menuItemHTML;
        });
        
        updateAddToCartButtons();
    }
}

function getCategoryName(category) {
    const categories = {
        'hot-coffee': '☕ កាហ្វេក្តៅ',
        'iced-coffee': '🧊 កាហ្វេអ៊ីស',
        'food': '🍴 អាហារ',
        'frappe': '🍧 ហ្វ្រាប'
    };
    return categories[category] || category;
}

// ============================================
// CHECKOUT FUNCTIONS
// ============================================
function updateCheckoutForm() {
    if (!checkoutModal) return;
    
    // Populate user info
    if (currentUser) {
        document.getElementById('checkoutName').value = currentUser.name;
        document.getElementById('checkoutPhone').value = currentUser.phone;
    }
    
    // Update order summary
    const summaryContainer = document.getElementById('checkoutOrderSummary');
    if (!summaryContainer) return;
    
    let total = 0;
    summaryContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        summaryContainer.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>${item.name} x${item.quantity}</span>
                <span>${itemTotal.toLocaleString()}៛</span>
            </div>
        `;
    });
    
    // Add delivery fee
    const deliveryMethod = document.getElementById('deliveryMethod');
    const deliveryFee = deliveryMethod && deliveryMethod.value === 'delivery' ? 2000 : 0;
    
    if (deliveryFee > 0) {
        summaryContainer.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #666;">
                <span>ថ្លៃដឹកជញ្ជូន</span>
                <span>${deliveryFee.toLocaleString()}៛</span>
            </div>
        `;
        total += deliveryFee;
    }
    
    // Add total
    summaryContainer.innerHTML += `
        <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 2px solid #ddd; font-weight: bold;">
            <span>សរុប</span>
            <span>${total.toLocaleString()}៛</span>
        </div>
    `;
}

function handleCheckout(e) {
    e.preventDefault();
    
    const name = document.getElementById('checkoutName').value;
    const phone = document.getElementById('checkoutPhone').value;
    const address = document.getElementById('checkoutAddress').value;
    const deliveryMethod = document.getElementById('deliveryMethod').value;
    const notes = document.getElementById('orderNotes').value;
    
    // Validation
    if (!name || !phone) {
        showToast('សូមបំពេញឈ្មោះ និងលេខទូរស័ព្ទ', 'error');
        return;
    }
    
    if (deliveryMethod === 'delivery' && !address.trim()) {
        showToast('សូមបញ្ចូលអាសយដ្ឋានដឹកជញ្ជូន', 'error');
        return;
    }
    
    // Calculate total
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (deliveryMethod === 'delivery') {
        total += 2000;
    }
    
    // Generate order number
    const orderNumber = 'KC-' + Date.now().toString().slice(-8);
    
    // Create order
    const order = {
        orderNumber: orderNumber,
        customer: {
            name: name,
            phone: phone,
            email: currentUser?.email || '',
            address: address
        },
        deliveryMethod: deliveryMethod,
        notes: notes,
        items: [...cart],
        total: total,
        orderDate: new Date().toISOString(),
        status: 'pending'
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('kanCoffeeOrders') || '[]');
    orders.push(order);
    localStorage.setItem('kanCoffeeOrders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    saveCartToStorage();
    updateCartBadge();
    updateCartModal();
    
    // Show confirmation
    document.getElementById('orderNumber').textContent = orderNumber;
    closeModal(checkoutModal);
    openModal(confirmationModal);
    
    // Show success message
    showToast('ការកម្មង់ជោគជ័យ!', 'success');
    
    // Reset menu quantities
    menuItems.forEach(item => {
        updateQuantityDisplay(item.id);
    });
    
    // Reset checkout form
    checkoutForm.reset();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showToast(message, type = 'info') {
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Make functions available globally
window.addToCart = addToCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeFromCart = removeFromCart;
// Add this function to script.js
function handleCheckoutClick() {
    if (!isLoggedIn) {
        showToast('សូមចូលគណនីដើម្បីបញ្ជាទិញ', 'error');
        openModal(loginModal);
        return;
    }
    
    if (cart.length === 0) {
        showToast('រទេះទិញទទេ', 'error');
        return;
    }
    
    updateCheckoutForm();
    closeModal(cartModal);
    openModal(checkoutModal);
}