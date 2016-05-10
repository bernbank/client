define(["knockout", "text!./register.html", "jquery", 'knockout-validation'], function(ko, templateMarkup, $) {

	function Register(route) {
		this.baseURL = "http://bernbank.com/api/";
		this.threshold = "50";
		this.slider = ko.observable(1);

		ko.validation.init({
			insertMessages : false
		});

		this.userEmail = ko.observable('').extend({
			required : true,
			email : true
		});
		this.errors = ko.observableArray([]);
	}


	Register.prototype.postPledge = function() {
		var errors = ko.validation.group(this);
		var data = {
			"email" : this.userEmail(),
			"amount" : this.slider()
		};

		if (errors().length === 0) {
			$.ajax({
				method : "POST",
				crossDomain : true,
				contentType : 'application/json',
				dataType : "json",
				url : this.baseURL + 'pledges/' + this.userEmail(),
				data : data
			}).done(function(data) {
				console.log(data);
			});
			$("#newPledge").modal('hide');
		} else {
			this.errors(errors());
			return false;
		}
	};

	return {
		viewModel : Register,
		template : templateMarkup
	};

});
