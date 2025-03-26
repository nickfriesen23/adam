/**
 * Fiscal Fun with Adam Nesvold - Budget Explorer
 * Fun Comparison Module - Handles fun comparison charts and data
 */

// Initialize fun comparison charts
function initializeFunComparisonCharts() {
    console.log("Initializing fun comparison charts");
    
    try {
        // Bitcoin price chart
        const bitcoinCtx = document.getElementById('bitcoin-chart');
        if (bitcoinCtx) {
            const bitcoinChart = new Chart(bitcoinCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: cryptoData.bitcoin.prices.map(item => item.year.toString()),
                    datasets: [{
                        label: 'Bitcoin Price (USD)',
                        data: cryptoData.bitcoin.prices.map(item => item.price),
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
        }
        
        // Ethereum price chart
        const ethereumCtx = document.getElementById('ethereum-chart');
        if (ethereumCtx) {
            const ethereumChart = new Chart(ethereumCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: cryptoData.ethereum.prices.map(item => item.year.toString()),
                    datasets: [{
                        label: 'Ethereum Price (USD)',
                        data: cryptoData.ethereum.prices.map(item => item.price),
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
        }
        
        // Bitcoin halving table
        const bitcoinHalvingTable = document.getElementById('bitcoin-halving-table');
        if (bitcoinHalvingTable) {
            const tableBody = bitcoinHalvingTable.querySelector('tbody');
            if (tableBody) {
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
                tableBody.innerHTML = tableHTML;
            }
        }
        
        // Star Trek ships chart
        const starTrekShipsCtx = document.getElementById('starTrek-ships-chart');
        if (starTrekShipsCtx) {
            const starTrekShipsData = ComparisonDataProcessor.getStarTrekShipCostsData();
            const starTrekShipsChart = new Chart(starTrekShipsCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: starTrekShipsData.labels,
                    datasets: [{
                        label: 'Ship Cost (Billions USD)',
                        data: starTrekShipsData.values,
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
        }
        
        // Star Trek actors chart
        const starTrekActorsCtx = document.getElementById('starTrek-actors-chart');
        if (starTrekActorsCtx) {
            const starTrekActorsData = ComparisonDataProcessor.getStarTrekActorSalariesData();
            const starTrekActorsChart = new Chart(starTrekActorsCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: starTrekActorsData.labels,
                    datasets: [{
                        label: 'Salary (Thousands USD per Episode)',
                        data: starTrekActorsData.values,
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
        }
        
        // Tesla vehicles chart
        const teslaVehiclesCtx = document.getElementById('tesla-vehicles-chart');
        if (teslaVehiclesCtx) {
            const teslaVehiclesData = ComparisonDataProcessor.getTeslaVehiclePricesData();
            const teslaVehiclesChart = new Chart(teslaVehiclesCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: teslaVehiclesData.labels,
                    datasets: [{
                        label: 'Base Price (Thousands USD)',
                        data: teslaVehiclesData.values,
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
        }
        
        // Elon Musk net worth chart
        const elonNetWorthCtx = document.getElementById('elon-networth-chart');
        if (elonNetWorthCtx) {
            const elonNetWorthData = ComparisonDataProcessor.getElonMuskNetWorthData();
            const elonNetWorthChart = new Chart(elonNetWorthCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: elonNetWorthData.labels,
                    datasets: [{
                        label: 'Net Worth (Billions USD)',
                        data: elonNetWorthData.values,
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
        }
        
        // Religious leaders earnings chart
        const religiousEarningsCtx = document.getElementById('religious-earnings-chart');
        if (religiousEarningsCtx) {
            const religiousEarningsData = ComparisonDataProcessor.getReligiousLeadersEarningsData();
            const religiousEarningsChart = new Chart(religiousEarningsCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: religiousEarningsData.labels,
                    datasets: [{
                        label: 'Annual Earnings (Millions USD)',
                        data: religiousEarningsData.values,
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
        }
        
        // Religious leaders net worth chart
        const religiousNetWorthCtx = document.getElementById('religious-networth-chart');
        if (religiousNetWorthCtx) {
            const religiousNetWorthData = ComparisonDataProcessor.getReligiousLeadersNetWorthData();
            const religiousNetWorthChart = new Chart(religiousNetWorthCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: religiousNetWorthData.labels,
                    datasets: [{
                        label: 'Net Worth (Millions USD)',
                        data: religiousNetWorthData.values,
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
        }
        
        // Budget vs Star Trek ships chart
        const budgetStarTrekCtx = document.getElementById('budget-starTrek-chart');
        if (budgetStarTrekCtx) {
            const budgetStarTrekData = ComparisonDataProcessor.compareToOtherValues('Defense', 'starTrekShips');
            if (budgetStarTrekData) {
                const budgetStarTrekChart = new Chart(budgetStarTrekCtx.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: budgetStarTrekData.labels,
                        datasets: [{
                            label: 'Cost (Billions USD)',
                            data: budgetStarTrekData.values,
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
            }
        }
        
        // Budget vs Tesla chart
        const budgetTeslaCtx = document.getElementById('budget-tesla-chart');
        if (budgetTeslaCtx) {
            const budgetTeslaData = ComparisonDataProcessor.compareToOtherValues('Defense', 'teslaNetWorth');
            if (budgetTeslaData) {
                const budgetTeslaChart = new Chart(budgetTeslaCtx.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: budgetTeslaData.labels,
                        datasets: [{
                            label: 'Value (Billions USD)',
                            data: budgetTeslaData.values,
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
        }
        
        // Initialize fun comparison buttons
        initFunComparisonTabs();
        
        console.log('Fun comparison charts initialized');
    } catch (error) {
        console.error("Error initializing fun comparison charts:", error);
    }
}

// Initialize fun comparison tabs
function initFunComparisonTabs() {
    console.log('Initializing fun comparison tabs');
    const funCompareBtns = document.querySelectorAll('.fun-compare-btn');
    const funSections = document.querySelectorAll('.fun-comparison-section');
    
    if (funCompareBtns.length === 0) {
        console.warn('No fun comparison buttons found');
    } else {
        console.log(`Found ${funCompareBtns.length} fun comparison buttons`);
    }
    
    if (funSections.length === 0) {
        console.warn('No fun comparison sections found');
    } else {
        console.log(`Found ${funSections.length} fun comparison sections`);
    }
    
    funCompareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log(`Fun comparison button clicked: ${this.getAttribute('data-fun-compare')}`);
            
            // Update active state
            funCompareBtns.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            // Show the selected section
            const compareType = this.getAttribute('data-fun-compare');
            funSections.forEach(section => {
                section.style.display = 'none';
            });
            
            const targetSection = document.getElementById(`${compareType}-section`);
            if (targetSection) {
                targetSection.style.display = 'block';
            } else {
                console.error(`Section not found: ${compareType}-section`);
            }
        });
    });
}

// Call initializeFunComparisonCharts when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for other scripts to load
    setTimeout(initializeFunComparisonCharts, 1000);
});