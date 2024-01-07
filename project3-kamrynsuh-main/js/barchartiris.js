// reference: https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7
function load_barchart(svg_name, data){

    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();

    // x position scale
	let x = d3.scaleBand()
        .domain(data.map(function(d) { return d.iris; }))
        .padding(0.2)
		.range([70, chart_width - 130]);
    
	// y position scale
	let y = d3.scaleLinear()
        .domain([0, 6])
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
        .text("Petal Length (in cm)")
        .attr("transform", "rotate(-90)")
        .attr("x", -200)
        .attr("y", 25)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "end")
        .style("fill","#000000"); 

    chart.append("text")
        .attr("class", "y label")
        .text("Petal Length (in cm) by classes of Iris")
        .attr("x", 550)
        .attr("y", 30)
        .style("text-anchor", "end")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-decoration", "underline")
        .style("fill","#000000");  

    chart.append("text")
        .attr("class", "x axis")
        .text("Classes of Iris")
        .attr("x", 420)
        .attr("y", 485)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "middle")
        .style("fill","#000000"); 

    // legend, reference: https://www.d3-graph-gallery.com/graph/custom_legend.html
    //let color = d3.scaleOrdinal(["#ffa600", "#ff6361", "#bc5090"]);

    let countries = ["Iris-setosa", "Iris-versicolor", "Iris-virginica"]
    let color = d3.scaleOrdinal()
        .domain(["Iris-setosa", "Iris-versicolor", "Iris-virginica"])
        .range(["#ffa600", "#ff6361", "#bc5090"])


    chart.selectAll("mydots")
        .data(countries)
        .enter()
        .append("circle")
        .attr("cx", 780)
        .attr("cy", function(d, i) { return 50 + i * 25})
        .attr("r", 7)
        .style("fill", function(d) { return color(d)})

    chart.selectAll("mylabels")
        .data(countries)
        .enter()
        .append("text")
        .attr("x", 800)
        .attr("y", function(d, i) { return 50 + i * 25})
        .style("fill", function(d) { return color(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        
    var tooltip = d3.select("body").append("div").attr("class", "toolkip");
    
    var highlighting = function(d) {
        d3.selectAll("rect")
            .transition().duration(200)
            .style("fill", "#d481a8")
            .style("opacity", "0.4")
        d3.select(this)
            .transition().duration(200)
            .style("fill", "#4a1535")
            .style("opacity", "1")
            tooltip
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px")
                .style("display", "inline-block")
                .html("<b>Class: </b>" + (d.iris) + "<br>" + "<b>Petal length: </b>" + d3.format(".2f")(d.petal));
    }
    var nothighlighting = function(data) {
        d3.selectAll("rect")
            .transition().duration(200).delay(200)
            .style("fill", function(data) { return (color(data.iris))})
            .style("opacity", "1")
            tooltip.style("display", "none"); 
    }
	// generate bar graph
	let barGraph = chart.selectAll("bar")
		.data(data).enter()
		.append("rect")
		.attr("x", function(data) { return x(data.iris); })
		.attr("y", function(data) { return y(data.petal); })
        .attr("height", function(data) { return 451 - y(data.petal); })
        .attr("width", x.bandwidth())
        .attr("fill", function(d, i) {
            return color(d.iris);
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