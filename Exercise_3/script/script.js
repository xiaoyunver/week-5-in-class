//Take a moment to set up the drawing environment yourself
var width = $('.canvas').width(),
    height = $('.canvas').height();

var canvas = d3.select('.canvas')
    .append('svg')
    .attr('width',width)
    .attr('height',height)
    .append('g');
//canvas>sva>g=canvas


//TODO step 1: load and parse data
var scaleX = d3.scale.linear()
    .range([0,width]); //outside for doing at console

d3.csv('data/world_bank_2013.csv',
    function(d)
    {
        var newRow =
        {
        country: d.country,
        GDP: +d.GDP,
        gdpPerCap: +d.GDP_per_capita,
        pctUser: +d.internet_users_per_100
        };
        return newRow;
    },
    function(err,rows)
    {
        var minGdpPerCap = d3.min(rows,function(d){return d.gdpPerCap;})
        var maxGdpPerCap = d3.max(rows,function(d){return d.gdpPerCap});

        var minPctUser = d3.min(rows,function(d){return d.pctUser;})
        var maxPctUser = d3.max(rows,function(d){return d.pctUser});

        console.log(minGdpPerCap,maxGdpPerCap);
        console.log(minPctUser,maxPctUser);

        scaleX.domain([minGdpPerCap,maxGdpPerCap]);//could add[0,30000],but showing some will always lose some

        var scaleY = d3.scale.linear()
            .domain([minPctUser,maxPctUser])
            .range([height ,0]);//drawing with different position -50

        rows.forEach(function(country)
        {
            var xPos = scaleX(country.gdpPerCap),
                yPos = scaleY(country.pctUser);

            var node = canvas.append('g')
                .attr('class','country')
                .attr('transform','translate('+xPos+10+','+yPos+10+')');
            node
                .append('circle')
                .attr('r',10)
                .style('fill-opacity',.5);
            node
                .append('text')
                .text(country.country);
        })

    })
        //accessor function
        //is run for every row in the table
        //with d representing unparsed, unchanged row as is
        //whatever we return is going to replace that

        //TODO step 2: mine data for max and min



        //TODO step 3: draw with the data

