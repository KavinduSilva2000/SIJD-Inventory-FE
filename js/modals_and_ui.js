            showConfirmModal(message, () => confirmDeleteStock(id, type));
        }

        async function confirmDeleteStock(id, type) {
            const endpoint = type === 'in' ? `/admin/stock/in/delete/${id}` : `/admin/stock/out/delete/${id}`;
            
            const result = await apiCall(endpoint, 'DELETE');

            if (result) {
        // Modal Functions
        function closeEditModal() {
        function showConfirmModal(message, callback) {
            document.getElementById('confirmMessage').textContent = message;
            document.getElementById('confirmButton').onclick = callback;
            document.getElementById('confirmModal').classList.add('show');
        }

        function closeConfirmModal() {
            document.getElementById('confirmModal').classList.remove('show');
        }

        // Pagination Functions
        function updateStockPagination(data, type) {
            const paginationContainer = document.getElementById(`${type}Pagination`);
            if (!paginationContainer) return;
            
            paginationContainer.innerHTML = '';
            
            const totalPages = data.totalPages;
            const currentPageNum = data.number;
            
            // Previous button
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.disabled = currentPageNum === 0;
            prevBtn.onclick = () => changePage(type, currentPageNum - 1);
            paginationContainer.appendChild(prevBtn);
            
            // Page numbers
            const startPage = Math.max(0, currentPageNum - 2);
            const endPage = Math.min(totalPages - 1, currentPageNum + 2);
            
            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i + 1;
                pageBtn.className = i === currentPageNum ? 'active' : '';
                pageBtn.onclick = () => changePage(type, i);
                paginationContainer.appendChild(pageBtn);
            }
            
            // Next button
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.disabled = currentPageNum === totalPages - 1;
            nextBtn.onclick = () => changePage(type, currentPageNum + 1);
            paginationContainer.appendChild(nextBtn);
        }

        function changePage(type, page) {
            currentPage[type] = page;
            
            switch(type) {
                case 'stock':
                    loadCurrentStock(page);
                    break;