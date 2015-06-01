var Q = require("q");
var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

var TokenRepository = {}

/**
 * Get all tokens
 * @param  {Function} next An optional callback to return
 * @return {promise}        A promise unless it's used a callback
 */
TokenRepository.all = function all(next) {
	var d = Q.defer();
	
	Token.find()
	.exec(function(err, results) {
		if(err) d.reject(err);
		else {
			d.resolve(results);
		}
	})

	d.promise.nodeify(next);
	return d.promise;
}

/**
 * Get a new token
 * @param  {string} The id of the token to find
 * @param  {Function} An optional callback to return
 * @return {promise} A promise unless it's used a callback
 */
TokenRepository.get = function get(id, next) {
	var d = Q.defer();

	Token.findOne({id: id})
	.exec(function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result);
		}
	});

	d.promise.nodeify(next);
	return d.promise;
}

/**
 * Saves a new token
 * @param  {string}   name   The name of the application
 * @param  {string}   userId The user id who creates this token
 * @param  {Function} next   Callback to execute
 * @return {promise}          Promise to return
 */
TokenRepository.save = function save(name, userId, next) {
	var d = Q.defer();

	if(!userId) d.reject("No valid user");
	if(!name) d.reject("No valid name");

	var data = {
		name: name,
		token: randomToken(64),
		user: userId
	}

	Token.create(data, function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result);
		}
	});

	d.promise.nodeify(next);
	return d.promise;
}

/**
 * Remove a token
 * @param  {string}   id   The id of the application token to remove
 * @param  {Function} next Callback to execute if used
 * @return {promise}        Promise to return
 */
TokenRepository.remove = function remove(id, next) {
	var d = Q.defer();
	if(!id) d.reject("No id");

	Token.destroy({id: id})
	.exec(function(err, result) {
		if(err) d.reject(err);
		else {
			d.resolve(result);
		}
	})

	d.promise.nodeify(next);
	return d.promise;
}

module.exports = TokenRepository;