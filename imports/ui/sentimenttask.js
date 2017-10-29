import { Template } from 'meteor/templating';

import { Samples, SentimentResponses, FluencyResponses, ContentResponses } from '../api/tasks.js';

import { Sampler } from './helpers.js';

import './sentimenttask.html';

if (Meteor.isClient) {
    var current_sample;
    var current_source;
    var newSentimentDep = new Tracker.Dependency();
    var done = false;

    Template.sentiment.helpers({
        samples() {
            newSentimentDep.depend();
            current_sample = null;
            while (current_sample == null) {
                current_sample = Sampler.sample(SentimentResponses);
                current_source = Sampler.randomSource();
                if (SentimentResponses.find({sample_id: current_sample.sample_id, source: current_source}).count() >= 2) {
                    current_sample = null;
                    if (SentimentResponses.find().count() >= (6 * Samples.find().count())) {
                        current_sample = "No samples left. Please try a different task!"
                        done = true;
                        return current_sample
                    }
                }
            }
            return current_sample[current_source];
        }
    });

    var record_response = function(sentiment) {
        if (done) {
            return;
        }
        SentimentResponses.insert({sample_id: current_sample.sample_id, source: current_source, type:'sentiment', rating: sentiment})
    }

    var handle_button = function(event) {
        event.preventDefault();
        const target = event.target;
        const sentiment = target.name;
        console.log("Sentiment response: " + sentiment);
        record_response(sentiment);
    }

    Template.sentiment.events({
        'click .sentiment-positive'(event) {
            handle_button(event);
            newSentimentDep.changed();
        },
        'click .sentiment-negative'(event) {
            handle_button(event);
            newSentimentDep.changed();
        },
        'click .sentiment-neither'(event) {
            handle_button(event);
            newSentimentDep.changed();
        },
    });
}
