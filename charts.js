/**
 * FiscalFun - Budget Explorer
 * Charts Module - Chart initialization and updates
 */

// Initialize charts
function initializeCharts() {
    // Make sure we don't have any existing chart instances
    for (const key in charts) {
        if (charts[key]) {
            try {
                charts[key].destroy();
            } catch (error) {
                console.error(`Error destroying chart ${key}:`, error);
            }
            charts[key] = null;
        }
    }
    
    // Overview chart
    const overviewCtx = document.getElementById('main-chart').getContext('2d');
    charts.overview = new Chart(overviewCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const percentage = context.dataset.percentages ? 
                                context.dataset.percentages[context.dataIndex] : 
                                (value / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1);
                            return `${label}: $${value}B (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Spending chart
    const spendingCtx = document.getElementById('spending-chart').getContext('2d');
    charts.spending = new Chart(spendingCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const percentage = context.dataset.percentages ? 
                                context.dataset.percentages[context.dataIndex] : 
                                (value / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1);
                            return `${label}: $${value}B (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Revenue chart
    const revenueCtx = document.getElementById('revenue-chart').getContext('2d');
    charts.revenue = new Chart(revenueCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const percentage = context.dataset.percentages ? 
                                context.dataset.percentages[context.dataIndex] : 
                                (value / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1);
                            return `${label}: $${value}B (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Debt chart
    const debtCtx = document.getElementById('debt-chart').getContext('2d');
    charts.debt = new Chart(debtCtx, {
        type: 'doughnut',
        data: {
            labels: ['Debt', 'GDP'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [
                    'rgba(220, 53, 69, 0.8)',
                    'rgba(40, 167, 69, 0.8)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            return `${label}: $${value.toFixed(1)}T`;
                        }
                    }
                }
            }
        }
    });
    
    // Debt history chart
    const debtHistoryCtx = document.getElementById('debt-history-chart').getContext('2d');
    charts.debtHistory = new Chart(debtHistoryCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'National Debt (Trillions)',
                data: [],
                borderColor: 'rgba(220, 53, 69, 0.8)',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'T';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Debt: $${context.raw.toFixed(1)}T`;
                        }
                    }
                }
            }
        }
    });
    
    // Comparison chart
    const comparisonCtx = document.getElementById('comparison-chart').getContext('2d');
    charts.comparison = new Chart(comparisonCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: '2023',
                    data: [],
                    backgroundColor: 'rgba(67, 97, 238, 0.7)',
                    borderColor: 'rgba(67, 97, 238, 1)',
                    borderWidth: 1
                },
                {
                    label: '2022',
                    data: [],
                    backgroundColor: 'rgba(247, 37, 133, 0.7)',
                    borderColor: 'rgba(247, 37, 133, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.raw;
                            return `${label}: $${value.toFixed(1)}B`;
                        }
                    }
                }
            }
        }
    });
    // Update charts with initial data
    updateCharts();
}

