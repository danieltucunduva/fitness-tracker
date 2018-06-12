var express = require("express");
var router = express.Router();

const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://sprint-shcool.auth0.com/.well-known/jwks.json`
  }),

  audience: "https://sprint-shcool.auth0.com/api/v2/",
  issuer: `https://sprint-shcool.auth0.com/`,
  algorithms: ["RS256"]
});

var pastSprints = require("./api/past-sprints.route");
var sprintTemplates = require("./api/sprint-templates.route");
var users = require("./api/users.route");

router.use("/past-sprints", checkJwt, pastSprints);
router.use("/sprint-templates", checkJwt, sprintTemplates);
router.use("/users", users);

module.exports = router;
