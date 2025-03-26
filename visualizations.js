/**
 * FiscalFun - Budget Explorer
 * Visualizations Module - D3.js visualizations
 */

// Create a D3.js treemap visualization
function createTreemap(elementId, data) {
    console.log('createTreemap called with elementId:', elementId, 'and data:', data);
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
    } catch (error) {
        console.error('Error creating treemap:', error);
    }
}

// Create a D3.js bubble chart
function createBubbleChart(elementId, data) {
    console.log('createBubbleChart called with elementId:', elementId, 'and data:', data);
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
    } catch (error) {
        console.error('Error creating bubble chart:', error);
    }
}