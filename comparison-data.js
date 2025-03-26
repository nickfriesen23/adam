/**
 * Fiscal Fun with Adam Nesvold - Budget Explorer
 * Comparison Data Module - Additional data for comparisons
 */

// Cryptocurrency data
const cryptoData = {
    // Bitcoin historical price data (in USD)
    bitcoin: {
        prices: [
            { year: 2013, price: 13.30 },
            { year: 2014, price: 770.44 },
            { year: 2015, price: 313.92 },
            { year: 2016, price: 434.46 },
            { year: 2017, price: 997.69 },
            { year: 2018, price: 13412.44 },
            { year: 2019, price: 3843.52 },
            { year: 2020, price: 7199.77 },
            { year: 2021, price: 29374.15 },
            { year: 2022, price: 47686.81 },
            { year: 2023, price: 16547.50 },
            { year: 2024, price: 42000.00 }
        ],
        // Bitcoin halving events
        halvings: [
            { date: "November 28, 2012", block: 210000, reward: 25 },
            { date: "July 9, 2016", block: 420000, reward: 12.5 },
            { date: "May 11, 2020", block: 630000, reward: 6.25 },
            { date: "April 2024 (est.)", block: 840000, reward: 3.125 }
        ],
        marketCap: {
            2023: 319.2 // In billions USD
        }
    },
    
    // Ethereum historical price data (in USD)
    ethereum: {
        prices: [
            { year: 2015, price: 0.43 },
            { year: 2016, price: 8.17 },
            { year: 2017, price: 10.05 },
            { year: 2018, price: 1396.42 },
            { year: 2019, price: 133.37 },
            { year: 2020, price: 129.04 },
            { year: 2021, price: 738.91 },
            { year: 2022, price: 3683.05 },
            { year: 2023, price: 1215.61 },
            { year: 2024, price: 2300.00 }
        ],
        // Key Ethereum events
        events: [
            { date: "July 30, 2015", name: "Frontier Launch" },
            { date: "March 14, 2016", name: "Homestead Hard Fork" },
            { date: "October 25, 2016", name: "Tangerine Whistle Fork" },
            { date: "November 22, 2016", name: "Spurious Dragon Fork" },
            { date: "October 16, 2017", name: "Byzantium Fork" },
            { date: "February 28, 2019", name: "Constantinople Fork" },
            { date: "December 8, 2019", name: "Istanbul Fork" },
            { date: "April 15, 2021", name: "Berlin Fork" },
            { date: "August 5, 2021", name: "London Fork (EIP-1559)" },
            { date: "September 15, 2022", name: "The Merge (PoS Transition)" },
            { date: "April 12, 2023", name: "Shanghai Upgrade" }
        ],
        marketCap: {
            2023: 162.7 // In billions USD
        }
    }
};

// Star Trek related costs
const starTrekData = {
    // Estimated costs of fictional ships (in billions USD)
    ships: [
        { name: "USS Enterprise (NCC-1701-D)", cost: 7.9, class: "Galaxy-class" },
        { name: "USS Voyager", cost: 4.2, class: "Intrepid-class" },
        { name: "USS Defiant", cost: 2.1, class: "Defiant-class" },
        { name: "USS Enterprise (NCC-1701-E)", cost: 6.8, class: "Sovereign-class" },
        { name: "USS Discovery", cost: 5.7, class: "Crossfield-class" }
    ],
    
    // Actor salaries (per episode in later seasons, in thousands USD)
    actorSalaries: [
        { name: "Patrick Stewart (TNG)", salary: 100, role: "Captain Jean-Luc Picard" },
        { name: "William Shatner (TOS)", salary: 25, role: "Captain James T. Kirk" },
        { name: "Leonard Nimoy (TOS)", salary: 25, role: "Spock" },
        { name: "Avery Brooks (DS9)", salary: 75, role: "Captain Benjamin Sisko" },
        { name: "Kate Mulgrew (VOY)", salary: 80, role: "Captain Kathryn Janeway" },
        { name: "Scott Bakula (ENT)", salary: 100, role: "Captain Jonathan Archer" },
        { name: "Sonequa Martin-Green (DIS)", salary: 175, role: "Michael Burnham" }
    ],
    
    // Movie budgets (in millions USD)
    movieBudgets: [
        { title: "Star Trek: The Motion Picture (1979)", budget: 46 },
        { title: "Star Trek II: The Wrath of Khan (1982)", budget: 11.2 },
        { title: "Star Trek III: The Search for Spock (1984)", budget: 16 },
        { title: "Star Trek IV: The Voyage Home (1986)", budget: 21 },
        { title: "Star Trek V: The Final Frontier (1989)", budget: 33 },
        { title: "Star Trek VI: The Undiscovered Country (1991)", budget: 27 },
        { title: "Star Trek Generations (1994)", budget: 35 },
        { title: "Star Trek: First Contact (1996)", budget: 45 },
        { title: "Star Trek: Insurrection (1998)", budget: 58 },
        { title: "Star Trek: Nemesis (2002)", budget: 60 },
        { title: "Star Trek (2009)", budget: 150 },
        { title: "Star Trek Into Darkness (2013)", budget: 190 },
        { title: "Star Trek Beyond (2016)", budget: 185 }
    ]
};

