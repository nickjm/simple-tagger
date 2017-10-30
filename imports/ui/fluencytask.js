import { Template } from 'meteor/templating';

import { Samples, FluencyResponses } from '../api/tasks.js';

import { Sampler } from './helpers.js';

import './fluencytask.html';

if (Meteor.isClient) {
    var current_sample;
    var current_source;
    var newFluencyDep = new Tracker.Dependency();
    var done = false;

    Template.fluency.helpers({
        samples() {
            if (done) {
                return current_sample;
            }
            newFluencyDep.depend();
            current_sample = null;
            while (current_sample == null) {
                current_sample = Sampler.sample();
                current_source = Sampler.randomModelSource();
                if (FluencyResponses.find({sample_id: current_sample.sample_id, source: current_source}).count() >= 2) {
                    current_sample = null;
                    if (FluencyResponses.find().count() >= (4 * Samples.find().count())) {
                        current_sample = "No samples left. Please try a different task!"
                        done = true;
                        return current_sample
                    }
                }
            }
            return current_sample[current_source];
        }
    });

    var record_response = function(fluency) {
        if (done) {
            return;
        }
        FluencyResponses.insert({sample_id: current_sample.sample_id, source: current_source, type:'fluency', rating: fluency})
    }

    var handle_button = function(event) {
        event.preventDefault();
        const target = event.target;
        const fluency = target.name;
        console.log("Fluency response: " + fluency);
        record_response(fluency);
    }


    Template.fluency.events({
        'click .sentiment-positive'(event) {
            handle_button(event);
            newFluencyDep.changed();
        },
        'click .sentiment-semipos'(event) {
            handle_button(event);
            newFluencyDep.changed();
        },
        'click .sentiment-semineg'(event) {
            handle_button(event);
            newFluencyDep.changed();
        },
        'click .sentiment-negative'(event) {
            handle_button(event);
            newFluencyDep.changed();
        },
    });
}
