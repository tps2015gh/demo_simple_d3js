function drawCandlestick(containerId) {
    const data = [
        { date: 1, open: 10, high: 20, low: 5, close: 15 },
        { date: 2, open: 15, high: 25, low: 10, close: 20 },
        { date: 3, open: 20, high: 22, low: 12, close: 18 },
        { date: 4, open: 18, high: 30, low: 15, close: 25 },
        { date: 5, open: 25, high: 35, low: 20, close: 30 },
        { date: 6, open: 30, high: 32, low: 25, close: 28 },
        { date: 7, open: 28, high: 40, low: 20, close: 35 }
    ];

    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    d3.select(`#${containerId}`).selectAll("*").remove();

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([0, 50])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Wicks
    svg.selectAll(".wick")
        .data(data)
        .join("line")
        .attr("class", "wick")
        .attr("x1", d => x(d.date))
        .attr("x2", d => x(d.date))
        .attr("y1", d => y(d.high))
        .attr("y2", d => y(d.low))
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // Bodies
    svg.selectAll(".body")
        .data(data)
        .join("rect")
        .attr("class", "body")
        .attr("x", d => x(d.date) - 5)
        .attr("y", d => y(Math.max(d.open, d.close)))
        .attr("width", 10)
        .attr("height", d => Math.abs(y(d.open) - y(d.close)))
        .attr("fill", d => d.close > d.open ? "green" : "red")
        .attr("stroke", "black");
}
