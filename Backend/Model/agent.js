const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    expires: 604800  
  }
}, { 
  timestamps: true 
});


agentSchema.index({ timestamp: 2 }, { expireAfterSeconds: 604800 });

const Agent = mongoose.model("Agent", agentSchema); 

module.exports = Agent;