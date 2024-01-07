// reference: https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7
function load_barchart(svg_name, data1){

    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();

    // x position scale
	let x = d3.scaleBand()
        .domain(data1.map(function(d) { return d.nameCereal; }))
        .padding(0.2)
		.range([70, chart_width - 130]);
    
	// y position scale
	let y = d3.scaleLinear()
        .domain([0, 300])
		.range([chart_height - 50, 70]);

    // x axis scale
    xAxis = d3.axisBottom()
        .scale(x);
    var xAxisGroup = chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (chart_height - 45) + ")")
        .call(xAxis);  
    
    // y axis scale
    yAxis = d3.axisLeft()
        .scale(y);
    var yAxisGroup = chart.append("g")
        .attr("class", "axis")
        .attr("transform","translate(60,0)")
        .call(yAxis);

    chart.append("text")
        .attr("class", "y label")
        .text("Sodium (mg)")
        .attr("transform", "rotate(-90)")
        .attr("x", -220)
        .attr("y", 20)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "end")
        .style("fill","#000000"); 

    chart.append("text")
        .attr("class", "y label")
        .text("Sodium levels (mg) by Brands of Cereal")
        .attr("x", 550)
        .attr("y", 30)
        .style("text-anchor", "end")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-decoration", "underline")
        .style("fill","#000000");  

    chart.append("text")
        .attr("class", "x axis")
        .text("Cereal Brands")
        .attr("x", 420)
        .attr("y", 485)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "middle")
        .style("fill","#000000"); 

    // legend, reference: https://www.d3-graph-gallery.com/graph/custom_legend.html
    //let color = d3.scaleOrdinal(["#ffa600", "#ff6361", "#bc5090"]);

    let cereal = ["Cinnamon Toast Crunch", "Cheerios", "Raisin Nut Bran"]
    let color = d3.scaleOrdinal()
        .domain(["Cinnamon Toast Crunch", "Cheerios", "Raisin Nut Bran"])
        .range(["#4b7fb3", "#9c63d4", "#64a860"]);


    chart.selectAll("mydots")
        .data(cereal)
        .enter()
        .append("circle")
        .attr("cx", 720)
        .attr("cy", function(d, i) { return 30 + i * 25})
        .attr("r", 6)
        .style("fill", function(d) { return color(d)})

    chart.selectAll("mylabels")
        .data(cereal)
        .enter()
        .append("text")
        .attr("x", 735)
        .attr("y", function(d, i) { return 30 + i * 25})
        .style("fill", function(d) { return color(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("alignment-baseline", "middle")
        
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
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px")
                .style("display", "inline-block")
                .html("<b>Cereal: </b>" + (d.nameCereal) + "<br>" + "<b>Sodium: </b>" + (d.sodium) + "mg");
    }
    var nothighlighting = function(data) {
        chart.selectAll("rect")
            .transition().duration(200).delay(200)
            .style("fill", function(d) { return (color(d.nameCereal))})
            .style("opacity", "1")
            tooltip.style("display", "none"); 
    }
	// generate bar graph
	let barGraph = chart.selectAll("bar")
		.data(data1).enter()
		.append("rect")
		.attr("x", function(d) { return x(d.nameCereal); })
		.attr("y", function(d) { return y(d.sodium); })
        .attr("height", function(d) { return 451 - y(d.sodium); })
        .attr("width", x.bandwidth())
        .attr("fill", function(d, i) {
            return color(d.nameCereal);
        })
        .on("mouseover", highlighting)
        .on("mouseleave", nothighlighting)

	// return chart
	return {
		chart : chart,
		chart_width : chart_width,
		chart_height : chart_height,
		x_scale : x,
		y_scale : y,
		barGraph : barGraph
	}
}