import { Template } from 'meteor/templating';

import { Samples, SentimentResponses, FluencyResponses, ContentResponses } from '../api/tasks.js';

import './fluencytask.html';

var current_sample;

Template.fluency.helpers({
  samples() {
      current_sample = Samples.findOne({});
      return current_sample;
  }
});

var handle_button = function(event) {
    event.preventDefault();
    const target = event.target;
    const fluency = target.name;
    console.log("Fluency response: " + fluency);
}

Template.fluency.events({
  'click .sentiment-positive'(event) {
      handle_button(event);
  },
  'click .sentiment-semipos'(event) {
      handle_button(event);
  },
  'click .sentiment-semineg'(event) {
      handle_button(event);
  },
  'click .sentiment-negative'(event) {
      handle_button(event);
  },
});
