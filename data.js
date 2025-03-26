/**
 * Fiscal Fun with Adam Nesvold - Budget Explorer
 * Data Module
 */

// Budget data by fiscal year
const budgetData = {
    // 2023 data (based on actual US federal budget figures)
    2023: {
        // Total budget overview
        overview: {
            totalBudget: 6.27, // In trillions
            totalRevenue: 4.64, // In trillions
            deficit: 1.63, // In trillions
            nationalDebt: 33.7, // In trillions
            gdp: 27.3, // In trillions
            population: 333, // In millions
        },
        
        // Spending breakdown by major categories (in billions)
        spending: [
            { 
                category: "Social Security", 
                amount: 1450, 
                percentage: 23.1, 
                change: 5.2,
                subDepartments: [
                    { name: "Retirement Benefits", amount: 950, percentage: 65.5 },
                    { name: "Disability Insurance", amount: 280, percentage: 19.3 },
                    { name: "Supplemental Security Income", amount: 160, percentage: 11.0 },
                    { name: "Administrative Costs", amount: 60, percentage: 4.2 }
                ]
            },
            { 
                category: "Medicare", 
                amount: 975, 
                percentage: 15.5, 
                change: 7.1,
                subDepartments: [
                    { name: "Hospital Insurance (Part A)", amount: 380, percentage: 39.0 },
                    { name: "Medical Insurance (Part B)", amount: 420, percentage: 43.1 },
                    { name: "Prescription Drugs (Part D)", amount: 125, percentage: 12.8 },
                    { name: "Medicare Advantage (Part C)", amount: 50, percentage: 5.1 }
                ]
            },
            { 
                category: "Medicaid & Health", 
                amount: 725, 
                percentage: 11.6, 
                change: 3.8,
                subDepartments: [
                    { name: "Medicaid", amount: 520, percentage: 71.7 },
                    { name: "Children's Health Insurance", amount: 85, percentage: 11.7 },
                    { name: "Public Health Services", amount: 75, percentage: 10.3 },
                    { name: "Health Research", amount: 45, percentage: 6.3 }
                ]
            },
            { 
                category: "Defense", 
                amount: 842, 
                percentage: 13.4, 
                change: 4.5,
                subDepartments: [
                    { name: "Operations & Maintenance", amount: 310, percentage: 36.8 },
                    { name: "Military Personnel", amount: 175, percentage: 20.8 },
                    { name: "Procurement", amount: 160, percentage: 19.0 },
                    { name: "Research & Development", amount: 120, percentage: 14.3 },
                    { name: "Military Construction", amount: 45, percentage: 5.3 },
                    { name: "Family Housing", amount: 32, percentage: 3.8 }
                ]
            },
            { 
                category: "Interest on Debt", 
                amount: 663, 
                percentage: 10.6, 
                change: 28.7,
                subDepartments: [
                    { name: "Marketable Securities", amount: 520, percentage: 78.4 },
                    { name: "Non-marketable Securities", amount: 143, percentage: 21.6 }
                ]
            },
            { 
                category: "Veterans Benefits", 
                amount: 310, 
                percentage: 4.9, 
                change: 9.2,
                subDepartments: [
                    { name: "Medical Care", amount: 150, percentage: 48.4 },
                    { name: "Disability Compensation", amount: 110, percentage: 35.5 },
                    { name: "Education & Training", amount: 30, percentage: 9.7 },
                    { name: "Other Benefits", amount: 20, percentage: 6.4 }
                ]
            },
            { 
                category: "Income Security", 
                amount: 465, 
                percentage: 7.4, 
                change: -32.1,
                subDepartments: [
                    { name: "SNAP (Food Stamps)", amount: 120, percentage: 25.8 },
                    { name: "Housing Assistance", amount: 95, percentage: 20.4 },
                    { name: "Child Nutrition", amount: 85, percentage: 18.3 },
                    { name: "Unemployment Compensation", amount: 75, percentage: 16.1 },
                    { name: "Earned Income Tax Credit", amount: 90, percentage: 19.4 }
                ]
            },
            { 
                category: "Transportation", 
                amount: 142, 
                percentage: 2.3, 
                change: 6.8,
                subDepartments: [
                    { name: "Highways & Roads", amount: 65, percentage: 45.8 },
                    { name: "Air Transportation", amount: 35, percentage: 24.6 },
                    { name: "Rail Transportation", amount: 25, percentage: 17.6 },
                    { name: "Public Transit", amount: 17, percentage: 12.0 }
                ]
            },
            { 
                category: "Education", 
                amount: 79.6, 
                percentage: 1.3, 
                change: -9.4,
                subDepartments: [
                    { name: "K-12 Education", amount: 35, percentage: 44.0 },
                    { name: "Higher Education", amount: 30, percentage: 37.7 },
                    { name: "Student Financial Aid", amount: 10, percentage: 12.6 },
                    { name: "Research & General Education", amount: 4.6, percentage: 5.7 }
                ]
            },
            { 
                category: "International Affairs", 
                amount: 67.4, 
                percentage: 1.1, 
                change: 2.3,
                subDepartments: [
                    { name: "Foreign Aid", amount: 35, percentage: 51.9 },
                    { name: "Diplomatic Operations", amount: 20, percentage: 29.7 },
                    { name: "International Organizations", amount: 12.4, percentage: 18.4 }
                ]
            },
            { 
                category: "Science & Technology", 
                amount: 38.2, 
                percentage: 0.6, 
                change: 5.7,
                subDepartments: [
                    { name: "NASA", amount: 24, percentage: 62.8 },
                    { name: "National Science Foundation", amount: 8.5, percentage: 22.3 },
                    { name: "Energy Research", amount: 5.7, percentage: 14.9 }
                ]
            },
            { 
                category: "Agriculture", 
                amount: 25.5, 
                percentage: 0.4, 
                change: -3.2,
                subDepartments: [
                    { name: "Farm Support", amount: 12, percentage: 47.1 },
                    { name: "Agricultural Research", amount: 7.5, percentage: 29.4 },
                    { name: "Conservation Programs", amount: 6, percentage: 23.5 }
                ]
            },
            { 
                category: "Natural Resources & Environment", 
                amount: 52.3, 
                percentage: 0.8, 
                change: 7.9,
                subDepartments: [
                    { name: "Environmental Protection", amount: 22, percentage: 42.1 },
                    { name: "National Parks", amount: 12, percentage: 22.9 },
                    { name: "Forest Service", amount: 10.3, percentage: 19.7 },
                    { name: "Water Resources", amount: 8, percentage: 15.3 }
                ]
            },
            { 
                category: "Justice", 
                amount: 72.8, 
                percentage: 1.2, 
                change: 4.1,
                subDepartments: [
                    { name: "Federal Law Enforcement", amount: 35, percentage: 48.1 },
                    { name: "Federal Courts", amount: 20, percentage: 27.5 },
                    { name: "Federal Prisons", amount: 12, percentage: 16.5 },
                    { name: "Criminal Justice Assistance", amount: 5.8, percentage: 7.9 }
                ]
            },
            { 
                category: "Other", 
                amount: 361.2, 
                percentage: 5.8, 
                change: -1.3,
                subDepartments: [
                    { name: "Community Development", amount: 95, percentage: 26.3 },
                    { name: "Disaster Relief", amount: 85, percentage: 23.5 },
                    { name: "General Government", amount: 75, percentage: 20.8 },
                    { name: "Commerce & Housing", amount: 65, percentage: 18.0 },
                    { name: "Social Services", amount: 41.2, percentage: 11.4 }
                ]
            }
        ],
        
        // Revenue sources (in billions)
        revenue: [
            { 
                source: "Individual Income Taxes", 
                amount: 2240, 
                percentage: 48.3, 
                change: 2.8,
                subSources: [
                    { name: "Withholding", amount: 1850, percentage: 82.6 },
                    { name: "Estimated Payments", amount: 280, percentage: 12.5 },
                    { name: "Final Payments", amount: 110, percentage: 4.9 }
                ]
            },
            { 
                source: "Payroll Taxes", 
                amount: 1450, 
                percentage: 31.3, 
                change: 5.1,
                subSources: [
                    { name: "Social Security", amount: 950, percentage: 65.5 },
                    { name: "Medicare", amount: 350, percentage: 24.1 },
                    { name: "Unemployment Insurance", amount: 150, percentage: 10.4 }
                ]
            },
            { 
                source: "Corporate Income Taxes", 
                amount: 425, 
                percentage: 9.2, 
                change: -7.5,
                subSources: [
                    { name: "Domestic Corporations", amount: 325, percentage: 76.5 },
                    { name: "Foreign Corporations", amount: 100, percentage: 23.5 }
                ]
            },
            { 
                source: "Excise Taxes", 
                amount: 87, 
                percentage: 1.9, 
                change: 3.2,
                subSources: [
                    { name: "Fuel Taxes", amount: 40, percentage: 46.0 },
                    { name: "Tobacco Taxes", amount: 20, percentage: 23.0 },
                    { name: "Alcohol Taxes", amount: 15, percentage: 17.2 },
                    { name: "Other Excise Taxes", amount: 12, percentage: 13.8 }
                ]
            },
            { 
                source: "Customs Duties", 
                amount: 92, 
                percentage: 2.0, 
                change: -5.3,
                subSources: [
                    { name: "Import Tariffs", amount: 92, percentage: 100.0 }
                ]
            },
            { 
                source: "Estate and Gift Taxes", 
                amount: 33, 
                percentage: 0.7, 
                change: 4.7,
                subSources: [
                    { name: "Estate Taxes", amount: 28, percentage: 84.8 },
                    { name: "Gift Taxes", amount: 5, percentage: 15.2 }
                ]
            },
            { 
                source: "Federal Reserve Earnings", 
                amount: 58, 
                percentage: 1.3, 
                change: -42.1,
                subSources: [
                    { name: "Interest on Securities", amount: 58, percentage: 100.0 }
                ]
            },
            { 
                source: "Other", 
                amount: 255, 
                percentage: 5.5, 
                change: 6.8,
                subSources: [
                    { name: "Fees & Fines", amount: 120, percentage: 47.1 },
                    { name: "Miscellaneous Receipts", amount: 135, percentage: 52.9 }
                ]
            }
        ],
        
        // Debt data
        debt: {
            total: 33.7, // In trillions
            perCitizen: 101240, // In dollars
            gdpRatio: 123.4, // Percentage of GDP
            interestPayments: 663, // In billions
            historicalData: [
                { year: 2013, amount: 16.7 },
                { year: 2014, amount: 17.8 },
                { year: 2015, amount: 18.1 },
                { year: 2016, amount: 19.5 },
                { year: 2017, amount: 20.2 },
                { year: 2018, amount: 21.5 },
                { year: 2019, amount: 22.7 },
                { year: 2020, amount: 27.7 },
                { year: 2021, amount: 29.6 },
                { year: 2022, amount: 31.4 },
                { year: 2023, amount: 33.7 }
            ]
        }
    },
    
    // 2022 data
    2022: {
        overview: {
            totalBudget: 5.96,
            totalRevenue: 4.50,
            deficit: 1.46,
            nationalDebt: 31.4,
            gdp: 25.7,
            population: 331.9,
        },
        
        spending: [
            { 
                category: "Social Security", 
                amount: 1378, 
                percentage: 23.1, 
                change: 4.8,
                subDepartments: [
                    { name: "Retirement Benefits", amount: 910, percentage: 66.0 },
                    { name: "Disability Insurance", amount: 260, percentage: 18.9 },
                    { name: "Supplemental Security Income", amount: 150, percentage: 10.9 },
                    { name: "Administrative Costs", amount: 58, percentage: 4.2 }
                ]
            },
            { 
                category: "Medicare", 
                amount: 911, 
                percentage: 15.3, 
                change: 6.5,
                subDepartments: [
                    { name: "Hospital Insurance (Part A)", amount: 355, percentage: 39.0 },
                    { name: "Medical Insurance (Part B)", amount: 390, percentage: 42.8 },
                    { name: "Prescription Drugs (Part D)", amount: 120, percentage: 13.2 },
                    { name: "Medicare Advantage (Part C)", amount: 46, percentage: 5.0 }
                ]
            },
            { 
                category: "Medicaid & Health", 
                amount: 698, 
                percentage: 11.7, 
                change: -5.2,
                subDepartments: [
                    { name: "Medicaid", amount: 500, percentage: 71.6 },
                    { name: "Children's Health Insurance", amount: 80, percentage: 11.5 },
                    { name: "Public Health Services", amount: 73, percentage: 10.5 },
                    { name: "Health Research", amount: 45, percentage: 6.4 }
                ]
            },
            { 
                category: "Defense", 
                amount: 806, 
                percentage: 13.5, 
                change: 3.7,
                subDepartments: [
                    { name: "Operations & Maintenance", amount: 295, percentage: 36.6 },
                    { name: "Military Personnel", amount: 170, percentage: 21.1 },
                    { name: "Procurement", amount: 150, percentage: 18.6 },
                    { name: "Research & Development", amount: 115, percentage: 14.3 },
                    { name: "Military Construction", amount: 44, percentage: 5.5 },
                    { name: "Family Housing", amount: 32, percentage: 3.9 }
                ]
            },
            { 
                category: "Interest on Debt", 
                amount: 515, 
                percentage: 8.6, 
                change: 15.2,
                subDepartments: [
                    { name: "Marketable Securities", amount: 400, percentage: 77.7 },
                    { name: "Non-marketable Securities", amount: 115, percentage: 22.3 }
                ]
            },
            { 
                category: "Veterans Benefits", 
                amount: 284, 
                percentage: 4.8, 
                change: 7.6,
                subDepartments: [
                    { name: "Medical Care", amount: 135, percentage: 47.5 },
                    { name: "Disability Compensation", amount: 105, percentage: 37.0 },
                    { name: "Education & Training", amount: 25, percentage: 8.8 },
                    { name: "Other Benefits", amount: 19, percentage: 6.7 }
                ]
            },
            { 
                category: "Income Security", 
                amount: 685, 
                percentage: 11.5, 
                change: -28.3,
                subDepartments: [
                    { name: "SNAP (Food Stamps)", amount: 180, percentage: 26.3 },
                    { name: "Housing Assistance", amount: 140, percentage: 20.4 },
                    { name: "Child Nutrition", amount: 125, percentage: 18.2 },
                    { name: "Unemployment Compensation", amount: 150, percentage: 21.9 },
                    { name: "Earned Income Tax Credit", amount: 90, percentage: 13.2 }
                ]
            },
            { 
                category: "Transportation", 
                amount: 133, 
                percentage: 2.2, 
                change: 5.1,
                subDepartments: [
                    { name: "Highways & Roads", amount: 60, percentage: 45.1 },
                    { name: "Air Transportation", amount: 33, percentage: 24.8 },
                    { name: "Rail Transportation", amount: 24, percentage: 18.0 },
                    { name: "Public Transit", amount: 16, percentage: 12.1 }
                ]
            },
            { 
                category: "Education", 
                amount: 87.8, 
                percentage: 1.5, 
                change: -7.2,
                subDepartments: [
                    { name: "K-12 Education", amount: 40, percentage: 45.6 },
                    { name: "Higher Education", amount: 32, percentage: 36.4 },
                    { name: "Student Financial Aid", amount: 11, percentage: 12.5 },
                    { name: "Research & General Education", amount: 4.8, percentage: 5.5 }
                ]
            },
            { 
                category: "International Affairs", 
                amount: 65.9, 
                percentage: 1.1, 
                change: 1.8,
                subDepartments: [
                    { name: "Foreign Aid", amount: 34, percentage: 51.6 },
                    { name: "Diplomatic Operations", amount: 19.5, percentage: 29.6 },
                    { name: "International Organizations", amount: 12.4, percentage: 18.8 }
                ]
            },
            { 
                category: "Science & Technology", 
                amount: 36.1, 
                percentage: 0.6, 
                change: 4.9,
                subDepartments: [
                    { name: "NASA", amount: 22.5, percentage: 62.3 },
                    { name: "National Science Foundation", amount: 8.1, percentage: 22.4 },
                    { name: "Energy Research", amount: 5.5, percentage: 15.3 }
                ]
            },
            { 
                category: "Agriculture", 
                amount: 26.3, 
                percentage: 0.4, 
                change: -2.5,
                subDepartments: [
                    { name: "Farm Support", amount: 12.5, percentage: 47.5 },
                    { name: "Agricultural Research", amount: 7.8, percentage: 29.7 },
                    { name: "Conservation Programs", amount: 6, percentage: 22.8 }
                ]
            },
            { 
                category: "Natural Resources & Environment", 
                amount: 48.5, 
                percentage: 0.8, 
                change: 6.8,
                subDepartments: [
                    { name: "Environmental Protection", amount: 20, percentage: 41.2 },
                    { name: "National Parks", amount: 11.5, percentage: 23.7 },
                    { name: "Forest Service", amount: 9.5, percentage: 19.6 },
                    { name: "Water Resources", amount: 7.5, percentage: 15.5 }
                ]
            },
            { 
                category: "Justice", 
                amount: 70.0, 
                percentage: 1.2, 
                change: 3.5,
                subDepartments: [
                    { name: "Federal Law Enforcement", amount: 33.5, percentage: 47.9 },
                    { name: "Federal Courts", amount: 19.5, percentage: 27.9 },
                    { name: "Federal Prisons", amount: 11.5, percentage: 16.4 },
                    { name: "Criminal Justice Assistance", amount: 5.5, percentage: 7.8 }
                ]
            },
            { 
                category: "Other", 
                amount: 366.0, 
                percentage: 6.1, 
                change: -12.7,
                subDepartments: [
                    { name: "Community Development", amount: 97, percentage: 26.5 },
                    { name: "Disaster Relief", amount: 87, percentage: 23.8 },
                    { name: "General Government", amount: 76, percentage: 20.8 },
                    { name: "Commerce & Housing", amount: 66, percentage: 18.0 },
                    { name: "Social Services", amount: 40, percentage: 10.9 }
                ]
            }
        ],
        
        revenue: [
            { 
                source: "Individual Income Taxes", 
                amount: 2180, 
                percentage: 48.4, 
                change: 23.1,
                subSources: [
                    { name: "Withholding", amount: 1800, percentage: 82.6 },
                    { name: "Estimated Payments", amount: 270, percentage: 12.4 },
                    { name: "Final Payments", amount: 110, percentage: 5.0 }
                ]
            },
            { 
                source: "Payroll Taxes", 
                amount: 1380, 
                percentage: 30.7, 
                change: 9.2,
                subSources: [
                    { name: "Social Security", amount: 900, percentage: 65.2 },
                    { name: "Medicare", amount: 330, percentage: 23.9 },
                    { name: "Unemployment Insurance", amount: 150, percentage: 10.9 }
                ]
            },
            { 
                source: "Corporate Income Taxes", 
                amount: 460, 
                percentage: 10.2, 
                change: 14.5,
                subSources: [
                    { name: "Domestic Corporations", amount: 350, percentage: 76.1 },
                    { name: "Foreign Corporations", amount: 110, percentage: 23.9 }
                ]
            },
            { 
                source: "Excise Taxes", 
                amount: 84.3, 
                percentage: 1.9, 
                change: 15.7,
                subSources: [
                    { name: "Fuel Taxes", amount: 38, percentage: 45.1 },
                    { name: "Tobacco Taxes", amount: 19.5, percentage: 23.1 },
                    { name: "Alcohol Taxes", amount: 14.8, percentage: 17.6 },
                    { name: "Other Excise Taxes", amount: 12, percentage: 14.2 }
                ]
            },
            { 
                source: "Customs Duties", 
                amount: 97.1, 
                percentage: 2.2, 
                change: 18.2,
                subSources: [
                    { name: "Import Tariffs", amount: 97.1, percentage: 100.0 }
                ]
            },
            { 
                source: "Estate and Gift Taxes", 
                amount: 31.5, 
                percentage: 0.7, 
                change: 25.0,
                subSources: [
                    { name: "Estate Taxes", amount: 26.5, percentage: 84.1 },
                    { name: "Gift Taxes", amount: 5, percentage: 15.9 }
                ]
            },
            { 
                source: "Federal Reserve Earnings", 
                amount: 100.1, 
                percentage: 2.2, 
                change: -32.5,
                subSources: [
                    { name: "Interest on Securities", amount: 100.1, percentage: 100.0 }
                ]
            },
            { 
                source: "Other", 
                amount: 238.7, 
                percentage: 5.3, 
                change: 4.2,
                subSources: [
                    { name: "Fees & Fines", amount: 110, percentage: 46.1 },
                    { name: "Miscellaneous Receipts", amount: 128.7, percentage: 53.9 }
                ]
            }
        ],
        
        debt: {
            total: 31.4,
            perCitizen: 94607,
            gdpRatio: 122.2,
            interestPayments: 515,
            historicalData: [
                { year: 2012, amount: 16.1 },
                { year: 2013, amount: 16.7 },
                { year: 2014, amount: 17.8 },
                { year: 2015, amount: 18.1 },
                { year: 2016, amount: 19.5 },
                { year: 2017, amount: 20.2 },
                { year: 2018, amount: 21.5 },
                { year: 2019, amount: 22.7 },
                { year: 2020, amount: 27.7 },
                { year: 2021, amount: 29.6 },
                { year: 2022, amount: 31.4 }
            ]
        }
    },
    
    // 2021 data
    2021: {
        overview: {
            totalBudget: 6.82,
            totalRevenue: 4.05,
            deficit: 2.77,
            nationalDebt: 29.6,
            gdp: 23.3,
            population: 331.5,
        },
        
        spending: [
            { 
                category: "Social Security", 
                amount: 1315, 
                percentage: 19.3, 
                change: 3.1,
                subDepartments: [
                    { name: "Retirement Benefits", amount: 870, percentage: 66.2 },
                    { name: "Disability Insurance", amount: 245, percentage: 18.6 },
                    { name: "Supplemental Security Income", amount: 145, percentage: 11.0 },
                    { name: "Administrative Costs", amount: 55, percentage: 4.2 }
                ]
            },
            { 
                category: "Medicare", 
                amount: 856, 
                percentage: 12.6, 
                change: 3.7,
                subDepartments: [
                    { name: "Hospital Insurance (Part A)", amount: 335, percentage: 39.1 },
                    { name: "Medical Insurance (Part B)", amount: 365, percentage: 42.6 },
                    { name: "Prescription Drugs (Part D)", amount: 115, percentage: 13.4 },
                    { name: "Medicare Advantage (Part C)", amount: 41, percentage: 4.9 }
                ]
            },
            { 
                category: "Medicaid & Health", 
                amount: 736, 
                percentage: 10.8, 
                change: 14.3,
                subDepartments: [
                    { name: "Medicaid", amount: 530, percentage: 72.0 },
                    { name: "Children's Health Insurance", amount: 85, percentage: 11.5 },
                    { name: "Public Health Services", amount: 76, percentage: 10.3 },
                    { name: "Health Research", amount: 45, percentage: 6.2 }
                ]
            },
            { 
                category: "Defense", 
                amount: 777, 
                percentage: 11.4, 
                change: 1.2,
                subDepartments: [
                    { name: "Operations & Maintenance", amount: 285, percentage: 36.7 },
                    { name: "Military Personnel", amount: 165, percentage: 21.2 },
                    { name: "Procurement", amount: 145, percentage: 18.7 },
                    { name: "Research & Development", amount: 110, percentage: 14.2 },
                    { name: "Military Construction", amount: 42, percentage: 5.4 },
                    { name: "Family Housing", amount: 30, percentage: 3.9 }
                ]
            },
            {
                category: "Interest on Debt",
                amount: 447,
                percentage: 6.6,
                change: 10.1,
                subDepartments: [
                    { name: "Marketable Securities", amount: 350, percentage: 78.3 },
                    { name: "Non-marketable Securities", amount: 97, percentage: 21.7 }
                ]
            },
            {
                category: "Veterans Benefits",
                amount: 264,
                percentage: 3.9,
                change: 6.9,
                subDepartments: [
                    { name: "Medical Care", amount: 125, percentage: 47.3 },
                    { name: "Disability Compensation", amount: 100, percentage: 37.9 },
                    { name: "Education & Training", amount: 22, percentage: 8.3 },
                    { name: "Other Benefits", amount: 17, percentage: 6.5 }
                ]
            },
            {
                category: "Income Security",
                amount: 955,
                percentage: 14.0,
                change: 42.5,
                subDepartments: [
                    { name: "SNAP (Food Stamps)", amount: 220, percentage: 23.0 },
                    { name: "Housing Assistance", amount: 190, percentage: 19.9 },
                    { name: "Child Nutrition", amount: 175, percentage: 18.3 },
                    { name: "Unemployment Compensation", amount: 280, percentage: 29.3 },
                    { name: "Earned Income Tax Credit", amount: 90, percentage: 9.5 }
                ]
            }
        ],
        
        revenue: [
            // Revenue data for 2021 (similar structure to 2022)
        ],
        
        debt: {
            total: 29.6,
            perCitizen: 89290,
            gdpRatio: 127.0,
            interestPayments: 447,
            historicalData: [
                { year: 2011, amount: 14.8 },
                { year: 2012, amount: 16.1 },
                { year: 2013, amount: 16.7 },
                { year: 2014, amount: 17.8 },
                { year: 2015, amount: 18.1 },
                { year: 2016, amount: 19.5 },
                { year: 2017, amount: 20.2 },
                { year: 2018, amount: 21.5 },
                { year: 2019, amount: 22.7 },
                { year: 2020, amount: 27.7 },
                { year: 2021, amount: 29.6 }
            ]
        }
    }
};

