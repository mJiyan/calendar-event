'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Event');



exports.list_all_events = (req, res) => {
    Event.find((err, event) => {
        if (err) res.send(err);
        res.json(event.map(b => {
            const json = b.toObject();
            return { ...json, id: json._id };
        }));
    });
}

exports.get_event = (req, res) => {
    const { id } = req.params;
    Event.findOne({ _id: id }, (err, event) => {
        if (err) return res.status(500).send(err);
        const json = event.toObject();
        res.json({ ...json, id: json._id })
    });
}


exports.update_event = (req, res) => {
    const { id } = req.params;
    Event.findOneAndUpdate({ _id: id }, req.body, {new: true}, (err, event) => {
        if (err) res.status(500).send(err);
        event.save();
        const json = event.toObject();
        res.json({ ...json, id: json._id });
    });
}

exports.create_event = (req, res) => {
    const new_event = new Event(req.body);
    new_event.save((err, event) => {
        if (err) return res.status(500).send(err);
        const json = event.toObject();
        res.json({ ...json, id: json._id });
    });
};


exports.delete_event = (req, res) => {
    const { id } = req.params;
    Event.findByIdAndDelete({ _id: id }, (err, event) => {
        if (err) return res.status(500).send(err);
        else if (!event) return res.status(404).send(err);
        res.status(200).json({ id });
    });
}