// Tesla related data
const teslaData = {
    // Vehicle prices (in thousands USD, 2023 models)
    vehicles: [
        { model: "Model 3", basePrice: 40.24, range: "272 miles" },
        { model: "Model 3 Long Range", basePrice: 47.24, range: "333 miles" },
        { model: "Model 3 Performance", basePrice: 53.24, range: "315 miles" },
        { model: "Model Y", basePrice: 47.49, range: "260 miles" },
        { model: "Model Y Long Range", basePrice: 50.49, range: "330 miles" },
        { model: "Model Y Performance", basePrice: 54.49, range: "303 miles" },
        { model: "Model S", basePrice: 74.99, range: "375 miles" },
        { model: "Model S Plaid", basePrice: 89.99, range: "348 miles" },
        { model: "Model X", basePrice: 79.99, range: "348 miles" },
        { model: "Model X Plaid", basePrice: 94.99, range: "333 miles" },
        { model: "Cybertruck RWD", basePrice: 60.99, range: "250 miles" },
        { model: "Cybertruck AWD", basePrice: 79.99, range: "340 miles" },
        { model: "Cybertruck Cyberbeast", basePrice: 99.99, range: "320 miles" }
    ],
    
    // Stock price history (year-end prices in USD)
    stockPrice: [
        { year: 2013, price: 150.43 },
        { year: 2014, price: 222.41 },
        { year: 2015, price: 240.01 },
        { year: 2016, price: 213.69 },
        { year: 2017, price: 311.35 },
        { year: 2018, price: 332.80 },
        { year: 2019, price: 418.33 },
        { year: 2020, price: 705.67 },
        { year: 2021, price: 1056.78 },
        { year: 2022, price: 123.18 }, // After 3:1 split
        { year: 2023, price: 248.48 }
    ],
    
    // Elon Musk's estimated net worth (in billions USD)
    elonMuskNetWorth: [
        { year: 2013, worth: 2.7 },
        { year: 2014, worth: 8.4 },
        { year: 2015, worth: 13.9 },
        { year: 2016, worth: 11.6 },
        { year: 2017, worth: 19.9 },
        { year: 2018, worth: 22.3 },
        { year: 2019, worth: 28.8 },
        { year: 2020, worth: 170.0 },
        { year: 2021, worth: 297.0 },
        { year: 2022, worth: 147.0 },
        { year: 2023, worth: 180.0 }
    ]
};

// Religious leaders' estimated annual earnings (in millions USD)
const religiousLeadersData = {
    salaries: [
        { name: "Joel Osteen", church: "Lakewood Church", estimatedAnnualEarnings: 55, netWorth: 100 },
        { name: "T.D. Jakes", church: "The Potter's House", estimatedAnnualEarnings: 18, netWorth: 20 },
        { name: "Rick Warren", church: "Saddleback Church", estimatedAnnualEarnings: 0.5, netWorth: 25 }, // Took minimal salary
        { name: "Mark Driscoll", church: "Trinity Church", estimatedAnnualEarnings: 0.8, netWorth: 2.5 }
    ],
    
    // Church annual revenues (in millions USD, estimated)
    churchRevenues: [
        { church: "Lakewood Church", annualRevenue: 90 },
        { church: "The Potter's House", annualRevenue: 30 },
        { church: "Saddleback Church", annualRevenue: 25 },
        { church: "Trinity Church", annualRevenue: 5 }
    ]
};

