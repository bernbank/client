define(["knockout", "text!./home.html", "jquery","moment"], function(ko, homeTemplate, $, moment) {
	// This is the base URL to the API.
	const baseURL = 'http://bernbank.com/api/';

	function HomeViewModel(route) {
		const self = this;
		self.baseURL = baseURL;

		self.threshold = ko.observable('50');
		self.raised = ko.observable('$0');
		self.prevRaised = ko.pureComputed(function() {
			return '$' + self.pledgesTotal() * self.prevCallers() * 0.01;
		});
		self.pledgesTotal = ko.observable(50);
		self.perCaller = ko.pureComputed(function() {
			return '$' + (self.pledgesTotal() * 0.01).toFixed(2);
		});
		self.prevCallers = ko.observable(100);
		self.sumCallers = ko.observable(9001);
		self.totaledYesterday = ko.observable(1.40);
		self.histCallers = ko.observableArray([]);

		LoadData(self);
	}

	function LoadData(self) {
		$.getJSON(baseURL+'pledges/?total', function(data) {
			//console.debug(data);
			self.pledgesTotal(data.total);
		});
		$.getJSON(baseURL+'dailyCallLogs/total', function(data) {
			self.sumCallers(data.total);
			self.totaledYesterday( (data.data[data.data.length-1].total * .01).toFixed(2) );
			self.prevCallers(data.data[data.data.length-1].total);
			self.histCallers(data.data);
		});
		//$.getJSON(baseURL+'dailyCallLogs/total?date='+moment().subtract(1, 'days').format("YYYY[-]MM[-]DD"), function(data) {
		// TODO: GET and set the other variables to populate the homepage and pass to the line-graph component
	}


	HomeViewModel.prototype.postPledge = function() {

	};

	return {
		viewModel : HomeViewModel,
		template : homeTemplate
	};

});
