                    showNotification('Login successful!', 'success');
                    showDashboard();
                    showNotification(data.message || 'Login failed', 'error');
                }
            } catch (error) {
                console.error('Login error:', error);
                showNotification('Network error. Please try again.', 'error');
            } finally {
                showLoading('loginLoading', false);
            }
        });

            showNotification('Logged out successfully', 'success');
        }

        function showDashboard() {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('dashboardContainer').style.display = 'block';
            document.getElementById('userEmail').textContent = localStorage.getItem('userEmail');
            
            // Initialize dashboard
            setTimeout(initializeDashboard, 100);
        }

        // Tab Management
        function switchTab(tabName) {
            // Remove active class from all tabs and content
            document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to selected tab and content
            event.target.classList.add('active');
            document.getElementById(tabName).classList.add('active');
            
            // Load tab-specific data
            loadTabData(tabName);
        }

        function loadTabData(tabName) {
            switch(tabName) {
                case 'stock-in-history':
                    loadStockInHistory();
                    break;
                case 'stock-out-history':
                    loadStockOutHistory();
                    break;
                case 'reports':
                showNotification(`Error: ${error.message}`, 'error');
                return null;
            }
        }

        async function refreshAuthToken() {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/user/refresh/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: refreshToken })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.data && data.data.token) {
                        authToken = data.data.token;
                        localStorage.setItem('authToken', authToken);
                        return true;
                    }
                }
                return false;
            } catch (error) {
                console.error('Token refresh error:', error);
                return false;
            }
        }

        // Dashboard Data Functions
                showNotification('Error loading data', 'error');
            }
        }

        async function loadCurrentStock(page = 0) {
            const data = await apiCall(`/admin/get/all/current-stock?page=${page}&size=${pageSize}&sortField=itemName&sortDirection=asc`);
            
            if (data && data.content) {
                allStockData = data.content;
                allitemCount = data.totalElements;
                updateStockTable(data);
                updateStockPagination(data, 'stock');
            }
        }

        function updateStockTable(data) {
            const tableBody = document.getElementById('stockTableBody');
            tableBody.innerHTML = '';
            
            data.content.forEach(item => {
                const row = document.createElement('tr');
                const status = getStockStatus(item.itemQuantity);
                
                row.innerHTML = `
                    <td>${item.itemName}</td>
                    <td>${parseFloat(item.itemQuantity).toFixed(2)}</td>
                    <td><span class="status-badge ${status.class}">${status.text}</span></td>
                    <td>${formatDate(item.modifiedDateTime)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-success btn-sm" onclick="quickStockIn('${item.itemName}')" title="Quick Stock In">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="quickStockOut('${item.itemName}')" title="Quick Stock Out">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        async function loadStockInData() {
            const data = await apiCall('/admin/get/all/stock-in?page=0&size=100&sortField=createdDateTime&sortDirection=desc');
            if (data && data.content) {
                    <td>${formatDateTime(item.createdDateTime)}</td>
                    <td>
                        <div class="action-buttons">
                    <td>${formatDateTime(item.createdDateTime)}</td>
                    <td>
                        <div class="action-buttons">
                    <td>${formatDateTime(transaction.createdDateTime)}</td>
                `;
                tableBody.appendChild(row);
            });
        }

                showNotification(result, 'success');
                clearForm();
                clearDraftData();
                    showNotification(result, 'error');
                } else {
                    showNotification(result, 'success');
                    clearForm();
                    clearDraftData();
                    showNotification(result, 'success');
                        showNotification(result, 'error');
                    } else {
                        showNotification(result, 'success');
                showNotification('Please enter a valid quantity', 'warning');
                return;
            }

            const endpoint = type === 'in' ? '/admin/stock/in/edit' : '/admin/stock/out/edit';
            const payload = {
                itemName,
                quantity
            };

            if (type === 'in') {
                showNotification(result, 'success');
                closeEditModal();
                showNotification(result, 'success');
                closeConfirmModal();
        // Utility Functions
        function validateStockForm(itemName, quantity) {
            if (!itemName) {
                showNotification('Please enter an item name', 'warning');
                return false;
            }
            if (!quantity || quantity <= 0) {
                showNotification('Please enter a valid quantity', 'warning');
                return false;
            }
            return true;
        }

        function clearForm() {
            document.getElementById('itemName').value = '';
            document.getElementById('quantity').value = '';
        }

        function refreshData() {
            showNotification('Refreshing data...', 'info');
        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }

        function formatDateTime(dateString) {
            return new Date(dateString).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        }

        function showLoading(elementId, show) {
            const element = document.getElementById(elementId);
            if (element) {
                element.style.display = show ? 'block' : 'none';
            }
        }

        // Export Functions
        function exportData(type) {
            let data, filename, headers;
            
            switch(type) {
                case 'stock':
                    data = document.querySelectorAll('#stockTableBody tr');
                    headers = 'Item Name,Quantity,Status,Last Updated\n';
                    filename = `current_stock_${new Date().toISOString().split('T')[0]}.csv`;
                    break;
                case 'stock-in':
            showNotification(`${type} data exported successfully`, 'success');
        }

        // Auto-save functionality
        function setupFormAutoSave() {
            const itemNameInput = document.getElementById('itemName');
            const quantityInput = document.getElementById('quantity');
            
            itemNameInput.addEventListener('input', () => {
                localStorage.setItem('draftItemName', itemNameInput.value);
            });
            
            quantityInput.addEventListener('input', () => {
                localStorage.setItem('draftQuantity', quantityInput.value);
            });
            
            // Restore draft data
            const draftItemName = localStorage.getItem('draftItemName');
            const draftQuantity = localStorage.getItem('draftQuantity');
            
            if (draftItemName) itemNameInput.value = draftItemName;
            if (draftQuantity) quantityInput.value = draftQuantity;
        }

        function clearDraftData() {
            localStorage.removeItem('draftItemName');
            localStorage.removeItem('draftQuantity');
        }

        // Keyboard shortcuts
        function handleKeyboardShortcuts(e) {
            // Ctrl + I for Stock In
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                document.getElementById('itemName').focus();
            }
            
            // Ctrl + S for Search
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
            
            // Enter to submit stock form
            if (e.key === 'Enter' && (e.target.id === 'itemName' || e.target.id === 'quantity')) {
                e.preventDefault();
                        showNotification('Session expired. Please login again.', 'warning');
            showNotification('An unexpected error occurred', 'error');
        });

        window.addEventListener('error', function(event) {
            console.error('JavaScript error:', event.error);
            showNotification('An unexpected error occurred', 'error');
        });

        // Console welcome message
        console.log('%c🚀 SIJD Inventory Dashboard Loaded!', 'color: #667eea; font-size: 16px; font-weight: bold;');
        console.log('%cKeyboard Shortcuts:', 'color: #333; font-weight: bold;');
        console.log('Ctrl + I: Focus on item name input');
        console.log('Ctrl + S: Focus on search input');
        console.log('Enter: Submit stock form (when in item/quantity fields)');
        console.log('Escape: Close modals');

        // Performance monitoring
        if (window.performance) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
                }, 0);
            });
        }
    