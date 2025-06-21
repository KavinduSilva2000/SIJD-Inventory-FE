                    loadReports();
                    break;
                default:
                    // Overview tab is loaded by default
                    break;
            }
        }

        // API Functions
        async function apiCall(endpoint, method = 'GET', body = null) {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                };

                const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    method,
                    headers,
                    body: body ? JSON.stringify(body) : null
                });

                if (response.status === 401) {
                    const refreshed = await refreshAuthToken();
                    if (refreshed) {
                        return apiCall(endpoint, method, body);
                    } else {
                initializeCharts();
                updateRecentTransactions();
            } catch (error) {
                console.error('Error loading dashboard data:', error);
        // Chart Functions
        function initializeCharts() {
            initializeStockChart();
            initializeActivityChart();
        }

        async function initializeStockChart() {
            if (!allStockData.length) return;

            const items = allStockData.slice(0, 10);
            const labels = items.map(item => item.itemName);
            const quantities = items.map(item => parseFloat(item.itemQuantity));

            const ctx = document.getElementById('stockChart').getContext('2d');
            
            if (stockChart) stockChart.destroy();

            stockChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: quantities,
                        backgroundColor: [
                            '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
                            '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#16a085'
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.parsed.toFixed(2)} units`;
                                }
                            }
                        }
                    }
                }
            });
        }

        async function initializeActivityChart() {
            const last7Days = [];
        async function loadReports() {
            initializeMovementChart();
            initializeTopItemsChart();
        }

        function initializeMovementChart() {
            const ctx = document.getElementById('movementChart').getContext('2d');
            
            if (movementChart) movementChart.destroy();

            // Calculate monthly data for the last 6 months
            const months = [];