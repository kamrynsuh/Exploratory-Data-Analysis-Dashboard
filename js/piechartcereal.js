function load_piechart(svg_name, data) {

    // General Variables
    let chart = d3.select(svg_name);
    let chart_width  = $(svg_name).width();
    let chart_height = $(svg_name).height();
    let radius = Math.min(chart_width, chart_height) / 2 - 40;

    let g = chart.append("g")
        .attr("transform", "translate(" + chart_width / 2 + "," + chart_height / 2 + ")");

    let colorScale = d3.scaleOrdinal()
        .domain(data)
        .range(['#4b7fb3', '#9c63d4', '#6bb576']);
        
    // legend, reference: https://www.d3-graph-gallery.com/graph/custom_legend.html
    let color = d3.scaleOrdinal(["#4b7fb3", "#9c63d4", "#6bb576"]);
    let cereal = ["Cinnamon Toast Crunch", "Cheerios", "Raisin Nut Bran"]
    
    chart.selectAll("mydots")
        .data(cereal)
        .enter()
        .append("circle")
        .attr("cx", 720)
        .attr("cy", function(d, i) { return 50 + i * 25})
        .attr("r", 7)
        .style("fill", function(d) { return color(d)})

    chart.selectAll("mylabels")
        .data(cereal)
        .enter()
        .append("text")
        .attr("x", 735)
        .attr("y", function(d, i) { return 50 + i * 25})
        .style("fill", function(d) { return color(d)})
        .text(function(d) { return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
    
    chart.append("text")
        .attr("class", "y label")
        .text("Consumer Report Rating (%) by Cereal Brands")
        .attr("x", 290)
        .attr("y", 30)
        .style("text-anchor", "end")
        .attr("font-weight", function(d, i) {return i * 500 + 500;})
        .style("text-decoration", "underline")
        .style("font-size", 13)
        .style("fill","#000000");  
    
    // pie, reference https://www.educative.io/edpresso/how-to-create-a-pie-chart-using-d3
    var tooltip = d3.select("body").append("div").attr("class", "toolwip");
    
    let pie = d3.pie().value(function(d) { 
        return d.rating; 
    });

    let arc = g.selectAll("arc")
        .data(pie(data))
        .enter();

    let path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    var highlighting = function(d) {
            chart.selectAll("dot")
                .transition().duration(200)
                .style("fill", "#ffca9c")
                .style("opacity", "0.4")
            d3.select(this)
                .transition().duration(200)
                .style("fill", "#ffca9c")
                .style("opacity", "1")
                tooltip
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                    .style("display", "inline-block")
                    .html("<b>Cereal: </b>" + (d.data.namePie) + "<br>" + "<b>Rating: </b>" + d3.format(".1f")(d.data.rating) + "%");
        }
        var nothighlighting = function(data) {
            chart.selectAll("path")
                .transition().duration(100).delay(200)
                .style("fill", function(d) { return (colorScale(d.data.namePie))})
                .style("opacity", "1")
                tooltip.style("display", "none"); 
        }


    arc.append("path")
        .attr("d", path)
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .attr("fill", function(d) { return colorScale(d.data.namePie); })
        .on("mouseover", highlighting)
        .on("mouseleave", nothighlighting);

    let label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);
 
    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .text(function(d) { return d.data.rating + "%"; })
        .style("text-anchor", "middle")
        .style("font-size", 14);
}
