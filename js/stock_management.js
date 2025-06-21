            stockIn: 0,
            stockOut: 0
        };
        const pageSize = 10;

        let stockInData = [];
        let stockOutData = [];
        let allitemCount ;

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            if (authToken) {
                showDashboard();
            document.getElementById('editStockForm').addEventListener('submit', handleEditSubmit);
            
            // Modal close on outside click
            document.getElementById('editStockModal').addEventListener('click', function(e) {
                if (e.target === this) closeEditModal();
            });
            
            document.getElementById('confirmModal').addEventListener('click', function(e) {
                if (e.target === this) closeConfirmModal();
            });
            
            // Keyboard shortcuts
            document.addEventListener('keydown', handleKeyboardShortcuts);
            
            // Form auto-save
            setupFormAutoSave();
        }

                stockInData = data.content;
            }
        }

        async function loadStockOutData() {
            const data = await apiCall('/admin/get/all/stock-out?page=0&size=100&sortField=createdDateTime&sortDirection=desc');
            if (data && data.content) {
                stockOutData = data.content;
            }
        }

        async function loadStockInHistory(page = 0) {
            const data = await apiCall(`/admin/get/all/stock-in?page=${page}&size=${pageSize}&sortField=createdDateTime&sortDirection=desc`);
            
            if (data && data.content) {
                updateStockInTable(data);
                updateStockPagination(data, 'stockIn');
            }
        }

        function updateStockInTable(data) {
            const tableBody = document.getElementById('stockInTableBody');
            tableBody.innerHTML = '';
            
            data.content.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>#${item.itemId}</td>
                    <td>${item.itemName}</td>
                    <td>${parseFloat(item.itemQuantity).toFixed(2)}</td>
                    <td>${item.createdUser}</td>
                            <button class="btn btn-info btn-sm" onclick="editStock(${item.itemId}, 'in', '${item.itemName}', ${item.itemQuantity})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteStock(${item.itemId}, 'in')" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        async function loadStockOutHistory(page = 0) {
            const data = await apiCall(`/admin/get/all/stock-out?page=${page}&size=${pageSize}&sortField=createdDateTime&sortDirection=desc`);
            
            if (data && data.content) {
                updateStockOutTable(data);
                updateStockPagination(data, 'stockOut');
            }
        }

        function updateStockOutTable(data) {
            const tableBody = document.getElementById('stockOutTableBody');
            tableBody.innerHTML = '';
            
            data.content.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>#${item.itemId}</td>
                    <td>${item.itemName}</td>
                    <td>${parseFloat(item.itemQuantity).toFixed(2)}</td>
                    <td>${item.createdUser}</td>
                            <button class="btn btn-info btn-sm" onclick="editStock(${item.itemId}, 'out', '${item.itemName}', ${item.itemQuantity})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteStock(${item.itemId}, 'out')" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        function updateRecentTransactions() {
            const transactions = [
                ...stockInData.slice(0, 10).map(item => ({...item, type: 'Stock In'})),
                ...stockOutData.slice(0, 10).map(item => ({...item, type: 'Stock Out'}))
            ].sort((a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime)).slice(0, 10);

            const tableBody = document.getElementById('recentTransactionsBody');
            tableBody.innerHTML = '';

            transactions.forEach(transaction => {
                const row = document.createElement('tr');
                const typeColor = transaction.type === 'Stock In' ? 'var(--success-color)' : 'var(--danger-color)';
                
                row.innerHTML = `
                    <td style="color: ${typeColor}; font-weight: 600">
                        <i class="fas fa-${transaction.type === 'Stock In' ? 'arrow-up' : 'arrow-down'}"></i>
                        ${transaction.type}
                    </td>
                    <td>${transaction.itemName}</td>
                    <td>${parseFloat(transaction.itemQuantity).toFixed(2)}</td>
                    <td>${transaction.createdUser}</td>
            const stockInToday = stockInData.filter(item => 
                new Date(item.createdDateTime).toDateString() === today
            ).length;
            const stockOutToday = stockOutData.filter(item => 
                new Date(item.createdDateTime).toDateString() === today
            ).length;

            document.getElementById('stockInToday').textContent = stockInToday;
            document.getElementById('stockOutToday').textContent = stockOutToday;
        }

        async function loadItemsList() {
            const data = await apiCall('/admin/get/all/current-stock?page=0&size=1000');
            if (data && data.content) {
                const datalist = document.getElementById('itemsList');
                datalist.innerHTML = '';
                
                data.content.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.itemName;
                    datalist.appendChild(option);
                });
            }
        }

        // Stock Management Functions
        async function stockIn() {
            const itemName = document.getElementById('itemName').value.trim();
            const quantity = parseFloat(document.getElementById('quantity').value);

            if (!validateStockForm(itemName, quantity)) return;

            const result = await apiCall('/admin/stock/in', 'POST', {
                itemName,
                quantity
            });

            if (result) {
        async function stockOut() {
            const itemName = document.getElementById('itemName').value.trim();
            const quantity = parseFloat(document.getElementById('quantity').value);

            if (!validateStockForm(itemName, quantity)) return;

            const result = await apiCall('/admin/stock/out', 'POST', {
                itemName,
                quantity
            });

            if (result) {
                if (result.includes('Insufficient stock') || result.includes('not found')) {
        function editStock(id, type, itemName, quantity) {
            document.getElementById('editStockId').value = id;
            document.getElementById('editStockType').value = type;
            document.getElementById('editItemName').value = itemName;
            document.getElementById('editQuantity').value = quantity;
            document.getElementById('editModalTitle').textContent = `Edit Stock ${type === 'in' ? 'In' : 'Out'} Record`;
            
            document.getElementById('editStockModal').classList.add('show');
        }

        async function handleEditSubmit(e) {
            e.preventDefault();
            
            const id = document.getElementById('editStockId').value;
            const type = document.getElementById('editStockType').value;
            const itemName = document.getElementById('editItemName').value;
            const quantity = parseFloat(document.getElementById('editQuantity').value);

            if (!quantity || quantity <= 0) {
                payload.stockInId = parseInt(id);
            } else {
                payload.stockOutId = parseInt(id);
            }

            const result = await apiCall(endpoint, 'PUT', payload);

            if (result) {
                    loadStockInHistory(currentPage.stockIn);
                } else if (activeTab.includes('stock out')) {
                    loadStockOutHistory(currentPage.stockOut);
                }
            }
        }

        function deleteStock(id, type) {
            const message = `Are you sure you want to delete this stock ${type === 'in' ? 'in' : 'out'} record? This action cannot be undone.`;
                    loadStockInHistory(currentPage.stockIn);
                } else if (activeTab.includes('stock out')) {
                    loadStockOutHistory(currentPage.stockOut);
                }
            }
        }

            document.getElementById('editStockModal').classList.remove('show');
            document.getElementById('editStockForm').reset();
        }

                case 'stockIn':
                    loadStockInHistory(page);
                    break;
                case 'stockOut':
                    loadStockOutHistory(page);
                    break;
            }
        }

        // Search Functions
        function searchItems() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const tableRows = document.querySelectorAll('#stockTableBody tr');

            tableRows.forEach(row => {
                const itemName = row.cells[0].textContent.toLowerCase();
                if (itemName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

            const stockInCounts = [];
            const stockOutCounts = [];

            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = date.toDateString();
                
                last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
                
                const stockInCount = stockInData.filter(item => 
                    new Date(item.createdDateTime).toDateString() === dateStr
                ).length;
                
                const stockOutCount = stockOutData.filter(item => 
                    new Date(item.createdDateTime).toDateString() === dateStr
                ).length;
                
                stockInCounts.push(stockInCount);
                stockOutCounts.push(stockOutCount);
            }

            const ctx = document.getElementById('activityChart').getContext('2d');
            
            if (activityChart) activityChart.destroy();

            activityChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: last7Days,
                    datasets: [{
                        label: 'Stock In',
                        data: stockInCounts,
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#27ae60',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }, {
                        label: 'Stock Out',
                        data: stockOutCounts,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#e74c3c',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 10,
                            displayColors: true
                        }
                    }
                }
            });
        }

            const stockInData_monthly = [];
            const stockOutData_monthly = [];

            for (let i = 5; i >= 0; i--) {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                const monthStr = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                months.push(monthStr);

                const monthStockIn = stockInData.filter(item => {
                    const itemDate = new Date(item.createdDateTime);
                    return itemDate.getMonth() === date.getMonth() && itemDate.getFullYear() === date.getFullYear();
                }).reduce((sum, item) => sum + parseFloat(item.itemQuantity), 0);

                const monthStockOut = stockOutData.filter(item => {
                    const itemDate = new Date(item.createdDateTime);
                    return itemDate.getMonth() === date.getMonth() && itemDate.getFullYear() === date.getFullYear();
                }).reduce((sum, item) => sum + parseFloat(item.itemQuantity), 0);

                stockInData_monthly.push(monthStockIn);
                stockOutData_monthly.push(monthStockOut);
            }

            movementChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Stock In',
                        data: stockInData_monthly,
                        backgroundColor: 'rgba(39, 174, 96, 0.8)',
                        borderColor: '#27ae60',
                        borderWidth: 1
                    }, {
                        label: 'Stock Out',
                        data: stockOutData_monthly,
                        backgroundColor: 'rgba(231, 76, 60, 0.8)',
                        borderColor: '#e74c3c',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff'
                        }
                    }
                }
            });
        }

        function initializeTopItemsChart() {
            const ctx = document.getElementById('topItemsChart').getContext('2d');
            
            if (topItemsChart) topItemsChart.destroy();

            // Get top 5 items by quantity
            const topItems = allStockData
                .sort((a, b) => parseFloat(b.itemQuantity) - parseFloat(a.itemQuantity))
                .slice(0, 5);

            const labels = topItems.map(item => item.itemName);
            const quantities = topItems.map(item => parseFloat(item.itemQuantity));

            topItemsChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Quantity',
                        data: quantities,
                        backgroundColor: [
                            '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'
                        ],
                        borderColor: [
                            '#2980b9', '#c0392b', '#27ae60', '#e67e22', '#8e44ad'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff'
                        }
                    }
                }
            });
        }

                    data = document.querySelectorAll('#stockInTableBody tr');
                    headers = 'ID,Item,Quantity,User,Date\n';
                    filename = `stock_in_history_${new Date().toISOString().split('T')[0]}.csv`;
                    break;
                case 'stock-out':
                    data = document.querySelectorAll('#stockOutTableBody tr');
                    headers = 'ID,Item,Quantity,User,Date\n';
                    filename = `stock_out_history_${new Date().toISOString().split('T')[0]}.csv`;
                    break;
                default:
                    return;
            }
            
            let csv = headers;
            
            data.forEach(row => {
                const cells = row.querySelectorAll('td');
                const rowData = Array.from(cells)
                    .slice(0, -1) // Remove actions column
                    .map(cell => cell.textContent.replace(/,/g, ';'))
                    .join(',');
                csv += rowData + '\n';
            });
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            
                stockIn();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                closeEditModal();
                closeConfirmModal();
            }
        }

        // Real-time updates
        function startRealTimeUpdates() {
            setInterval(() => {
                if (authToken && document.getElementById('dashboardContainer').style.display !== 'none') {