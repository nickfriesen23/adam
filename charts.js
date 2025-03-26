/**
 * FiscalFun - Budget Explorer
 * Charts Module - Chart initialization and updates
 */

// Initialize charts
function initializeCharts() {
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

// Update charts based on current view and year
function updateCharts() {
    const year = parseInt(currentYear);
    
    // Update chart types based on current visualization type
    updateChartTypes();
    
    // Update chart data based on current view
    if (currentView === 'overview' || currentView === 'spending') {
        const spendingData = BudgetDataProcessor.getSpendingChartData(year);
        
        if (currentView === 'overview') {
            updateChartData(charts.overview, spendingData);
        }
        
        updateChartData(charts.spending, spendingData);
        updateSpendingTable(year);
    }
    
    if (currentView === 'overview' || currentView === 'revenue') {
        const revenueData = BudgetDataProcessor.getRevenueChartData(year);
        
        updateChartData(charts.revenue, revenueData);
        updateRevenueTable(year);
    }
    
    if (currentView === 'debt') {
        const yearData = BudgetDataProcessor.getYearData(year);
        const debtData = {
            labels: ['National Debt', 'GDP'],
            values: [yearData.overview.nationalDebt, yearData.overview.gdp],
            colors: ['rgba(220, 53, 69, 0.8)', 'rgba(40, 167, 69, 0.8)']
        };
        
        updateChartData(charts.debt, debtData);
        
        const debtHistoryData = BudgetDataProcessor.getDebtHistoryChartData(year);
        charts.debtHistory.data.labels = debtHistoryData.labels;
        charts.debtHistory.data.datasets[0].data = debtHistoryData.values;
        charts.debtHistory.update();
        
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
    console.log('updateChartTypes called');
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
    
    // Only update certain charts based on viz type
    if (charts.overview) {
        console.log('Current visualization type:', currentVizType);
        if (currentVizType === 'treemap') {
            console.log('Creating treemap visualization');
            try {
                createTreemap('main-chart', BudgetDataProcessor.getSpendingChartData(parseInt(currentYear)));
                console.log('Treemap created successfully');
                charts.overview = null; // Remove Chart.js instance
            } catch (error) {
                console.error('Error creating treemap:', error);
            }
        } else if (currentVizType === 'bubble') {
            console.log('Creating bubble chart visualization');
            try {
                createBubbleChart('main-chart', BudgetDataProcessor.getSpendingChartData(parseInt(currentYear)));
                console.log('Bubble chart created successfully');
                charts.overview = null; // Remove Chart.js instance
            } catch (error) {
                console.error('Error creating bubble chart:', error);
            }
        } else {
            // If we previously had a D3 visualization or are switching views, recreate the Chart.js instance
            if (!charts.overview) {
                console.log('Recreating Chart.js instance for', currentVizType);
                try {
                    // Clear any existing D3 visualizations
                    const existingTreemap = document.getElementById('main-chart-treemap');
                    const existingBubble = document.getElementById('main-chart-bubble');
                    
                    if (existingTreemap) {
                        existingTreemap.remove();
                    }
                    
                    if (existingBubble) {
                        existingBubble.remove();
                    }
                    // Get the chart container
                    const chartContainer = document.getElementById('main-chart');
                    if (!chartContainer) {
                        console.error('main-chart element not found');
                        return;
                    }
                    const parentContainer = chartContainer.parentElement;
                    if (!parentContainer) {
                        console.error('Parent container not found');
                        return;
                    }
                    console.log('Chart container:', parentContainer);
                    
                    // Clear previous content but make sure we don't remove the main-chart element
                    while (parentContainer.firstChild) {
                        parentContainer.removeChild(parentContainer.firstChild);
                    }
                    console.log('Cleared chart container content');
                    
                    // Create a new canvas element
                    const canvas = document.createElement('canvas');
                    canvas.id = 'main-chart';
                    parentContainer.appendChild(canvas);
                    console.log('Created new canvas element');
                    
                    const ctx = canvas.getContext('2d');
                    charts.overview = new Chart(ctx, {
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
                    console.log('Chart.js instance recreated successfully');
                } catch (error) {
                    console.error('Error recreating Chart.js instance:', error);
                }
            } else {
                charts.overview.config.type = chartTypeMap[currentVizType] || 'pie';
                
                // Update options based on chart type
                if (currentVizType === 'bar') {
                    charts.overview.options.plugins.legend.position = 'top';
                    charts.overview.options.scales = {
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
                    charts.overview.options.plugins.legend.position = 'right';
                    charts.overview.options.scales = {};
                }
            }
        }
    }
    
    // Do the same for spending and revenue charts if needed
    if (charts.spending) {
        // Only update if not treemap or bubble
        if (currentVizType !== 'treemap' && currentVizType !== 'bubble') {
            charts.spending.config.type = chartTypeMap[currentVizType] || 'pie';
            charts.spending.update();
        }
    }
    
    if (charts.revenue) {
        // Only update if not treemap or bubble
        if (currentVizType !== 'treemap' && currentVizType !== 'bubble') {
            charts.revenue.config.type = chartTypeMap[currentVizType] || 'pie';
            charts.revenue.update();
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