// Initialize fun comparison charts
function initializeFunComparisonCharts() {
    // Bitcoin price chart
    const bitcoinCtx = document.getElementById('bitcoin-chart').getContext('2d');
    charts.bitcoin = new Chart(bitcoinCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Bitcoin Price (USD)',
                data: [],
                borderColor: 'rgba(247, 147, 26, 1)',
                backgroundColor: 'rgba(247, 147, 26, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Price: $${context.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
    
    // Ethereum price chart
    const ethereumCtx = document.getElementById('ethereum-chart').getContext('2d');
    charts.ethereum = new Chart(ethereumCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ethereum Price (USD)',
                data: [],
                borderColor: 'rgba(114, 137, 218, 1)',
                backgroundColor: 'rgba(114, 137, 218, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Price: $${context.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
    
    // Star Trek ships chart
    const starTrekShipsCtx = document.getElementById('starTrek-ships-chart').getContext('2d');
    charts.starTrekShips = new Chart(starTrekShipsCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Ship Cost (Billions USD)',
                data: [],
                backgroundColor: 'rgba(212, 57, 57, 0.7)',
                borderColor: 'rgba(212, 57, 57, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Cost: $${context.raw.toFixed(1)}B`;
                        }
                    }
                }
            }
        }
    });
    
    // Star Trek actors chart
    const starTrekActorsCtx = document.getElementById('starTrek-actors-chart').getContext('2d');
    charts.starTrekActors = new Chart(starTrekActorsCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Salary (Thousands USD per Episode)',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Salary: $${context.raw}K per episode`;
                        }
                    }
                }
            }
        }
    });
    
    // Tesla vehicles chart
    const teslaVehiclesCtx = document.getElementById('tesla-vehicles-chart').getContext('2d');
    charts.teslaVehicles = new Chart(teslaVehiclesCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Base Price (Thousands USD)',
                data: [],
                backgroundColor: 'rgba(231, 29, 54, 0.7)',
                borderColor: 'rgba(231, 29, 54, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Price: $${context.raw.toFixed(2)}K`;
                        }
                    }
                }
            }
        }
    });
    
    // Elon Musk net worth chart
    const elonNetWorthCtx = document.getElementById('elon-networth-chart').getContext('2d');
    charts.elonNetWorth = new Chart(elonNetWorthCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Net Worth (Billions USD)',
                data: [],
                borderColor: 'rgba(0, 0, 0, 1)',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Net Worth: $${context.raw.toFixed(1)}B`;
                        }
                    }
                }
            }
        }
    });
    
    // Religious leaders earnings chart
    const religiousEarningsCtx = document.getElementById('religious-earnings-chart').getContext('2d');
    charts.religiousEarnings = new Chart(religiousEarningsCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Annual Earnings (Millions USD)',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'M';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Earnings: $${context.raw.toFixed(1)}M per year`;
                        }
                    }
                }
            }
        }
    });
    
    // Religious leaders net worth chart
    const religiousNetWorthCtx = document.getElementById('religious-networth-chart').getContext('2d');
    charts.religiousNetWorth = new Chart(religiousNetWorthCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Net Worth (Millions USD)',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.7)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'M';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Net Worth: $${context.raw.toFixed(1)}M`;
                        }
                    }
                }
            }
        }
    });
    
    // Budget vs Star Trek ships chart
    const budgetStarTrekCtx = document.getElementById('budget-starTrek-chart').getContext('2d');
    charts.budgetStarTrek = new Chart(budgetStarTrekCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Cost (Billions USD)',
                data: [],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 205, 86, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 205, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Cost: $${context.raw.toFixed(1)}B`;
                        }
                    }
                }
            }
        }
    });
    
    // Budget vs Tesla chart
    const budgetTeslaCtx = document.getElementById('budget-tesla-chart').getContext('2d');
    charts.budgetTesla = new Chart(budgetTeslaCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Value (Billions USD)',
                data: [],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(231, 29, 54, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(231, 29, 54, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Value: $${context.raw.toFixed(1)}B`;
                        }
                    }
                }
            }
        }
    });
}

// Update charts based on current view and year
function updateCharts() {
    const year = parseInt(currentYear);
    
    // Update chart types based on current visualization type
    updateChartTypes();
    
    // Update chart data based on current view
    if (currentView === 'overview' || currentView === 'spending') {
        const spendingData = BudgetDataProcessor.getSpendingChartData(year);
        
        if (currentView === 'overview' && charts.overview) {
            updateChartData(charts.overview, spendingData);
        }
        
        if (charts.spending) {
            updateChartData(charts.spending, spendingData);
        }
        updateSpendingTable(year);
    }
    
    if (currentView === 'overview' || currentView === 'revenue') {
        const revenueData = BudgetDataProcessor.getRevenueChartData(year);
        
        if (charts.revenue) {
            updateChartData(charts.revenue, revenueData);
        }
        updateRevenueTable(year);
    }
    
    if (currentView === 'debt') {
        const yearData = BudgetDataProcessor.getYearData(year);
        const debtData = {
            labels: ['National Debt', 'GDP'],
            values: [yearData.overview.nationalDebt, yearData.overview.gdp],
            colors: ['rgba(220, 53, 69, 0.8)', 'rgba(40, 167, 69, 0.8)']
        };
        
        if (charts.debt) {
            updateChartData(charts.debt, debtData);
        }
        
        const debtHistoryData = BudgetDataProcessor.getDebtHistoryChartData(year);
        if (charts.debtHistory) {
            charts.debtHistory.data.labels = debtHistoryData.labels;
            charts.debtHistory.data.datasets[0].data = debtHistoryData.values;
            charts.debtHistory.update();
        }
        
        // Update debt metrics
        document.querySelector('.debt-metrics .metric-card:nth-child(1) .metric').textContent =
            `$${yearData.debt.perCitizen.toLocaleString()}`;
        document.querySelector('.debt-metrics .metric-card:nth-child(2) .metric').textContent =
            `${yearData.debt.gdpRatio.toFixed(1)}%`;
        document.querySelector('.debt-metrics .metric-card:nth-child(3) .metric').textContent =
            `$${yearData.debt.interestPayments}B per year`;
    }
    
    if (currentView === 'compare') {
        updateComparisonChart();
        
        // Check if the function exists before calling it
        if (typeof updateFunComparisonCharts === 'function') {
            try {
                updateFunComparisonCharts();
            } catch (error) {
                console.error('Error updating fun comparison charts:', error);
            }
        }
    }
}

