define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('home-page', { require: 'components/home-page/home' });

  ko.components.register('line-graph', { require: 'components/line-graph/line-graph' });

  ko.components.register('register-modal', { require: 'components/register-modal/register-modal' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});
