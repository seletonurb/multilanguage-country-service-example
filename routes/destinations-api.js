var express = require('express');
var router = express.Router();
var searchDestinationService = require('multilanguage-country-service');
var VALID_LANGUAGES = ['en', 'pt'];
var DEFAULT_LANGUAGE = 'en'; // default Language

router.route('/search-countries')
  .get(function(req, res) {
    var destinations;
    var queryLanguage = req.query.language;

    var language = queryLanguage ? queryLanguage : DEFAULT_LANGUAGE;
    var q = req.query.q;

    if (VALID_LANGUAGES.indexOf(language) === -1) {
      return res.status(400).send('The language provided as query parameter is not valid: ' + language);
    } else if (!q) {
      return res.status(400).send('The search query was not provided.');
    } else {
      destinations = searchDestinationService.search(q, language);
      res.status(200).send(destinations);
    }
  });

module.exports = router;
