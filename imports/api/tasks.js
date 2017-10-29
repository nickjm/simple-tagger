import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

export const Samples = new Mongo.Collection('samples');
export const SentimentResponses = new Mongo.Collection('responses_sentiment');
export const FluencyResponses = new Mongo.Collection('responses_fluency');
export const ContentResponses = new Mongo.Collection('responses_content');
