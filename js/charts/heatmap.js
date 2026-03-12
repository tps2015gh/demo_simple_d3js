function drawHeatmap(containerId) {
    const myGroups = ["A", "B", "C", "D", "E"];
    const myVars = ["v1", "v2", "v3", "v4", "v5"];
    const data = [];
    for (let g of myGroups) {
        for (let v of myVars) {
            data.push({ group: g, variable: v, value: Math.floor(Math.random() * 100) });
        }
    }

    const margin = { top: 30, right: 30, bottom: 30, left: 30 },
        width = 450 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    d3.select(`#${containerId}`).selectAll("*").remove();

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(myGroups)
        .padding(0.01);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    const y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.01);
    svg.append("g")
        .call(d3.axisLeft(y));

    const myColor = d3.scaleLinear()
        .range(["white", "#69b3a2"])
        .domain([1, 100]);

    svg.selectAll()
        .data(data)
        .join("rect")
        .attr("x", d => x(d.group))
        .attr("y", d => y(d.variable))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", d => myColor(d.value));
}
