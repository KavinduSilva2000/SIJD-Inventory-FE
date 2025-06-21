        // Authentication Functions
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            showLoading('loginLoading', true);
            
            try {
                const response = await fetch(`${API_BASE_URL}/auth/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok && data.data) {
                    authToken = data.data.token;
                    refreshToken = data.data.refreshToken;
                    
                    localStorage.setItem('authToken', authToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('userEmail', email);
                    
        function logout() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userEmail');
            clearDraftData();
            
            authToken = null;
            refreshToken = null;
            
            document.getElementById('dashboardContainer').style.display = 'none';
            document.getElementById('loginContainer').style.display = 'flex';
            
                        logout();
                        return null;
                    }
                }

                if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        return await response.json();
                    } else {
                        return await response.text();
                    }
                } else {
                    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                    throw new Error(errorData.message || `HTTP ${response.status}`);
                }
            } catch (error) {
                console.error('API call error:', error);
                        setTimeout(() => logout(), 2000);
                    }
                }
            }, 20 * 60 * 1000); // 20 minutes
        }

        // Initialize dashboard
        function initializeDashboard() {
            startRealTimeUpdates();
            startTokenRefreshTimer();
            
            // Add tooltips
            const buttons = document.querySelectorAll('button');
            buttons.forEach(btn => {
                if (btn.textContent.includes('Stock In')) {
                    btn.title = 'Add stock to inventory (Ctrl+I)';
                } else if (btn.textContent.includes('Stock Out')) {
                    btn.title = 'Remove stock from inventory';
                }
            });
        }

        // PWA capabilities
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Service worker registration for offline capability
                navigator.serviceWorker.register('/sw.js').catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }

        // Error handling
        window.addEventListener('unhandledrejection', function(event) {
            console.error('Unhandled promise rejection:', event.reason);