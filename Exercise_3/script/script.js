//Take a moment to set up the drawing environment yourself
var width = $('.canvas').width(),
    height = $('.canvas').height();

var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width',width)
    .attr('height',height)
    .append('g');


var scaleX = d3.scale.linear()
    .range([0,width]);
var scaleY = d3.scale.linear()
    .range([height,0]);

//TODO step 1: load and parse data
d3.csv('data/world_bank_2013.csv',
    function(d){
        //accessor function
        //is run for every row in the table
        //with d representing unparsed, unchanged row as is
        //whatever we return is going to replace that
        return {
          name: d.country,
          internetUser: +d.internet_users_per_100,
          gdpPerCap: +d.GDP_per_capita
        };
    },
    function(error,rows){

        //TODO step 2: mine data for max and min
        var minX = d3.min(rows, function(row){ return row.gdpPerCap; }),
            maxX = d3.max(rows, function(row){ return row.gdpPerCap; });
        var minY = d3.min(rows, function(row){ return row.internetUser; }),
            maxY = d3.max(rows, function(row){ return row.internetUser; });

        scaleX.domain([minX, maxX]);
        scaleY.domain([minY, maxY]);


        //TODO step 3: draw with the data
        for(var i=0; i< rows.length; i++){
            canvas.append('circle')
                .attr('cx', scaleX(rows[i].gdpPerCap) )
                .attr('cy', scaleY(rows[i].internetUser) )
                .attr('r',3)
                .style('fill','white');
        }
    });
