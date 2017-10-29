import { Template } from 'meteor/templating';

import { Samples, SentimentResponses, FluencyResponses, ContentResponses } from '../api/tasks.js';

import './contenttask.html';

var current_sample;

Template.content.helpers({
  samples() {
      current_sample = Samples.findOne({});
      return current_sample;
  }
});

var handle_button = function(event) {
    event.preventDefault();
    const target = event.target;
    const preservation = target.name;
    console.log("Content Preservation response: " + preservation);
}

Template.content.events({
  'click .sentiment-positive'(event) {
      handle_button(event);
  },
  'click .sentiment-negative'(event) {
      handle_button(event);
  },
  'click .content-option'(event) {
      handle_button(event);
  },
  'click .sentiment-neither'(event) {
      handle_button(event);
  },
});
