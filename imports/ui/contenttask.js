import { Template } from 'meteor/templating';

import { Samples, ContentResponses } from '../api/tasks.js';

import { Sampler } from './helpers.js';

import './contenttask.html';

if (Meteor.isClient) {
    var current_sample;
    var first_source;
    var second_source;
    var newContentDep = new Tracker.Dependency();
    var done = false;

    Template.content.helpers({
        samples() {
            if (done) {
                return current_sample;
            }
            newContentDep.depend();
            current_sample = null;
            while (current_sample == null) {
                current_sample = Sampler.sample();
                first_source = Sampler.randomModelSource();
                second_source = (first_source == 'mit_text') ? 'cmu_text' : 'mit_text';
                if (ContentResponses.find({sample_id: current_sample.sample_id, source: first_source}).count() >= 2) {
                    current_sample = null;
                    if (ContentResponses.find().count() >= (4 * Samples.find().count())) {
                        current_sample = {original: "No samples left. Please try a different task!"}
                        done = true;
                        return current_sample;
                    }
                }
            }
            sample_result = {original: current_sample['original_text'], first: current_sample[first_source], second: current_sample[second_source]};
            return sample_result;
        }
    });

    var record_response = function(selection) {
        if (done) {
            return;
        }
        var first_rating = (selection == "first" || selection == "both") ? 1 : 0;
        var second_rating = (selection == "second" || selection == "both") ? 1 : 0;
        ContentResponses.insert({sample_id: current_sample.sample_id, source: first_source, type:'content', rating: first_rating});
        ContentResponses.insert({sample_id: current_sample.sample_id, source: second_source, type:'content', rating: second_rating});
    }

    var handle_button = function(event) {
        event.preventDefault();
        const target = event.target;
        const selection = target.name;
        console.log("Selection response: " + selection);
        record_response(selection);
    }


    Template.content.events({
        'click .sentiment-positive'(event) {
            handle_button(event);
            newContentDep.changed();
        },
        'click .sentiment-negative'(event) {
            handle_button(event);
            newContentDep.changed();
        },
        'click .content-option'(event) {
            handle_button(event);
            newContentDep.changed();
        },
        'click .sentiment-neither'(event) {
            handle_button(event);
            newContentDep.changed();
        },
    });
}