/**
 * Budget Data Processor - Processes budget data for visualization
 */
const BudgetDataProcessor = {
    /**
     * Get all data for a specific year
     * @param {number} year - The fiscal year
     * @returns {Object} The year's budget data
     */
    getYearData: function(year) {
        return budgetData[year] || budgetData[2023]; // Default to 2023 if year not found
    },
    
    /**
     * Get spending data formatted for charts
     * @param {number} year - The fiscal year
     * @returns {Object} Formatted spending data for charts
     */
    getSpendingChartData: function(year) {
        const yearData = this.getYearData(year);
        const spendingData = yearData.spending;
        
        // Sort by amount (descending)
        const sortedData = [...spendingData].sort((a, b) => b.amount - a.amount);
        
        // Prepare data for charts
        return {
            labels: sortedData.map(item => item.category),
            values: sortedData.map(item => item.amount),
            percentages: sortedData.map(item => item.percentage),
            colors: this.generateColors(sortedData.length)
        };
    },
    
    /**
     * Get revenue data formatted for charts
     * @param {number} year - The fiscal year
     * @returns {Object} Formatted revenue data for charts
     */
    getRevenueChartData: function(year) {
        const yearData = this.getYearData(year);
        const revenueData = yearData.revenue;
        
        // Sort by amount (descending)
        const sortedData = [...revenueData].sort((a, b) => b.amount - a.amount);
        
        // Prepare data for charts
        return {
            labels: sortedData.map(item => item.source),
            values: sortedData.map(item => item.amount),
            percentages: sortedData.map(item => item.percentage),
            colors: this.generateColors(sortedData.length)
        };
    },
    
    /**
     * Get debt history data formatted for charts
     * @param {number} year - The fiscal year
     * @returns {Object} Formatted debt history data for charts
     */
    getDebtHistoryChartData: function(year) {
        const yearData = this.getYearData(year);
        const historicalData = yearData.debt.historicalData;
        
        // Prepare data for charts
        return {
            labels: historicalData.map(item => item.year.toString()),
            values: historicalData.map(item => item.amount)
        };
    },
    
    /**
     * Compare data between two years
     * @param {number} year1 - First year to compare
     * @param {number} year2 - Second year to compare
     * @param {string} compareType - Type of comparison (spending, revenue, deficit)
     * @returns {Object} Comparison data for charts
     */
    compareYears: function(year1, year2, compareType) {
        const year1Data = this.getYearData(parseInt(year1));
        const year2Data = this.getYearData(parseInt(year2));
        
        if (compareType === 'spending') {
            // Get top 5 spending categories for comparison
            const year1Spending = [...year1Data.spending].sort((a, b) => b.amount - a.amount).slice(0, 5);
            const year2Spending = year2Data.spending;
            
            const categories = year1Spending.map(item => item.category);
            const values1 = year1Spending.map(item => item.amount);
            const values2 = categories.map(category => {
                const match = year2Spending.find(item => item.category === category);
                return match ? match.amount : 0;
            });
            
            return { categories, values1, values2 };
        } else if (compareType === 'revenue') {
            // Get top 5 revenue sources for comparison
            const year1Revenue = [...year1Data.revenue].sort((a, b) => b.amount - a.amount).slice(0, 5);
            const year2Revenue = year2Data.revenue;
            
            const categories = year1Revenue.map(item => item.source);
            const values1 = year1Revenue.map(item => item.amount);
            const values2 = categories.map(source => {
                const match = year2Revenue.find(item => item.source === source);
                return match ? match.amount : 0;
            });
            
            return { categories, values1, values2 };
        } else if (compareType === 'deficit') {
            // Compare deficit, debt, and GDP
            const categories = ['Budget', 'Revenue', 'Deficit', 'Debt', 'GDP'];
            const values1 = [
                year1Data.overview.totalBudget * 1000, // Convert to billions
                year1Data.overview.totalRevenue * 1000,
                year1Data.overview.deficit * 1000,
                year1Data.overview.nationalDebt * 1000,
                year1Data.overview.gdp * 1000
            ];
            const values2 = [
                year2Data.overview.totalBudget * 1000,
                year2Data.overview.totalRevenue * 1000,
                year2Data.overview.deficit * 1000,
                year2Data.overview.nationalDebt * 1000,
                year2Data.overview.gdp * 1000
            ];
            
            return { categories, values1, values2 };
        }
        
        return null;
    },
    
    /**
     * Search budget data for a query
     * @param {string} query - The search query
     * @param {number} year - The fiscal year
     * @returns {Array} Search results
     */
    searchBudgetData: function(query, year) {
        const yearData = this.getYearData(parseInt(year));
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        // Search spending categories
        yearData.spending.forEach(item => {
            if (item.category.toLowerCase().includes(lowerQuery)) {
                results.push({
                    name: item.category,
                    type: 'Spending',
                    amount: item.amount,
                    percentage: item.percentage,
                    change: item.change
                });
            }
            
            // Search sub-departments
            if (item.subDepartments) {
                item.subDepartments.forEach(subDept => {
                    if (subDept.name.toLowerCase().includes(lowerQuery)) {
                        results.push({
                            name: subDept.name,
                            type: `${item.category} (Spending)`,
                            amount: subDept.amount,
                            percentage: subDept.percentage,
                            change: item.change
                        });
                    }
                });
            }
        });
        
        // Search revenue sources
        yearData.revenue.forEach(item => {
            if (item.source.toLowerCase().includes(lowerQuery)) {
                results.push({
                    name: item.source,
                    type: 'Revenue',
                    amount: item.amount,
                    percentage: item.percentage,
                    change: item.change
                });
            }
            
            // Search sub-sources
            if (item.subSources) {
                item.subSources.forEach(subSource => {
                    if (subSource.name.toLowerCase().includes(lowerQuery)) {
                        results.push({
                            name: subSource.name,
                            type: `${item.source} (Revenue)`,
                            amount: subSource.amount,
                            percentage: subSource.percentage,
                            change: item.change
                        });
                    }
                });
            }
        });
        
        return results;
    },
    
    /**
     * Generate colors for charts
     * @param {number} count - Number of colors needed
     * @returns {Array} Array of colors
     */
    generateColors: function(count) {
        const baseColors = [
            'rgba(54, 162, 235, 0.8)',   // Blue
            'rgba(255, 99, 132, 0.8)',   // Red
            'rgba(75, 192, 192, 0.8)',   // Green
            'rgba(255, 159, 64, 0.8)',   // Orange
            'rgba(153, 102, 255, 0.8)',  // Purple
            'rgba(255, 205, 86, 0.8)',   // Yellow
            'rgba(201, 203, 207, 0.8)',  // Grey
            'rgba(255, 99, 71, 0.8)',    // Tomato
            'rgba(50, 205, 50, 0.8)',    // Lime Green
            'rgba(0, 128, 128, 0.8)',    // Teal
            'rgba(138, 43, 226, 0.8)',   // Blue Violet
            'rgba(220, 20, 60, 0.8)',    // Crimson
            'rgba(0, 139, 139, 0.8)',    // Dark Cyan
            'rgba(184, 134, 11, 0.8)',   // Dark Goldenrod
            'rgba(169, 169, 169, 0.8)'   // Dark Grey
        ];
        
        // If we need more colors than in our base set, generate them
        if (count > baseColors.length) {
            const colors = [...baseColors];
            for (let i = baseColors.length; i < count; i++) {
                const r = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                colors.push(`rgba(${r}, ${g}, ${b}, 0.8)`);
            }
            return colors;
        }
        
        return baseColors.slice(0, count);
    }
};
