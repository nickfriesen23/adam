/**
 * FiscalFun - Budget Explorer
 * Visualizations Module - D3.js visualizations
 */

// Show loading indicator for D3 visualizations
function showD3LoadingIndicator(containerId) {
    const container = document.getElementById(containerId).parentElement;
    
    // Create loading indicator if it doesn't exist
    if (!document.getElementById(`${containerId}-d3-loading`)) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = `${containerId}-d3-loading`;
        loadingDiv.className = 'chart-loading';
        loadingDiv.innerHTML = `
            <div class="d3-spinner"></div>
            <p>Creating visualization...</p>
        `;
        loadingDiv.style.position = 'absolute';
        loadingDiv.style.top = '0';
        loadingDiv.style.left = '0';
        loadingDiv.style.width = '100%';
        loadingDiv.style.height = '100%';
        loadingDiv.style.display = 'flex';
        loadingDiv.style.flexDirection = 'column';
        loadingDiv.style.alignItems = 'center';
        loadingDiv.style.justifyContent = 'center';
        loadingDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        loadingDiv.style.zIndex = '10';
        
        // Add spinner styles if not already added
        if (!document.getElementById('d3-spinner-style')) {
            const style = document.createElement('style');
            style.id = 'd3-spinner-style';
            style.textContent = `
                .d3-spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border-left-color: #4361ee;
                    animation: d3spin 1s linear infinite;
                }
                
                @keyframes d3spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.style.position = 'relative';
        container.appendChild(loadingDiv);
    } else {
        document.getElementById(`${containerId}-d3-loading`).style.display = 'flex';
    }
}

// Hide loading indicator for D3 visualizations
function hideD3LoadingIndicator(containerId) {
    const loadingElement = document.getElementById(`${containerId}-d3-loading`);
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Create a D3.js treemap visualization with loading indicator
function createTreemap(elementId, data) {
    console.log('createTreemap called with elementId:', elementId, 'and data:', data);
    
    // Show loading indicator
    showD3LoadingIndicator(elementId);
    try {
        // Get the chart container
        let parentContainer = document.querySelector(`.chart-container:has(#${elementId})`);
        if (!parentContainer) {
            // If we can't find the container with the element (it might have been removed),
            // look for the container directly
            parentContainer = document.querySelector(`.visualization-container .chart-container`);
        }
        
        if (!parentContainer) {
            console.error('Chart container not found');
            return;
        }
        console.log('Chart container found:', parentContainer);
        
        // Check for existing elements and remove them
        const existingTreemap = document.getElementById(elementId + '-treemap');
        const existingBubble = document.getElementById(elementId + '-bubble');
        
        if (existingTreemap) {
            existingTreemap.remove();
        }
        
        if (existingBubble) {
            existingBubble.remove();
        }
        
        // Clear the container
        parentContainer.innerHTML = '';
        
        // Create a new canvas element for future Chart.js use
        const canvas = document.createElement('canvas');
        canvas.id = elementId;
        parentContainer.appendChild(canvas);
        
        if (existingTreemap) {
            existingTreemap.remove();
        }
        
        if (existingBubble) {
            existingBubble.remove();
        }
        
        // Create a new div for the treemap
        const treemapDiv = document.createElement('div');
        treemapDiv.id = elementId + '-treemap';
        treemapDiv.style.width = '100%';
        treemapDiv.style.height = '400px';
        parentContainer.appendChild(treemapDiv);
        console.log('Created treemap div');
        
        const width = treemapDiv.clientWidth;
        const height = 400;
        console.log('Width:', width, 'Height:', height);
        
        const svg = d3.select(`#${elementId}-treemap`)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        console.log('SVG created with width:', width, 'and height:', height);
        
        // Prepare data for treemap
        const hierarchyData = {children: data.labels.map((label, i) => ({
            name: label,
            value: data.values[i],
            percentage: data.percentages[i]
        }))};
        console.log('Hierarchy data:', hierarchyData);
        
        const root = d3.hierarchy(hierarchyData)
            .sum(d => d.value);
        console.log('Hierarchy root created:', root);
        
        // Create treemap layout
        const treemap = d3.treemap()
            .size([width, height])
            .padding(2);
        console.log('Treemap layout created');
        
        treemap(root);
        console.log('Treemap layout applied to root');
        
        // Add rectangles
        const cell = svg.selectAll('g')
            .data(root.leaves())
            .enter().append('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);
        console.log('Cell groups created:', cell.size());
        
        cell.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', (d, i) => data.colors[i % data.colors.length])
            .attr('stroke', '#fff');
        console.log('Rectangles added');
        
        // Add text labels
        cell.append('text')
            .attr('x', 5)
            .attr('y', 15)
            .attr('fill', 'white')
            .text(d => d.data.name)
            .attr('font-size', '12px')
            .attr('font-weight', 'bold');
        console.log('Name labels added');
        
        cell.append('text')
            .attr('x', 5)
            .attr('y', 30)
            .attr('fill', 'white')
            .text(d => `$${d.data.value}B (${d.data.percentage}%)`)
            .attr('font-size', '10px');
        console.log('Value labels added');
        
        // Hide loading indicator when treemap is ready
        hideD3LoadingIndicator(elementId);
    } catch (error) {
        console.error('Error creating treemap:', error);
    }
}

// Create a D3.js bubble chart with loading indicator
function createBubbleChart(elementId, data) {
    console.log('createBubbleChart called with elementId:', elementId, 'and data:', data);
    
    // Show loading indicator
    showD3LoadingIndicator(elementId);
    try {
        // Get the chart container
        let parentContainer = document.querySelector(`.chart-container:has(#${elementId})`);
        if (!parentContainer) {
            // If we can't find the container with the element (it might have been removed),
            // look for the container directly
            parentContainer = document.querySelector(`.visualization-container .chart-container`);
        }
        
        if (!parentContainer) {
            console.error('Chart container not found');
            return;
        }
        console.log('Chart container found:', parentContainer);
        
        // Check for existing elements and remove them
        const existingTreemap = document.getElementById(elementId + '-treemap');
        const existingBubble = document.getElementById(elementId + '-bubble');
        
        if (existingTreemap) {
            existingTreemap.remove();
        }
        
        if (existingBubble) {
            existingBubble.remove();
        }
        
        // Clear the container
        parentContainer.innerHTML = '';
        
        // Create a new canvas element for future Chart.js use
        const canvas = document.createElement('canvas');
        canvas.id = elementId;
        parentContainer.appendChild(canvas);
        
        if (existingTreemap) {
            existingTreemap.remove();
        }
        
        if (existingBubble) {
            existingBubble.remove();
        }
        
        // Create a new div for the bubble chart
        const bubbleDiv = document.createElement('div');
        bubbleDiv.id = elementId + '-bubble';
        bubbleDiv.style.width = '100%';
        bubbleDiv.style.height = '400px';
        parentContainer.appendChild(bubbleDiv);
        console.log('Created bubble chart div');
        
        const width = bubbleDiv.clientWidth;
        const height = 400;
        console.log('Width:', width, 'Height:', height);
        
        const svg = d3.select(`#${elementId}-bubble`)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        console.log('SVG created');
        
        // Prepare data for bubble chart
        const bubbleData = data.labels.map((label, i) => ({
            name: label,
            value: data.values[i],
            percentage: data.percentages[i]
        }));
        console.log('Bubble data prepared:', bubbleData);
        
        // Create bubble layout
        const bubble = d3.pack()
            .size([width, height])
            .padding(2);
        console.log('Bubble layout created');
        
        const hierarchyData = {children: bubbleData};
        const root = d3.hierarchy(hierarchyData)
            .sum(d => d.value);
        console.log('Hierarchy root created:', root);
        
        bubble(root);
        console.log('Bubble layout applied to root');
        
        // Add circles
        const node = svg.selectAll('.node')
            .data(root.children)
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x},${d.y})`);
        console.log('Node groups created:', node.size());
        
        node.append('circle')
            .attr('r', d => d.r)
            .attr('fill', (d, i) => data.colors[i % data.colors.length])
            .attr('stroke', '#fff')
            .attr('stroke-width', 1);
        console.log('Circles added');
        
        // Add text labels
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '-0.5em')
            .attr('fill', 'white')
            .text(d => d.data.name)
            .attr('font-size', d => Math.min(d.r / 3, 12) + 'px')
            .attr('font-weight', 'bold');
        console.log('Name labels added');
        
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .attr('fill', 'white')
            .text(d => `$${d.data.value}B`)
            .attr('font-size', d => Math.min(d.r / 4, 10) + 'px');
        console.log('Value labels added');
        
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '2.2em')
            .attr('fill', 'white')
            .text(d => `(${d.data.percentage}%)`)
            .attr('font-size', d => Math.min(d.r / 4, 10) + 'px');
        console.log('Percentage labels added');
        
        // Hide loading indicator when bubble chart is ready
        hideD3LoadingIndicator(elementId);
    } catch (error) {
        console.error('Error creating bubble chart:', error);
    }
}