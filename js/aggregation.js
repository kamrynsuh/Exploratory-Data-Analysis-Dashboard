function load_aggregation(svg_name, data1){

    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();

    let x = d3.scaleLinear()
        .domain([50, 170])
        .range([70, chart_width - 100]);

    xAxis = d3.axisBottom()
        .scale(x);
    var xAxisGroup = chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (chart_height - 45) + ")")
        .call(xAxis);     
    

    var histogram = d3.histogram()
        .value(function(d) { return d.calories; })
        .domain(x.domain())
        .thresholds(x.ticks(10));
    var bins = histogram(data1);
   
    // y position scale
    let y = d3.scaleLinear()
        y.domain([0, d3.max(bins, function(d) { return d.length;})])
        .range([chart_height - 50, 70]);
    yAxis = d3.axisLeft()
        .scale(y);
    var yAxisGroup = chart.append("g")
        .attr("class", "axis")
        .attr("transform","translate(60,0)")
        .call(yAxis);

    chart.append("text")
        .attr("class", "y label")
        .text("Count")
        .attr("transform", "rotate(-90)")
        .attr("x", -240)
        .attr("y", 25)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "end")
        .style("fill","#000000"); 

    chart.append("text")
        .attr("class", "y label")
        .text("Calories (per serving) by Count of All Cereal Brands")
        .attr("x", 650)
        .attr("y", 30)
        .style("text-anchor", "end")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-decoration", "underline")
        .style("fill","#000000");  

    chart.append("text")
        .attr("class", "x axis")
        .text("Calories (per serving)")
        .attr("x", 420)
        .attr("y", 485)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "middle")
        .style("fill","#000000"); 

    var tooltip = d3.select("body").append("div").attr("class", "toolkip");

        var highlighting = function(d) {
            chart.selectAll("rect")
                .transition().duration(200)
                .style("fill", "#ffca9c")
                .style("opacity", "0.4")
            d3.select(this)
                .transition().duration(200)
                .style("fill", "#1b294a")
                .style("opacity", "1")
                tooltip
                .style("visibility", "visible")
                .html(`<b>Count: </b>${d.length} <br> <b>x0:</b> ${d.x0} <br> <b>x1:</b> ${d.x1}`)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px")
        }
        var nothighlighting = function(d) {
            chart.selectAll("rect")
                .transition().duration(200).delay(200)
                .style("fill", "#9c63d4")
                .style("opacity", "1")
                tooltip.style("visibility", "hidden");
        }

    chart.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("stroke", "black")
        .style("stroke-width", "1.5px")
        .attr("width", function(d) { return x(d.x1) - x(d.x0); })
        .attr("height", function(d) { return 451 - y(d.length); })
        .style("fill", "#9c63d4")
        .on("mouseover", highlighting)
        .on("mouseleave", nothighlighting)
}