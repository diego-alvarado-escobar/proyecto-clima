import React, { Component } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

class LineChart extends Component {

    constructor(props){
        super(props)
        this.myRef = React.createRef();
    }
	

    componentDidMount () {

		var margin = { top: 50, left: 60, bottom: 15, right: 0 },
            width = 700 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

var svg = d3.select(".graph-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var y = d3.scaleLinear()
    .range([height - margin.bottom, margin.top])

var x = d3.scaleBand()
    .range([margin.left, width - margin.right])
    .paddingOuter(0.4)
    .paddingInner(0.3)


//DEFINIENDO ESTILO PARA EJE X, EJE Y Y BARRAS
var xAxisGroup = svg.append("g")
    .attr("class", "x axis")
    .attr("color", "black")
    .attr("transform", "translate(0, " + (height - 15) + ")");

var yAxisGroup = svg.append("g")
    .attr("class", "y axis")
    .attr("color", "black");

//IMPORTANDO LOS DATOS
d3.json ("https://api.openweathermap.org/data/2.5/forecast?q=Medellin&lang=sp&units=metric&appid=f0e5a162320155ed3912e1cbaa66d4b2").then (function (dataComplete){
    var dataList = dataComplete.list;
    var data = [];
    var i = 0;
    dataList.forEach(d => {
        var fecha = moment.unix(d.dt).format("DD/MMM/YY")
        var dataWeather = d.weather;
        if(i >= 1){
            var ultimoRegistro = data[data.length-1];
            if(fecha == ultimoRegistro.date){
                if(d.main.temp_min < ultimoRegistro.tempL){
                    data[data.length-1].tempL = d.main.temp_min;
                }
                if(d.main.temp_max > ultimoRegistro.tempH){
                    data[data.length-1].tempH = d.main.temp_max;
                }
            }else{
                data.push({date: fecha, tempL: d.main.temp_min, tempH: d.main.temp_max, description: dataWeather[0].description})
            }
        }else{
            data.push({date: fecha, tempL: d.main.temp_min, tempH: d.main.temp_max, description: dataWeather[0].description})
        }
        i = i +1;
    });

    x.domain(data.map(d => d.date));
    y.domain([0, d3.max(data, d => d.tempH)])

    //DEFINIENDO X
    var xAxis = d3.axisBottom(x);
    xAxisGroup
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dy", "0.9em")
        .attr("transform", "rotate(-35)");

    //DEFINIENDO Y
    var yAxis = d3.axisLeft(y)
        .ticks(10)
        .tickFormat(d => d)
    yAxisGroup
        .call(yAxis)
        .attr("transform", "translate(" + margin.left + ",0)");


    //CREANDO EL TOOLTIP
    var tooltip = d3.select(".forecast-content")
    .append("div")
    .style("position", "absolute")
    .style("z-index", 10)
	.style("visibility", "visible")

    // Se define la posicion del texto de la fecha en el tooltip
    tooltip.append("text")
        .attr("class", "tooltip-date")
        .attr("x", 18)
        .attr("y", 10);

    //AGREGANDO BARRAS Y TOOLTIP
    svg.append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", item => x(item.date))
    .attr("y", item => y(item.tempL))
    .attr("width", 30)
    .attr("height", item => y(0) - y(item.tempL))
    .attr("fill", '#4d7cf1')
    .text(item => item.description)
	.on('mouseover', d => {
        var dataItem = d.srcElement.__data__;
        tooltip.html("Fecha: "+dataItem.date+"<br />Tiempo:"+dataItem.description+" <br />Temperatura mas alta: "+dataItem.tempH+" <br />Temperatura mas baja: "+dataItem.tempL);
        return tooltip.style("visibility", "visible")
            .style("top", (d.pageY) + "px").style("left", (d.pageX) + "px").style("background-color", "white").style("color", "black")
            .style("border", "1px solid black").style("border-radius", "0.5cm").style("padding", "5px")
    })
    .on("mouseout", () => tooltip.style("visibility", "hidden"))

    svg.append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.date)+30)
    .attr("y", d => y(d.tempH))  
    .attr("width", 30)
    .attr("height", d => y(0) - y(d.tempH))
    .attr("fill", 'rgb(197 37 37)')
    .text(d => d.tempH)
	.on('mouseover', d => {
        var dataItem = d.srcElement.__data__;
        tooltip.html("Fecha: "+dataItem.date+"<br />Tiempo:"+dataItem.description+" <br />Temperatura mas alta: "+dataItem.tempH+" <br />Temperatura mas baja: "+dataItem.tempL);
        return tooltip.style("visibility", "visible")
            .style("top", (d.pageY) + "px").style("left", (d.pageX) + "px").style("background-color", "white").style("color", "black")
            .style("border", "1px solid black").style("border-radius", "0.5cm").style("padding", "5px")
    })
    .on("mouseout", () => tooltip.style("visibility", "hidden"))

	

});
    }

    render() {
        return( 
        <div className="forecast-content" style={{'background': 'white'}}>
            <h2 className="section-title">Pronóstico de los próximos 5 dias</h2>
		    <div className="graph-container">
	        </div>
	    </div>
        )};
}
export default LineChart;