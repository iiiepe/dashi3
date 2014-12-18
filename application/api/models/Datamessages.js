/**
* Data.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	id: {
  		type: "integer",
  		autoIncrement: true,
  		primaryKey: true
  	},
  	storage: {
  		model: "Storage",
      required: true
  	},
  	message: {
  		type: "string",
  		required: true
  	},
  	type: {
  		type: "string",
  		required: true,
      enum: ["error", "info", "success"]
  	}
  }
};

