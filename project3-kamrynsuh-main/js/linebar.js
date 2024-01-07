function load_linechart(svg_name, data1, data2, data3, data4, data5){
    // Global variable
    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();

    // x position scale for time
	let x = d3.scaleLinear()
        //.domain[(0, 2020)]
    	.domain(d3.extent(data1, function(d) { return d.year1; }))
		.range([70, chart_width - 160]);

    // domain for y scale
    let peruExtent = d3.extent(data2,function(d){ return d.exports1; })
    let peruBottom = d3.min(peruExtent)
    let brazilExtent = d3.extent(data1,function(d){ return d.exports1; })
    let brazilTop = d3.max(brazilExtent)

	// y position scale for country
	let y = d3.scaleLinear()
		//.domain(d3.extent(data1,function(d){ return d.exports1; }))
        .domain([peruBottom, brazilTop])
		.range([chart_height - 52, 70]);

    // x position axis
    xAxis = d3.axisBottom()
        .scale(x)
        .tickFormat(d3.format("d"));
    var xAxisGroup = chart.append("g")
        .attr("class","axis")
        .attr("transform","translate(0," + ( chart_height - 45 ) + ")")
        .call(xAxis);  
    
    // y position axis
    yAxis = d3.axisLeft()
        .scale(y);
    var yAxisGroup = chart.append("g")
        .attr("class","axis")
        .attr("transform","translate(60,0)")
        .call(yAxis);

    // legend, reference: https://www.d3-graph-gallery.com/graph/custom_legend.html
    let color = d3.scaleOrdinal(["#ffa600", "#ff6361", "#bc5090", "#58508d", "#003f5c"]);

    let countries = ["Brazil", "Peru", "Chile", "Argentina", "Uruguay"]
    
    chart.selectAll("mydots")
        .data(countries)
        .enter()
        .append("circle")
        .attr("cx", 790)
        .attr("cy", function(d, i) { return 50 + i * 25}) 
        .attr("r", 7)
        .style("fill", function(d) { return color(d)})

    chart.selectAll("mylabels")
        .data(countries)
        .enter()
        .append("text")
        .attr("x", 810)
        .attr("y", function(d , i) { return 50 + i * 25}) 
        .style("fill", function(d) { return color(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    chart.append("text")
        .attr("class", "y label")
        .text("High-technology exports (% of manufactured exports)")
        .attr("transform", "rotate(-90)")
        .attr("x", -120)
        .attr("y", 30)
        .style("font-size", "12px")
        .attr("font-weight",function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "end")
        .style("fill","#000000"); 

    chart.append("text")
        .attr("class", "y label")
        .text("High-technology exports (% of manufactured exports) trends by Year")
        .attr("x", 650)
        .attr("y", 30)
        .style("text-anchor", "end")
        .style("text-decoration", "underline")
        .attr("font-weight",function(d, i) {return i * 500 + 500;})
        .style("fill","#000000");  

    chart.append("text")
        .attr("class", "y label")
        .style("font", "12px times")
        .text("Click above to add lines")
        .style("text-anchor", "end")
        .attr("x", 885)
        .attr("y", 400)
        .attr("font-weight",function(d, i) {return i * 500 + 500;})
        .style("fill","#000000");  
            

    chart.append("text")
        .attr("class", "x axis")
        .text("Year")
        .attr("x", 435)
        .attr("y", 485)
        .style("font-size", "12px")
        .attr("font-weight",function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "middle")
        .style("fill","#000000"); 

        
    // brazil line
    function updateBrazil(data) {
        chart.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#ffa600")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
            .x(function(data) { return x(data.year1) })
            .y(function(data) { return y(data.exports1) })
        )
    }

    // peru line
    function updatePeru(data) {
        chart.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#ff6361")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
            .x(function(data) { return x(data.year1) })
            .y(function(data) { return y(data.exports1) })
        ) 
    }

    // chile line
    function updateChile(data) {
        chart.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#bc5090")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
            .x(function(data) { return x(data.year1) })
            .y(function(data) { return y(data.exports1) })
        )    
    }

    // argentina line
    function updateArgentina(data) {
        chart.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#58508d")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
            .x(function(d) { return x(d.year1) })
            .y(function(d) { return y(d.exports1) })
        ) 
    }

    // uruguay line
    function updateUruguay(data) {
        chart.append("path")
            .datum(data5)
            .attr("fill", "none")
            .attr("stroke", "#003f5c")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
            .x(function(d) { return x(d.year1) })
            .y(function(d) { return y(d.exports1) })
        )  
    }

    d3.select("#brazil").on("click", function() {
        updateBrazil(data1)
    })
    d3.select("#peru").on("click", function() {
        updatePeru(data2)
    })
    d3.select("#chile").on("click", function() {
        updateChile(data3)
    })
    d3.select("#argentina").on("click", function() {
        updateArgentina(data4)
    })
    d3.select("#uruguay").on("click", function() {
        updateUruguay(data5)
    })
        
	// return chart
	return {
		chart : chart,
		chart_width : chart_width,
		chart_height : chart_height,
		x_scale : x,
		y_scale : y,
		//points : points
	}
}

