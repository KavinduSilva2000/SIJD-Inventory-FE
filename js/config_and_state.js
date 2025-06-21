
        // Configuration
        const API_BASE_URL = 'https://localhost:8080/sijd/api/v1';
        let authToken = localStorage.getItem('authToken');
        let refreshToken = localStorage.getItem('refreshToken');
        let stockChart, activityChart, movementChart, topItemsChart;
        
        // Pagination state
        let currentPage = {
            stock: 0,
        // Data storage
        let allStockData = [];