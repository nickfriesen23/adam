/**
 * FiscalFun - Budget Explorer
 * Main Script
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Global variables
let currentView = 'overview';
let currentYear = '2023';
let currentVizType = 'pie';
let charts = {}; // Store chart instances

// Initialize the application
function initApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize the views
    updateView('overview');
    
    // Initialize charts
    initializeCharts();
    
    // Start the fact carousel
    initFactCarousel();
    
    // Initialize search
    initSearch();
}

// Set up event listeners
function setupEventListeners() {
    // Navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const view = this.getAttribute('data-view');
            updateView(view);
            
            // Update active state
            document.querySelectorAll('nav a').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Year selector
    document.getElementById('year').addEventListener('change', function() {
        currentYear = this.value;
        updateCharts();
        updateStats();
    });
    
    // Visualization type buttons
    document.querySelectorAll('.viz-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentVizType = this.getAttribute('data-type');
            
            // Update active state
            document.querySelectorAll('.viz-btn').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            updateCharts();
        });
    });
    
    // Comparison year selectors
    document.getElementById('compare-year1').addEventListener('change', updateComparisonChart);
    document.getElementById('compare-year2').addEventListener('change', updateComparisonChart);
    
    // Comparison type buttons
    document.querySelectorAll('.compare-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.compare-btn').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            updateComparisonChart();
        });
    });
    
    // Fact carousel controls
    document.querySelector('.prev-fact').addEventListener('click', showPreviousFact);
    document.querySelector('.next-fact').addEventListener('click', showNextFact);
}

// Update the current view
function updateView(view) {
    currentView = view;
    
    // Hide all views
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    
    // Show the selected view
    document.getElementById(`${view}-view`).classList.add('active');
    
    // Update charts for the view
    updateCharts();
    
    // Update stats
    updateStats();
}

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
    const chartTypeMap = {
        'pie': 'pie',
        'bar': 'bar',
        'treemap': 'treemap',
        'bubble': 'bubble'
    };
    
    // Only update certain charts based on viz type
    if (charts.overview) {
        if (currentVizType === 'treemap') {
            createTreemap('main-chart', BudgetDataProcessor.getSpendingChartData(parseInt(currentYear)));
            charts.overview = null; // Remove Chart.js instance
        } else if (currentVizType === 'bubble') {
            createBubbleChart('main-chart', BudgetDataProcessor.getSpendingChartData(parseInt(currentYear)));
            charts.overview = null; // Remove Chart.js instance
        } else {
            // If we previously had a D3 visualization, recreate the Chart.js instance
            if (!charts.overview) {
                const ctx = document.getElementById('main-chart').getContext('2d');
                document.getElementById('main-chart').innerHTML = '';
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
        charts.spending.config.type = chartTypeMap[currentVizType] || 'pie';
        charts.spending.update();
    }
    
    if (charts.revenue) {
        charts.revenue.config.type = chartTypeMap[currentVizType] || 'pie';
        charts.revenue.update();
    }
}

// Create a D3.js treemap visualization
function createTreemap(elementId, data) {
    // Clear previous content
    document.getElementById(elementId).innerHTML = '';
    
    const width = document.getElementById(elementId).clientWidth;
    const height = 400;
    
    const svg = d3.select(`#${elementId}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Prepare data for treemap
    const root = d3.hierarchy({children: data.labels.map((label, i) => ({
        name: label,
        value: data.values[i],
        percentage: data.percentages[i]
    }))})
        .sum(d => d.value);
    
    // Create treemap layout
    d3.treemap()
        .size([width, height])
        .padding(2)
        (root);
    
    // Add rectangles
    const cell = svg.selectAll('g')
        .data(root.leaves())
        .enter().append('g')
        .attr('transform', d => `translate(${d.x0},${d.y0})`);
    
    cell.append('rect')
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr('fill', (d, i) => data.colors[i % data.colors.length])
        .attr('stroke', '#fff');
    
    // Add text labels
    cell.append('text')
        .attr('x', 5)
        .attr('y', 15)
        .attr('fill', 'white')
        .text(d => d.data.name)
        .attr('font-size', '12px')
        .attr('font-weight', 'bold');
    
    cell.append('text')
        .attr('x', 5)
        .attr('y', 30)
        .attr('fill', 'white')
        .text(d => `$${d.data.value}B (${d.data.percentage}%)`)
        .attr('font-size', '10px');
}

// Create a D3.js bubble chart
function createBubbleChart(elementId, data) {
    // Clear previous content
    document.getElementById(elementId).innerHTML = '';
    
    const width = document.getElementById(elementId).clientWidth;
    const height = 400;
    
    const svg = d3.select(`#${elementId}`)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Prepare data for bubble chart
    const bubbleData = data.labels.map((label, i) => ({
        name: label,
        value: data.values[i],
        percentage: data.percentages[i]
    }));
    
    // Create bubble layout
    const bubble = d3.pack()
        .size([width, height])
        .padding(2);
    
    const root = d3.hierarchy({children: bubbleData})
        .sum(d => d.value);
    
    bubble(root);
    
    // Add circles
    const node = svg.selectAll('.node')
        .data(root.children)
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`);
    
    node.append('circle')
        .attr('r', d => d.r)
        .attr('fill', (d, i) => data.colors[i % data.colors.length])
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);
    
    // Add text labels
    node.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.5em')
        .attr('fill', 'white')
        .text(d => d.data.name)
        .attr('font-size', d => Math.min(d.r / 3, 12) + 'px')
        .attr('font-weight', 'bold');
    
    node.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .attr('fill', 'white')
        .text(d => `$${d.data.value}B`)
        .attr('font-size', d => Math.min(d.r / 4, 10) + 'px');
    
    node.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '2.2em')
        .attr('fill', 'white')
        .text(d => `(${d.data.percentage}%)`)
        .attr('font-size', d => Math.min(d.r / 4, 10) + 'px');
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

// Update spending table
function updateSpendingTable(year) {
    const tableBody = document.getElementById('spending-table-body');
    const spendingData = BudgetDataProcessor.getYearData(year).spending;
    
    let tableHTML = '';
    
    spendingData.forEach(item => {
        const changeClass = item.change > 0 ? 'increase' : (item.change < 0 ? 'decrease' : '');
        const changeSymbol = item.change > 0 ? '+' : '';
        
        tableHTML += `
            <tr>
                <td>${item.category}</td>
                <td>$${item.amount.toFixed(1)}</td>
                <td>${item.percentage.toFixed(1)}%</td>
                <td class="${changeClass}">${changeSymbol}${item.change ? item.change.toFixed(1) + '%' : 'N/A'}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableHTML;
}

// Update revenue table
function updateRevenueTable(year) {
    const tableBody = document.getElementById('revenue-table-body');
    const revenueData = BudgetDataProcessor.getYearData(year).revenue;
    
    let tableHTML = '';
    
    revenueData.forEach(item => {
        const changeClass = item.change > 0 ? 'increase' : (item.change < 0 ? 'decrease' : '');
        const changeSymbol = item.change > 0 ? '+' : '';
        
        tableHTML += `
            <tr>
                <td>${item.source}</td>
                <td>$${item.amount.toFixed(1)}</td>
                <td>${item.percentage.toFixed(1)}%</td>
                <td class="${changeClass}">${changeSymbol}${item.change ? item.change.toFixed(1) + '%' : 'N/A'}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableHTML;
}

// Update stats based on current year
function updateStats() {
    const year = parseInt(currentYear);
    const yearData = BudgetDataProcessor.getYearData(year);
    
    // Update overview stats
    if (currentView === 'overview') {
        document.querySelector('.stats-cards .card:nth-child(1) .stat').textContent = 
            `$${yearData.overview.totalBudget.toFixed(2)}T`;
        document.querySelector('.stats-cards .card:nth-child(2) .stat').textContent = 
            `$${yearData.overview.totalRevenue.toFixed(2)}T`;
        document.querySelector('.stats-cards .card:nth-child(3) .stat').textContent = 
            `$${yearData.overview.deficit.toFixed(2)}T`;
        document.querySelector('.stats-cards .card:nth-child(4) .stat').textContent = 
            `$${yearData.overview.nationalDebt.toFixed(1)}T`;
        
        // Update highlight cards
        const defenseData = yearData.spending.find(item => item.category === 'Defense');
        const healthcareData = yearData.spending.find(item => item.category === 'Medicare') || 
                              yearData.spending.find(item => item.category === 'Medicaid & Health');
        const educationData = yearData.spending.find(item => item.category === 'Education');
        const transportationData = yearData.spending.find(item => item.category === 'Transportation');
        
        if (defenseData) {
            document.querySelector('.highlight-cards .highlight-card:nth-child(1) p').textContent = 
                `$${defenseData.amount}B allocated for national defense`;
        }
        
        if (healthcareData) {
            document.querySelector('.highlight-cards .highlight-card:nth-child(2) p').textContent = 
                `$${healthcareData.amount}B for Medicare, Medicaid & health`;
        }
        
        if (educationData) {
            document.querySelector('.highlight-cards .highlight-card:nth-child(3) p').textContent = 
                `$${educationData.amount}B for education programs`;
        }
        
        if (transportationData) {
            document.querySelector('.highlight-cards .highlight-card:nth-child(4) p').textContent = 
                `$${transportationData.amount}B for transportation & infrastructure`;
        }
    }
}

// Fact carousel
let currentFactIndex = 0;
const facts = document.querySelectorAll('.fact');

function initFactCarousel() {
    // Hide all facts except the first one
    facts.forEach((fact, index) => {
        if (index !== 0) {
            fact.style.display = 'none';
        }
    });
}

function showNextFact() {
    facts[currentFactIndex].style.display = 'none';
    currentFactIndex = (currentFactIndex + 1) % facts.length;
    facts[currentFactIndex].style.display = 'flex';
}

function showPreviousFact() {
    facts[currentFactIndex].style.display = 'none';
    currentFactIndex = (currentFactIndex - 1 + facts.length) % facts.length;
    facts[currentFactIndex].style.display = 'flex';
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Perform search
function performSearch() {
    const searchInput = document.querySelector('.search-container input');
    const query = searchInput.value.trim();
    
    if (query.length > 0) {
        const results = BudgetDataProcessor.searchBudgetData(query, currentYear);
        displaySearchResults(results, query);
    }
}

// Display search results
function displaySearchResults(results, query) {
    // Create a modal for search results
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.padding = '2rem';
    modalContent.style.maxWidth = '600px';
    modalContent.style.width = '90%';
    modalContent.style.maxHeight = '80vh';
    modalContent.style.overflowY = 'auto';
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.float = 'right';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'var(--dark)';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const title = document.createElement('h2');
    title.textContent = `Search Results for "${query}"`;
    title.style.marginBottom = '1.5rem';
    title.style.color = 'var(--primary-dark)';
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    
    if (results.length === 0) {
        const noResults = document.createElement('p');
        noResults.textContent = 'No results found. Try a different search term.';
        noResults.style.textAlign = 'center';
        noResults.style.padding = '2rem 0';
        modalContent.appendChild(noResults);
    } else {
        const resultsList = document.createElement('div');
        resultsList.className = 'search-results';
        
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.style.padding = '1rem';
            resultItem.style.marginBottom = '1rem';
            resultItem.style.borderRadius = 'var(--border-radius)';
            resultItem.style.backgroundColor = 'var(--gray-light)';
            
            const changeClass = result.change > 0 ? 'increase' : (result.change < 0 ? 'decrease' : '');
            const changeSymbol = result.change > 0 ? '+' : '';
            
            resultItem.innerHTML = `
                <h3>${result.name} <span class="result-type">(${result.type})</span></h3>
                <p>Amount: <strong>$${result.amount.toFixed(1)}B</strong> (${result.percentage.toFixed(1)}% of ${result.type.toLowerCase()})</p>
                <p>Year-over-year change: <span class="${changeClass}">${changeSymbol}${result.change ? result.change.toFixed(1) + '%' : 'N/A'}</span></p>
            `;
            
            resultsList.appendChild(resultItem);
        });
        
        modalContent.appendChild(resultsList);
    }
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
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

// Update spending table
function updateSpendingTable(year) {
    const tableBody = document.getElementById('spending-table-body');
    const spendingData = BudgetDataProcessor.getYearData(year).spending;
    
    let tableHTML = '';
    
    spendingData.forEach(item => {
        const changeClass = item.change > 0 ? 'increase' : (item.change < 0 ? 'decrease' : '');
        const changeSymbol = item.change > 0 ? '+' : '';
        
        tableHTML += `
            <tr>
                <td>${item.category}</td>
                <td>$${item.amount.toFixed(1)}</td>
                <td>${item.percentage.toFixed(1)}%</td>
                <td class="${changeClass}">${changeSymbol}${item.change ? item.change.toFixed(1) + '%' : 'N/A'}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableHTML;
}

// Update revenue table
function updateRevenueTable(year) {
    const tableBody = document.getElementById('revenue-table-body');
    const revenueData = BudgetDataProcessor.getYearData(year).revenue;
    
    let tableHTML = '';
    
    revenueData.forEach(item => {
        const changeClass = item.change > 0 ? 'increase' : (item.change < 0 ? 'decrease' : '');
        const changeSymbol = item.change > 0 ? '+' : '';
        
        tableHTML += `
            <tr>
                <td>${item.source}</td>
                <td>$${item.amount.toFixed(1)}</td>
                <td>${item.percentage.toFixed(1)}%</td>
                <td class="${changeClass}">${changeSymbol}${item.change ? item.change.toFixed(1) + '%' : 'N/A'}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = tableHTML;
}

// Update stats based on current year
function updateStats() {
    const year = parseInt(currentYear);
    const yearData = BudgetDataProcessor.getYearData(year);
    
    // Update overview stats
    if (currentView === 'overview') {
        document.querySelector('.stats-cards .card:nth-child(1) .stat').textContent = 
            `$${yearData.overview.totalBudget.toFixed(2)}T`;
        document.querySelector('.stats-cards .card:nth-child(2) .stat').textContent = 
            `$${yearData.overview.totalRevenue.toFixed(2)}T`;
        document.querySelector('.stats-cards .card:nth-child(3) .stat').textContent = 
            `$${yearData.overview.deficit.toFixed(2)}T`;
        document.querySelector('.stats-cards .card:nth-child(4) .stat').textContent = 
            `$${yearData.overview.nationalDebt.toFixed(1)}T`;
        
        // Update highlight cards
        const defenseData = yearData.spending.find(item => item.category === 'Defense');
        const healthcareData = yearData.spending.find(item => item.category === 'Medicare') || 
                              yearData.spending.find(item => item.category === 'Medicaid & Health');
        const educationData = yearData.spending.find(item => item.category === 'Education');
        const transportationData = yearData.spending.find(item => item.category === 'Transportation');
        
        if (defenseData) {
            document.querySelector('.highlight-cards .highlight-card:nth-child(1) p').textContent = 
                `$${defenseData.amount}B allocated for national defense`;
        }
        
        if (healthcareData) {
            document.querySelector('.highlight-cards .highlight-card:nth-child(2) p').textContent = 
                `$${healthcareData.amount}B for Medicare, Medicaid & health`;
        }
        
        if (educationData) {
            document.querySelector('.highlight-cards .highlight-card:nth-child(3) p').textContent = 
                `$${educationData.amount}B for education programs`;
        }
        
        if (transportationData) {
            document.querySelector('.highlight-cards .highlight-card:nth-child(4) p').textContent = 
                `$${transportationData.amount}B for transportation & infrastructure`;
        }
    }
}

// Fact carousel
let currentFactIndex = 0;
const facts = document.querySelectorAll('.fact');

function initFactCarousel() {
    // Hide all facts except the first one
    facts.forEach((fact, index) => {
        if (index !== 0) {
            fact.style.display = 'none';
        }
    });
}

function showNextFact() {
    facts[currentFactIndex].style.display = 'none';
    currentFactIndex = (currentFactIndex + 1) % facts.length;
    facts[currentFactIndex].style.display = 'flex';
}

function showPreviousFact() {
    facts[currentFactIndex].style.display = 'none';
    currentFactIndex = (currentFactIndex - 1 + facts.length) % facts.length;
    facts[currentFactIndex].style.display = 'flex';
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Perform search
function performSearch() {
    const searchInput = document.querySelector('.search-container input');
    const query = searchInput.value.trim();
    
    if (query.length > 0) {
        const results = BudgetDataProcessor.searchBudgetData(query, currentYear);
        displaySearchResults(results, query);
    }
}

// Display search results
function displaySearchResults(results, query) {
    // Create a modal for search results
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.padding = '2rem';
    modalContent.style.maxWidth = '600px';
    modalContent.style.width = '90%';
    modalContent.style.maxHeight = '80vh';
    modalContent.style.overflowY = 'auto';
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.float = 'right';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'var(--dark)';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    const title = document.createElement('h2');
    title.textContent = `Search Results for "${query}"`;
    title.style.marginBottom = '1.5rem';
    title.style.color = 'var(--primary-dark)';
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    
    if (results.length === 0) {
        const noResults = document.createElement('p');
        noResults.textContent = 'No results found. Try a different search term.';
        noResults.style.textAlign = 'center';
        noResults.style.padding = '2rem 0';
        modalContent.appendChild(noResults);
    } else {
        const resultsList = document.createElement('div');
