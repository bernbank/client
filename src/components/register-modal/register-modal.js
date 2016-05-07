define(['knockout', 'text!./register-modal.html', 'knockout-validation'], function(ko, templateMarkup) {

	function RegisterModal(params) {
		this.baseURL = params.baseURL;
		this.threshold = params.threshold;
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


	RegisterModal.prototype.postPledge = function() {
		var errors = ko.validation.group(this);

		if (errors().length === 0) {
			$.ajax({
				method : "PUT",
				crossDomain : true,
				contentType : 'application/json',
				dataType : "json",
				url : this.baseURL + 'pledges/' + this.userEmail(),
				data : {
					email : this.userEmail(),
					amount : this.slider()
				}
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
		viewModel : RegisterModal,
		template : templateMarkup
	};

});
