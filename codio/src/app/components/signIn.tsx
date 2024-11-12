'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
export default function SignInComponent() {

    const googleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signIn("google", {
                callbackUrl: "/",
                redirect: true
            });
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    return (
        <div>
            <form onSubmit={googleSignin}>
                <button>Sign in With Google</button>
            </form>
        </div>
    )
}
