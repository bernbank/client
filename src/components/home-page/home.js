define(["knockout", "text!./home.html", "jquery"], function(ko, homeTemplate, $) {
	// This is the base URL to the API.
	const baseURL = 'http://www.bernbank.com/api/';

	function HomeViewModel(route) {
		const self = this;
		self.baseURL = baseURL;

		self.threshold = ko.observable('9001');
		self.raised = ko.observable('$1,000,000');
		self.prevRaised = ko.pureComputed(function() {
			return '$' + self.pledgesTotal() * self.prevCallers() * 0.01;
		});
		self.pledgesTotal = ko.observable(50);
		self.perCaller = ko.pureComputed(function() {
			return '$' + (self.pledgesTotal() * 0.01).toFixed(2);
		});
		self.prevCallers = ko.observable(100);
		self.sumCallers = ko.observable(9001);

		//LoadData(self);
	}

	function LoadData(self) {
		$.getJSON(baseURL+'pledges/?total', function(data) {
			self.pledgesTotal(data.total);
		});
		// TODO: GET and set the other variables to populate the homepage and pass to the line-graph component
	}


	HomeViewModel.prototype.postPledge = function() {

	};

	return {
		viewModel : HomeViewModel,
		template : homeTemplate
	};

});
