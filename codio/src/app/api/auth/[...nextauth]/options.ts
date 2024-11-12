import { Account, AuthOptions, ISODateString } from "next-auth"
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios"
import { Env } from "@/app/lib/config";




function getGoogleCredentials() {
    const googleClientId = process.env.GOOGLE_CLIENT_ID!;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET!;

    if (!googleClientId || googleClientId.length === 0) {
        throw new Error("Missing Google CLIENT ID");
    }
    if (!googleClientSecret || googleClientSecret.length === 0) {
        throw new Error("Missing Google CLIENT SECRET");
    }
    return { googleClientId, googleClientSecret }
}



export type CustomSession = {
    user?: CustomUser,
    expiresAt?: ISODateString
}



export type CustomUser = {
    id?: string | null,
    name?: string | null,
    email?: string | null,
    image?: string | null,
    provider?: string | null,
    token?: string | null,
}




const googleSecrets = getGoogleCredentials();


export const authOptions: AuthOptions = {
    pages: {
        signIn: "/auth/sign-in"
    },

    session: {
        maxAge: 2 * 60 * 60, // 2 Hours,
        //strategy: "jwt", // For credentials login
    },

    providers: [
        GoogleProvider({
            clientId: googleSecrets.googleClientId,
            clientSecret: googleSecrets.googleClientSecret,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],

    callbacks: {

        async signIn({ user, account }: { user: CustomUser, account: Account | null }) {
            try {
                const payload = {
                    name: user.name,
                    email: user.email,
                    provider: account?.provider,
                    oauth_id: account?.providerAccountId,
                    image: user?.image
                }

                const { data } = await axios.post(Env.LOGIN_URL, payload);
                user.id = data?.user?.id.toString();
                user.token = data?.user?.token;
                user.provider = data?.user?.provider;
                return true;
            } catch (e) {
                console.log(e)
                return false;
            }

        },
        async jwt({ token, user }) {

            //user object It is only present when user signs in.

            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: { user: JWT, session: CustomSession, token: JWT }) {


            //Token returned from jwt callback
            session.user = token.user as CustomUser;
            console.log("Session = ", session)
            // session.user.id = user.id;
            // session.user.token = user.token
            return session;
        },

    }
}