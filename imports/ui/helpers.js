import { Samples } from '../api/tasks.js';
const source_labels = ["original_text", "cmu_text", "mit_text"];
const model_source_labels = ["cmu_text", "mit_text"];

class RandomSampler {

    constructor(collection) {
        this.collection = collection;
        this.samples_count = collection.find().count();
    }

    randomInt(n) {
        return Math.floor((Math.random() * n) + 1);
    }

    randomSource() {
        var i = Math.floor((Math.random() * 3));
        return source_labels[i];
    }

    randomModelSource() {
        var i = Math.floor((Math.random() * 2));
        return model_source_labels[i];
    }

    sample() {
        if (this.samples_count == 0) {
            this.samples_count = this.collection.find().count();
            console.log("Updated Samples Collection Size: " + this.samples_count);
        }
        randomId = this.randomInt(this.samples_count);
        console.log("Using random number: " + randomId);
        current_sample = this.collection.findOne({ sample_id: randomId});
        console.log("Using sample:");
        console.log(current_sample);
        return current_sample;
    }

    sampleN(n) {
        if (this.samples_count == 0) {
            this.samples_count = this.collection.find().count();
            console.log("Updated Samples Collection Size: " + this.samples_count);
        }
        if (n > this.samples_count) {
            return null
        }
        current_sample = this.collection.findOne({ sample_id: n});
        console.log("Using sample:");
        console.log(current_sample);
        return current_sample;
    }
}

export const Sampler = new RandomSampler(Samples);