// Update chart data
function updateChartData(chart, data) {
    if (!chart) return;
    
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;
    chart.data.datasets[0].backgroundColor = data.colors;
    chart.data.datasets[0].percentages = data.percentages;
    chart.update();
}

// Update chart types based on visualization type
function updateChartTypes() {
    console.log('updateChartTypes called with currentVizType:', currentVizType);
    const chartTypeMap = {
        'pie': 'pie',
        'bar': 'bar'
        // treemap and bubble are handled separately with D3.js
    };
    
    // Store the current visualization type to ensure it persists when switching views
    if (!window.lastVizType) {
        window.lastVizType = {};
    }
    window.lastVizType[currentView] = currentVizType;
    
    // Handle the overview chart
    handleChartTypeChange('main-chart', 'overview');
    
    // Handle the spending chart if we're in the spending view
    if (currentView === 'spending' || currentView === 'overview') {
        handleChartTypeChange('spending-chart', 'spending');
    }
    
    // Handle the revenue chart if we're in the revenue view
    if (currentView === 'revenue' || currentView === 'overview') {
        handleChartTypeChange('revenue-chart', 'revenue');
    }
}

// Helper function to handle chart type changes for a specific chart
function handleChartTypeChange(chartId, chartKey) {
    const chartTypeMap = {
        'pie': 'pie',
        'bar': 'bar'
    };
    
    // Get the chart element and its container
    const chartElement = document.getElementById(chartId);
    if (!chartElement) {
        console.error(`${chartId} element not found`);
        return;
    }
    
    const parentContainer = chartElement.parentElement;
    if (!parentContainer) {
        console.error(`Parent container for ${chartId} not found`);
        return;
    }
    
    // First, destroy any existing Chart.js instance to prevent "Canvas is already in use" errors
    if (charts[chartKey]) {
        console.log(`Destroying existing Chart.js instance for ${chartId}`);
        charts[chartKey].destroy();
        charts[chartKey] = null;
    }
    
    // Handle D3 visualizations (treemap and bubble)
    if (currentVizType === 'treemap' || currentVizType === 'bubble') {
        // Create D3 visualizations for any chart
        try {
            console.log(`Creating ${currentVizType} visualization for ${chartId}`);
            
            // Get the appropriate data based on the chart
            let chartData;
            if (chartId === 'main-chart' || chartId === 'spending-chart') {
                chartData = BudgetDataProcessor.getSpendingChartData(parseInt(currentYear));
            } else if (chartId === 'revenue-chart') {
                chartData = BudgetDataProcessor.getRevenueChartData(parseInt(currentYear));
            } else {
                console.error(`Unknown chart ID: ${chartId}`);
                return;
            }
            
            // Create the appropriate D3 visualization
            if (currentVizType === 'treemap') {
                createTreemap(chartId, chartData);
            } else {
                createBubbleChart(chartId, chartData);
            }
            
            // The D3 visualization functions will handle clearing the container
            // and creating a new canvas element for future Chart.js use
        } catch (error) {
            console.error(`Error creating ${currentVizType} visualization:`, error);
        }
    } else {
        // Handle Chart.js visualizations (pie and bar)
        if (!charts[chartKey]) {
            console.log(`Creating Chart.js instance for ${chartId} as ${currentVizType}`);
            try {
                // Check if we need to clear D3 visualizations
                const existingTreemap = document.getElementById(`${chartId}-treemap`);
                const existingBubble = document.getElementById(`${chartId}-bubble`);
                
                if (existingTreemap) {
                    // If we find a treemap, we need to get its parent and clear it
                    const treeParent = existingTreemap.parentElement;
                    if (treeParent) {
                        treeParent.innerHTML = '';
                    }
                    // Make sure we have a canvas for Chart.js
                    const canvas = document.createElement('canvas');
                    canvas.id = chartId;
                    parentContainer.appendChild(canvas);
                } else if (existingBubble) {
                    // If we find a bubble chart, we need to get its parent and clear it
                    const bubbleParent = existingBubble.parentElement;
                    if (bubbleParent) {
                        bubbleParent.innerHTML = '';
                    }
                    // Make sure we have a canvas for Chart.js
                    const canvas = document.createElement('canvas');
                    canvas.id = chartId;
                    parentContainer.appendChild(canvas);
                }
                
                // Create a new canvas element
                const canvas = document.createElement('canvas');
                canvas.id = chartId;
                parentContainer.appendChild(canvas);
                
                // Create a new Chart.js instance
                const ctx = canvas.getContext('2d');
                charts[chartKey] = new Chart(ctx, {
                    type: chartTypeMap[currentVizType] || 'pie',
                    data: {
                        labels: [],
                        datasets: [{
                            data: [],
                            backgroundColor: [],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: currentVizType === 'bar' ? 'top' : 'right'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const label = context.label || '';
                                        const value = context.raw;
                                        const percentage = context.dataset.percentages ?
                                            context.dataset.percentages[context.dataIndex] :
                                            (value / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1);
                                        return `${label}: $${value}B (${percentage}%)`;
                                    }
                                }
                            }
                        },
                        scales: currentVizType === 'bar' ? {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value + 'B';
                                    }
                                }
                            }
                        } : {}
                    }
                });
                console.log(`Chart.js instance for ${chartId} recreated successfully`);
            } catch (error) {
                console.error(`Error recreating Chart.js instance for ${chartId}:`, error);
            }
        } else {
            // Update existing Chart.js instance
            charts[chartKey].config.type = chartTypeMap[currentVizType] || 'pie';
            
            // Update options based on chart type
            if (currentVizType === 'bar') {
                charts[chartKey].options.plugins.legend.position = 'top';
                charts[chartKey].options.scales = {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'B';
                            }
                        }
                    }
                };
            } else {
                charts[chartKey].options.plugins.legend.position = 'right';
                charts[chartKey].options.scales = {};
            }
            
            // Update the chart
            charts[chartKey].update();
        }
    }
}
// Update comparison chart
function updateComparisonChart() {
    const year1 = document.getElementById('compare-year1').value;
    const year2 = document.getElementById('compare-year2').value;
    const compareType = document.querySelector('.compare-btn.active').getAttribute('data-compare');
    
    const comparisonData = BudgetDataProcessor.compareYears(year1, year2, compareType);
    
                
    if (comparisonData) {
        charts.comparison.data.labels = comparisonData.categories;
        charts.comparison.data.datasets[0].label = year1;
        charts.comparison.data.datasets[0].data = comparisonData.values1;
        charts.comparison.data.datasets[1].label = year2;
        charts.comparison.data.datasets[1].data = comparisonData.values2;
        charts.comparison.update();
    }
}


