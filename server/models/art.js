const mongoose = require('mongoose');

const artSchema = mongoose.Schema({
  art: {type: String, required: true}
});

module.exports = mongoose.model('Art', artSchema);
