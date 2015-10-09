//Now let's determine the size of the plots
var margin = {t:100,r:50,b:100,l:50},
    width = document.getElementById('canvas').clientWidth - margin.l - margin.r,
    height = document.getElementById('canvas').clientHeight - margin.t - margin.b;

//Set up SVG drawing elements
var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width', width + margin.l + margin.r)
    .attr('height', height + margin.t + margin.b)
    .append('g')
    .attr('transform','translate('+margin.l+','+margin.t+')');

console.log("Start to load data...")

//Now we have load in data
//...
d3.csv('data/data.csv',
    function(d){
        //accessor function
        //is run for every row in the table
        //with d representing unparsed, unchanged row as is
        //whatever we return is going to replace that
        return {
          x: +d.x,
          y: +d.y,
          r: +d.r
        };
    },
    function(error,rows){
        console.log("Data is loaded");
        draw(rows)
    });

function draw(rows){
    console.log("Starting drawing with data");

    //Drawing axes
    //There is a better way to do this, but for now this is fine
    //Does this block of code need to be here?
    canvas.append('rect')
        .attr('width',width)
        .attr('height',height)
        .attr('class','border')
        .style('fill','white')
    //draw ticks
    for(var y = height; y > 0; y-=100){
        canvas.append('line')
            .attr('class','tick')
            .attr('x1',0)
            .attr('x2',width)
            .attr('y1',y)
            .attr('y2',y);
    }


    //Iterate over "rows" and draw circles to represent each data point
    rows.forEach(function(row){
       canvas.append('circle')
           .attr('cx',row.x)
           .attr('cy',row.y)
           .attr('r',row.r)
           .style('fill','black');
    });
}


