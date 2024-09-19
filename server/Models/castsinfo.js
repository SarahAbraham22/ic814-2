const mongoose = require('mongoose');

const CastMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const CastMember = mongoose.model('CastMember', CastMemberSchema);

module.exports = CastMember;