//// BAR CHART ///////

function load_barchart(svg_name, data){

    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();

    // x position scale
	let x = d3.scaleBand()
        .domain(data.map(function(d) { return d.name; }))
        .padding(0.4)
		.range([70, chart_width - 130]);
    
	// y position scale
	let y = d3.scaleLinear()
        .domain([0, 15])
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
        .text("High-technology exports (% of manufactured exports)")
        .attr("transform", "rotate(-90)")
        .attr("x", -120)
        .attr("y", 25)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "end")
        .style("fill","#000000"); 

    chart.append("text")
        .attr("class", "y label")
        .text("High-technology exports (% of manufactured exports) by Countries (in year 2015)")
        .attr("x", 670)
        .attr("y", 30)
        .style("text-anchor", "end")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-decoration", "underline")
        .style("fill","#000000");  

    chart.append("text")
        .attr("class", "x axis")
        .text("Countries")
        .attr("x", 410)
        .attr("y", 485)
        .style("font-size", "12px")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-anchor", "middle")
        .style("fill","#000000"); 

    // legend, reference: https://www.d3-graph-gallery.com/graph/custom_legend.html
    let countries = ["Brazil", "Peru", "Chile", "Argentina", "Uruguay"]
    let color = d3.scaleOrdinal()
        .domain(["Brazil", "Peru", "Chile", "Argentina", "Uruguay"])
        .range(["#ffa600", "#ff6361", "#bc5090", "#58508d", "#003f5c"]);

        var highlight = function(data) {
    
            d3.selectAll("rect")
                .transition().duration(200)
                .style("stroke", "lightgrey")
                .style("opacity", "0.2")
            d3.select(this)
                .transition().duration(200)
                .style("fill", "black")
                .style("opacity", "1")
        }
    
        var unhighlight = function(d){
            d3.selectAll("rect")
                .transition().duration(200).delay(1000)
                .style("fill", function(d) { return (color(d.name))} )
                .style("opacity", "1")
        }
    
    chart.selectAll("mydots")
        .data(countries)
        .enter()
        .append("circle")
        .attr("cx", 790)
        .attr("cy", function(d, i) { return 50 + i * 25})
        .attr("r", 7)
        .style("fill", function(d) { return color(d)})

    chart.selectAll("mylabels")
        .data(countries)
        .enter()
        .append("text")
        .attr("x", 810)
        .attr("y", function(d, i) { return 50 + i * 25})
        .style("fill", function(d) { return color(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    var tooltip = d3.select("body").append("div").attr("class", "toolwip");
    
	// generate bar graph
	let barGraph = chart.selectAll("bar")
		.data(data).enter()
		.append("rect")
		.attr("x", function(data) { return x(data.name); })
		.attr("y", function(data) { return y(data.journal); })
        .attr("height", function(data) { return 451 - y(data.journal); })
        .attr("width", x.bandwidth())
        .attr("fill", function(d, i) {
            return color(i);
        })
        .on("mouseover", function(d) {
            d3.select(this)
                .transition().duration(100)
            	.attr("fill", "#4a1535");
            tooltip
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px")
                .style("display", "inline-block")
                .html("<b>Country: </b>" + (d.name) + "<br>" + "<b>Exports: </b>" + d3.format(".2f")(d.journal));
        })
        
        .on("mouseout", function(d, i) {
            d3.selectAll("rect")
                .transition().duration(50).delay(100);
            tooltip.style("display", "none");    
            d3.select(this).attr("fill", function() {
                return "" + color(d.name) + "";
            });
        })
        
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