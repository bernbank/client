define(["knockout", "text!./home.html", "jquery","moment"], function(ko, homeTemplate, $, moment) {
	// This is the base URL to the API.
	const baseURL = 'http://bernbank.com/api/';

	function HomeViewModel(route) {
		const self = this;
		self.baseURL = baseURL;

		self.threshold = ko.observable('30');
		self.raised = ko.observable('$0');
		self.amount = ko.observable(0);
		self.prevRaised = ko.pureComputed(function() {
			return  '$'+ (self.amount() * self.prevCallers()).toFixed(2);
		});
		self.totalRaised = ko.pureComputed(function() {
			return  '$'+ (self.amount() * self.sumCallers() + self.totalDonated()).toFixed(2);
		});
		self.pledgesTotal = ko.observable(0);
		self.prevCallers = ko.observable(0);
		self.sumCallers = ko.observable(0);
		self.sumCallersTmp = ko.observable(0);
		self.totaledYesterday = ko.observable(1.40);
		self.histCallers = ko.observableArray([]);
		self.lifetime = ko.pureComputed(function() {
			return self.histCallers().length;
		});
      self.totalDonated = ko.observable(0);
      self.totalDonors = ko.observable(0);

		var day_start=new Date("May 12 2016");
		var day_end=new Date();
		var total_days = Math.max(Math.floor((day_end - day_start) / (1000 * 60 * 60 * 24)), 0);

		self.daysSinceStart = ko.observable(total_days);

		LoadData(self);
	}

	function LoadData(self) {
		$.getJSON(baseURL+'pledges/?total', function(data) {
			self.amount((data.amount*0.01).toFixed(2));
			self.pledgesTotal(data.total);
		});
		$.getJSON(baseURL+'pledges/donated', function(data) {
			self.totalDonated(data['total-donated']*0.01).toFixed(2);
			self.totalDonors(data['total-donors']);
		});
		$.getJSON(baseURL+'dailyCallLogs/total', function(data) {
			
			var day_start=new Date("May 13 2016");
			var day_today=new Date();
			if (day_start < day_today) {
				self.sumCallersTmp(data.total);
			}
			
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
