import * as passport from "passport";
import * as LocalStrategy from "passport-local";

import { ComparePassword } from "../db/utils/security/passwords";
import DB from "../db";

// serialize and deserialize users
// meaning if the log in correctly - serialize the user -> add require dot user prop on our request

passport.serializeUser((user, done) => done(null, user)) ;
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({ usernameField: "email", 
    session: false 
    }, async (email, password, done) => {
        try {
            let [user]: any = await DB.Users.findOneByEmail(email);
            if(user && ComparePassword(password, user.password))
        } catch(e) {
            done(e);
        }
}));

