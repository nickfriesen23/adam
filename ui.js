/**
 * FiscalFun - Budget Explorer
 * UI Module - UI-related functions (search, fact carousel)
 */

// Fact carousel
let currentFactIndex = 0;
let facts;

// Initialize fact carousel
function initFactCarousel() {
    facts = document.querySelectorAll('.fact');
    // Hide all facts except the first one
    facts.forEach((fact, index) => {
        if (index !== 0) {
            fact.style.display = 'none';
        }
    });
    
    // Initialize fun comparison tabs
    initFunComparisonTabs();
}

// Show next fact
function showNextFact() {
    facts[currentFactIndex].style.display = 'none';
    currentFactIndex = (currentFactIndex + 1) % facts.length;
    facts[currentFactIndex].style.display = 'flex';
}

// Show previous fact
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