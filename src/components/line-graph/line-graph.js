define(['knockout', 'text!./line-graph.html', "d3"], function(ko, templateMarkup, d3) {

	function LineGraph(params) {
		params.hist.subscribe(function(data) {
			var x = data.length;
			if(x>10){
				x--;
				data = data.slice(x-10,x);
			}
			Draw(data);
		});

		function Draw(data) {
			console.debug(data);

			var margin = {
				top : 40,
				right : 40,
				bottom : 40,
				left : 80
			}, width = $("#graph").width(), height = 240;

			var color = d3.interpolateRgb("#0073DA", "#EF3C37");
			var max = d3.max(data, function(d) {
				return d.total * 0.01;
			});

			var x = d3.time.scale().domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)]).rangeRound([0, width - margin.left - margin.right]);

			var y = d3.scale.linear().domain([0, max]).range([height - margin.top - margin.bottom, 0]);

			var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(d3.time.days, 1).tickFormat(d3.time.format('%a %d')).tickSize(0).tickPadding(8);

			var yAxis = d3.svg.axis().scale(y).orient('left').tickPadding(8).ticks(5).tickFormat(function(d) {
				return "$" + d.toFixed(2);
			});

			var svg = d3.select('#graph').append('svg').attr('class', 'chart').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

			svg.selectAll('.chart').data(data).enter().append('rect').attr('class', 'bar').style("fill", function(d, i) {
				return color(d.total * 0.01 / max);
			}).attr('x', function(d) {
				return x(new Date(d.date));
			}).attr('y', function(d) {
				return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.total * 0.01));
			}).attr('width', (width - margin.left - margin.right) / 11).attr('height', function(d) {
				return height - margin.top - margin.bottom - y(d.total * 0.01);
			});

			svg.append('g').attr('class', 'x axis').attr('transform', 'translate(15, ' + (height - margin.top - margin.bottom) + ')').call(xAxis);

			svg.append('g').attr('class', 'y axis').call(yAxis);
		};
	};

	// This runs when the component is torn down. Put here any logic necessary to clean up,
	// for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
	LineGraph.prototype.dispose = function() {
	};

	return {
		viewModel : LineGraph,
		template : templateMarkup
	};

});
