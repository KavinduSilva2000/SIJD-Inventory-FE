                loadDashboardData();
            }
            
            // Add event listeners
            setupEventListeners();
        });

        function setupEventListeners() {
            // Edit form submission
                    loadDashboardData();
                } else {
        async function loadDashboardData() {
            try {
                await Promise.all([
                    loadCurrentStock(),
                    loadStockInData(),
                    loadStockOutData(),
                    loadItemsList()
                ]);
                
                updateStats();
        function updateStats() {
            const totalItems = allitemCount;
            const lowStockItems = allStockData.filter(item => item.itemQuantity < 10).length;
            
            document.getElementById('totalItems').textContent = totalItems;
            document.getElementById('lowStockItems').textContent = lowStockItems;

            // Calculate today's transactions
            const today = new Date().toDateString();
                loadDashboardData();
            }
        }

                    loadDashboardData();
                }
            }
        }

        async function quickStockIn(itemName) {
            const quantity = prompt(`Enter quantity to add for ${itemName}:`);
            if (quantity && !isNaN(quantity) && parseFloat(quantity) > 0) {
                const result = await apiCall('/admin/stock/in', 'POST', {
                    itemName,
                    quantity: parseFloat(quantity)
                });

                if (result) {
                    loadDashboardData();
                }
            }
        }

        async function quickStockOut(itemName) {
            const quantity = prompt(`Enter quantity to remove for ${itemName}:`);
            if (quantity && !isNaN(quantity) && parseFloat(quantity) > 0) {
                const result = await apiCall('/admin/stock/out', 'POST', {
                    itemName,
                    quantity: parseFloat(quantity)
                });

                if (result) {
                    if (result.includes('Insufficient stock') || result.includes('not found')) {
                        loadDashboardData();
                    }
                }
            }
        }

        // Edit and Delete Functions
                loadDashboardData();
                
                // Refresh the current tab data
                const activeTab = document.querySelector('.nav-tab.active').textContent.toLowerCase();
                if (activeTab.includes('stock in')) {
                loadDashboardData();
                
                // Refresh the current tab data
                const activeTab = document.querySelector('.nav-tab.active').textContent.toLowerCase();
                if (activeTab.includes('stock in')) {
            loadDashboardData();
        }

        function getStockStatus(quantity) {
            const qty = parseFloat(quantity);
            if (qty === 0) {
                return { class: 'out-of-stock', text: 'Out of Stock' };
            } else if (qty < 10) {
                return { class: 'low-stock', text: 'Low Stock' };
            } else {
                return { class: 'in-stock', text: 'In Stock' };
            }
        }

                    loadDashboardData();
                }
            }, 30000); // Update every 30 seconds
        }

        // Token refresh timer
        function startTokenRefreshTimer() {
            setInterval(async () => {
                if (refreshToken) {
                    const refreshed = await refreshAuthToken();
                    if (!refreshed) {