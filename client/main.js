import '../imports/ui/sentimenttask.js';
import '../imports/ui/contenttask.js';
import '../imports/ui/fluencytask.js';

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', { main: 'home' });
  }
});

FlowRouter.route('/sentiment', {
  action: function() {
    BlazeLayout.render('layout', { main: 'sentiment' });
  }
});

FlowRouter.route('/content', {
  action: function() {
    BlazeLayout.render('layout', { main: 'content' });
  }
});

FlowRouter.route('/fluency', {
  action: function() {
    BlazeLayout.render('layout', { main: 'fluency' });
  }
});
