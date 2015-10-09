var margin = {t:100,r:50,b:100,l:50},
    width = $('.canvas').width() - margin.l - margin.r,
    height = $('.canvas').height() - margin.t - margin.b;

//Set up SVG drawing elements
var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width', width + margin.l + margin.r)
    .attr('height', height + margin.t + margin.b)
    .append('g')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Set up scales
var scaleX = d3.scale.linear()
        .range([0,width]),
    scaleY = d3.scale.linear()
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
        var minY = d3.min(rows, function(d){ return d.internetUser; }),
            maxY = d3.max(rows, function(d){ return d.internetUser; });
        var minX = d3.min(rows, function(d){ return d.gdpPerCap; }),
            maxX = d3.max(rows, function(d){ return d.gdpPerCap; });

        scaleX.domain([minX,maxX]);
        scaleY.domain([minY,maxY]);

        //TODO step 3: draw with the data
        canvas.selectAll('.point')
            .data(rows)
            .enter()
            .append('circle')
            .attr('class','point')
            .attr('cx',function(d){
                return scaleX(d.gdpPerCap);
            })
            .attr('cy',function(d){
                return scaleY(d.internetUser);
            })
            .attr('r',function(d){
                return 5;
            });

    });