// Update fun comparison charts
function updateFunComparisonCharts() {
    try {
        console.log("Updating fun comparison charts");
        
        // Update Bitcoin price chart
        const bitcoinData = ComparisonDataProcessor.getBitcoinPriceData();
        if (charts.bitcoin) {
            charts.bitcoin.data.labels = bitcoinData.labels;
            charts.bitcoin.data.datasets[0].data = bitcoinData.values;
            charts.bitcoin.update();
        }
        
        // Update Ethereum price chart
        const ethereumData = ComparisonDataProcessor.getEthereumPriceData();
        if (charts.ethereum) {
            charts.ethereum.data.labels = ethereumData.labels;
            charts.ethereum.data.datasets[0].data = ethereumData.values;
            charts.ethereum.update();
        }
        
        // Update Bitcoin halving table
        const bitcoinHalvingTable = document.getElementById('bitcoin-halving-table').querySelector('tbody');
        if (bitcoinHalvingTable) {
            let tableHTML = '';
            cryptoData.bitcoin.halvings.forEach(halving => {
                tableHTML += `
                    <tr>
                        <td>${halving.date}</td>
                        <td>${halving.block.toLocaleString()}</td>
                        <td>${halving.reward} BTC</td>
                    </tr>
                `;
            });
            bitcoinHalvingTable.innerHTML = tableHTML;
        }
        
        // Update Star Trek ships chart
        const starTrekShipsData = ComparisonDataProcessor.getStarTrekShipCostsData();
        if (charts.starTrekShips) {
            charts.starTrekShips.data.labels = starTrekShipsData.labels;
            charts.starTrekShips.data.datasets[0].data = starTrekShipsData.values;
            charts.starTrekShips.update();
        }
        
        // Update Star Trek actors chart
        const starTrekActorsData = ComparisonDataProcessor.getStarTrekActorSalariesData();
        if (charts.starTrekActors) {
            charts.starTrekActors.data.labels = starTrekActorsData.labels;
            charts.starTrekActors.data.datasets[0].data = starTrekActorsData.values;
            charts.starTrekActors.update();
        }
        
        // Update Tesla vehicles chart
        const teslaVehiclesData = ComparisonDataProcessor.getTeslaVehiclePricesData();
        if (charts.teslaVehicles) {
            charts.teslaVehicles.data.labels = teslaVehiclesData.labels;
            charts.teslaVehicles.data.datasets[0].data = teslaVehiclesData.values;
            charts.teslaVehicles.update();
        }
        
        // Update Elon Musk net worth chart
        const elonNetWorthData = ComparisonDataProcessor.getElonMuskNetWorthData();
        if (charts.elonNetWorth) {
            charts.elonNetWorth.data.labels = elonNetWorthData.labels;
            charts.elonNetWorth.data.datasets[0].data = elonNetWorthData.values;
            charts.elonNetWorth.update();
        }
        
        // Update religious leaders earnings chart
        const religiousEarningsData = ComparisonDataProcessor.getReligiousLeadersEarningsData();
        if (charts.religiousEarnings) {
            charts.religiousEarnings.data.labels = religiousEarningsData.labels;
            charts.religiousEarnings.data.datasets[0].data = religiousEarningsData.values;
            charts.religiousEarnings.update();
        }
        
        // Update religious leaders net worth chart
        const religiousNetWorthData = ComparisonDataProcessor.getReligiousLeadersNetWorthData();
        if (charts.religiousNetWorth) {
            charts.religiousNetWorth.data.labels = religiousNetWorthData.labels;
            charts.religiousNetWorth.data.datasets[0].data = religiousNetWorthData.values;
            charts.religiousNetWorth.update();
        }
        
        // Update budget vs Star Trek ships chart
        const budgetStarTrekData = ComparisonDataProcessor.compareToOtherValues('Defense', 'starTrekShips');
        if (charts.budgetStarTrek && budgetStarTrekData) {
            charts.budgetStarTrek.data.labels = budgetStarTrekData.labels;
            charts.budgetStarTrek.data.datasets[0].data = budgetStarTrekData.values;
            charts.budgetStarTrek.update();
        }
        
        // Update budget vs Tesla chart
        const budgetTeslaData = ComparisonDataProcessor.compareToOtherValues('Defense', 'teslaNetWorth');
        if (charts.budgetTesla && budgetTeslaData) {
            charts.budgetTesla.data.labels = budgetTeslaData.labels;
            charts.budgetTesla.data.datasets[0].data = budgetTeslaData.values;
            charts.budgetTesla.update();
        }
    } catch (error) {
        console.error("Error updating fun comparison charts:", error);
    }
}
