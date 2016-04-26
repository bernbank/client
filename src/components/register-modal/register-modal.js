define(['knockout', 'text!./register-modal.html', 'knockout-validation'], function(ko, templateMarkup) {

	function RegisterModal(params) {
		this.baseURL = params.baseURL;
		this.threshold = params.threshold;
		
		ko.validation.init({ insertMessages : false });

		this.userEmail = ko.observable('').extend({
			required : true,
			email : true
		});
		this.errors = ko.observableArray([]);
	}


	RegisterModal.prototype.postPledge = function() {
		var errors = ko.validation.group(this);

		if (errors().length === 0) {
			$.post(this.baseURL + 'pledges/', {
				email : this.userEmail(),
				amount : "1"
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