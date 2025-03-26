/**
 * FiscalFun - Budget Explorer
 * Tables Module - Table updates for spending and revenue
 */

// Update spending table
function updateSpendingTable(year) {
    const tableBody = document.getElementById('spending-table-body');
    const spendingData = BudgetDataProcessor.getYearData(year).spending;
    
    let tableHTML = '';
    
    spendingData.forEach(item => {
        const changeClass = item.change > 0 ? 'increase' : (item.change < 0 ? 'decrease' : '');
        const changeSymbol = item.change > 0 ? '+' : '';
        const hasSubDepartments = item.subDepartments && item.subDepartments.length > 0;
        
        // Main department row
        tableHTML += `
            <tr class="department-row ${hasSubDepartments ? 'has-sub' : ''}" data-category="${item.category}">
                <td>
                    ${hasSubDepartments ? '<span class="toggle-btn">+</span> ' : ''}
                    ${item.category}
                </td>
                <td>$${item.amount.toFixed(1)}</td>
                <td>${item.percentage.toFixed(1)}%</td>
                <td class="${changeClass}">${changeSymbol}${item.change ? item.change.toFixed(1) + '%' : 'N/A'}</td>
            </tr>
        `;
        
        // Sub-department rows (initially hidden)
        if (hasSubDepartments) {
            item.subDepartments.forEach(subDept => {
                tableHTML += `
                    <tr class="sub-department-row" data-parent="${item.category}" style="display: none;">
                        <td style="padding-left: 30px;">${subDept.name}</td>
                        <td>$${subDept.amount.toFixed(1)}</td>
                        <td>${subDept.percentage.toFixed(1)}%</td>
                        <td></td>
                    </tr>
                `;
            });
        }
    });
    
    tableBody.innerHTML = tableHTML;
    
    // Add event listeners to toggle buttons
    document.querySelectorAll('.department-row.has-sub .toggle-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const category = this.closest('tr').getAttribute('data-category');
            const subRows = document.querySelectorAll(`.sub-department-row[data-parent="${category}"]`);
            const isExpanded = this.textContent.trim() === '-';
            
            // Toggle visibility
            subRows.forEach(row => {
                row.style.display = isExpanded ? 'none' : 'table-row';
            });
            
            // Update toggle button
            this.textContent = isExpanded ? '+' : '-';
        });
    });
}

// Update revenue table
function updateRevenueTable(year) {
    const tableBody = document.getElementById('revenue-table-body');
    const revenueData = BudgetDataProcessor.getYearData(year).revenue;
    
    let tableHTML = '';
    
    revenueData.forEach(item => {
        const changeClass = item.change > 0 ? 'increase' : (item.change < 0 ? 'decrease' : '');
        const changeSymbol = item.change > 0 ? '+' : '';
        const hasSubSources = item.subSources && item.subSources.length > 0;
        
        // Main revenue source row
        tableHTML += `
            <tr class="revenue-row ${hasSubSources ? 'has-sub' : ''}" data-source="${item.source}">
                <td>
                    ${hasSubSources ? '<span class="toggle-btn">+</span> ' : ''}
                    ${item.source}
                </td>
                <td>$${item.amount.toFixed(1)}</td>
                <td>${item.percentage.toFixed(1)}%</td>
                <td class="${changeClass}">${changeSymbol}${item.change ? item.change.toFixed(1) + '%' : 'N/A'}</td>
            </tr>
        `;
        
        // Sub-source rows (initially hidden)
        if (hasSubSources) {
            item.subSources.forEach(subSource => {
                tableHTML += `
                    <tr class="sub-source-row" data-parent="${item.source}" style="display: none;">
                        <td style="padding-left: 30px;">${subSource.name}</td>
                        <td>$${subSource.amount.toFixed(1)}</td>
                        <td>${subSource.percentage.toFixed(1)}%</td>
                        <td></td>
                    </tr>
                `;
            });
        }
    });
    
    tableBody.innerHTML = tableHTML;
    
    // Add event listeners to toggle buttons
    document.querySelectorAll('.revenue-row.has-sub .toggle-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const source = this.closest('tr').getAttribute('data-source');
            const subRows = document.querySelectorAll(`.sub-source-row[data-parent="${source}"]`);
            const isExpanded = this.textContent.trim() === '-';
            
            // Toggle visibility
            subRows.forEach(row => {
                row.style.display = isExpanded ? 'none' : 'table-row';
            });
            
            // Update toggle button
            this.textContent = isExpanded ? '+' : '-';
        });
    });
}