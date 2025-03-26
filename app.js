/**
 * FiscalFun - Budget Explorer
 * App Module - Core application functionality
 */

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
            const vizType = this.getAttribute('data-type');
            console.log('Visualization button clicked:', vizType);
            currentVizType = vizType;
            
            // Update active state
            document.querySelectorAll('.viz-btn').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            console.log('About to call updateCharts with currentVizType:', currentVizType);
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

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});