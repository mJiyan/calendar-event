'use strict';

module.exports = (app) => {
    const eventFunctions = require('../controllers/eventController');;


    app.route('/events')
        .get(eventFunctions.list_all_events)
        .post(eventFunctions.create_event);

    app.route('/event/:id')
        .get(eventFunctions.get_event)
        .put(eventFunctions.update_event)
        .delete(eventFunctions.delete_event);
}