// Comparison Data Processor
const ComparisonDataProcessor = {
    /**
     * Get Bitcoin price data for chart
     * @returns {Object} Formatted Bitcoin price data
     */
    getBitcoinPriceData: function() {
        return {
            labels: cryptoData.bitcoin.prices.map(item => item.year.toString()),
            values: cryptoData.bitcoin.prices.map(item => item.price),
            title: 'Bitcoin Price History (USD)'
        };
    },
    
    /**
     * Get Ethereum price data for chart
     * @returns {Object} Formatted Ethereum price data
     */
    getEthereumPriceData: function() {
        return {
            labels: cryptoData.ethereum.prices.map(item => item.year.toString()),
            values: cryptoData.ethereum.prices.map(item => item.price),
            title: 'Ethereum Price History (USD)'
        };
    },
    
    /**
     * Get Star Trek ship costs data for chart
     * @returns {Object} Formatted Star Trek ship costs data
     */
    getStarTrekShipCostsData: function() {
        return {
            labels: starTrekData.ships.map(item => item.name),
            values: starTrekData.ships.map(item => item.cost),
            title: 'Estimated Star Trek Ship Costs (Billions USD)'
        };
    },
    
    /**
     * Get Star Trek actor salaries data for chart
     * @returns {Object} Formatted Star Trek actor salaries data
     */
    getStarTrekActorSalariesData: function() {
        return {
            labels: starTrekData.actorSalaries.map(item => item.name),
            values: starTrekData.actorSalaries.map(item => item.salary),
            title: 'Star Trek Actor Salaries (Thousands USD per Episode)'
        };
    },
    
    /**
     * Get Tesla vehicle prices data for chart
     * @returns {Object} Formatted Tesla vehicle prices data
     */
    getTeslaVehiclePricesData: function() {
        return {
            labels: teslaData.vehicles.map(item => item.model),
            values: teslaData.vehicles.map(item => item.basePrice),
            title: 'Tesla Vehicle Base Prices (Thousands USD)'
        };
    },
    
    /**
     * Get Elon Musk net worth data for chart
     * @returns {Object} Formatted Elon Musk net worth data
     */
    getElonMuskNetWorthData: function() {
        return {
            labels: teslaData.elonMuskNetWorth.map(item => item.year.toString()),
            values: teslaData.elonMuskNetWorth.map(item => item.worth),
            title: 'Elon Musk Net Worth (Billions USD)'
        };
    },
    
    /**
     * Get religious leaders' earnings data for chart
     * @returns {Object} Formatted religious leaders' earnings data
     */
    getReligiousLeadersEarningsData: function() {
        return {
            labels: religiousLeadersData.salaries.map(item => item.name),
            values: religiousLeadersData.salaries.map(item => item.estimatedAnnualEarnings),
            title: 'Religious Leaders Estimated Annual Earnings (Millions USD)'
        };
    },
    
    /**
     * Get religious leaders' net worth data for chart
     * @returns {Object} Formatted religious leaders' net worth data
     */
    getReligiousLeadersNetWorthData: function() {
        return {
            labels: religiousLeadersData.salaries.map(item => item.name),
            values: religiousLeadersData.salaries.map(item => item.netWorth),
            title: 'Religious Leaders Estimated Net Worth (Millions USD)'
        };
    },
    
    /**
     * Compare budget items to other values
     * @param {string} budgetCategory - Budget category to compare
     * @param {string} comparisonType - Type of comparison (e.g., 'bitcoin', 'starTrek', 'tesla')
     * @returns {Object} Comparison data
     */
    compareToOtherValues: function(budgetCategory, comparisonType) {
        // Get budget value
        const budgetValue = this.getBudgetValueByCategory(budgetCategory);
        
        if (!budgetValue) return null;
        
        let comparisonData = null;
        
        switch (comparisonType) {
            case 'bitcoin':
                comparisonData = {
                    labels: ['Budget Item', 'Bitcoin Market Cap'],
                    values: [budgetValue, cryptoData.bitcoin.marketCap[2023]],
                    title: `${budgetCategory} vs Bitcoin Market Cap (Billions USD)`
                };
                break;
            case 'ethereum':
                comparisonData = {
                    labels: ['Budget Item', 'Ethereum Market Cap'],
                    values: [budgetValue, cryptoData.ethereum.marketCap[2023]],
                    title: `${budgetCategory} vs Ethereum Market Cap (Billions USD)`
                };
                break;
            case 'starTrekShips':
                comparisonData = {
                    labels: ['Budget Item', ...starTrekData.ships.map(ship => ship.name)],
                    values: [budgetValue, ...starTrekData.ships.map(ship => ship.cost)],
                    title: `${budgetCategory} vs Star Trek Ship Costs (Billions USD)`
                };
                break;
            case 'teslaNetWorth':
                comparisonData = {
                    labels: ['Budget Item', 'Elon Musk Net Worth'],
                    values: [budgetValue, teslaData.elonMuskNetWorth.find(item => item.year === 2023).worth],
                    title: `${budgetCategory} vs Elon Musk Net Worth (Billions USD)`
                };
                break;
            default:
                return null;
        }
        
        return comparisonData;
    },
    
    /**
     * Get budget value by category
     * @param {string} category - Budget category
     * @returns {number} Budget value in billions
     */
    getBudgetValueByCategory: function(category) {
        const currentYear = 2023;
        const yearData = budgetData[currentYear];
        
        if (!yearData) return null;
        
        // Check spending categories
        const spendingItem = yearData.spending.find(item => item.category === category);
        if (spendingItem) return spendingItem.amount;
        
        // Check revenue sources
        const revenueItem = yearData.revenue.find(item => item.source === category);
        if (revenueItem) return revenueItem.amount;
        
        // Check overview items
        if (category === 'Total Budget') return yearData.overview.totalBudget * 1000; // Convert to billions
        if (category === 'Total Revenue') return yearData.overview.totalRevenue * 1000; // Convert to billions
        if (category === 'Budget Deficit') return yearData.overview.deficit * 1000; // Convert to billions
        if (category === 'National Debt') return yearData.overview.nationalDebt * 1000; // Convert to billions
        
        return null;
    }
};