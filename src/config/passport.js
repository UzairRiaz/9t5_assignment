const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Employer = mongoose.model("Employer");

const secretOrKey = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret';

const opt = {};

opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = secretOrKey;

module.exports = passport => {
    passport.use(
        new jwtStrategy(opt, (jwt_payload, done) => {
            Employer.findById(jwt_payload.id).then((employer) => {
                if (employer) {
                    const returnEmployer = {
                        id: employer._id,
                        name: employer.name,
                        email: employer.email,
                    };
                    return done(null, returnEmployer);
                }
                return done(null, null)
            }
            ).catch((err) => {
                console.log(err);
            })
        })
    )
}
