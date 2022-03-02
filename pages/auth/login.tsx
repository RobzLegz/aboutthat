import Head from "next/head"
import AuthForm from "../../src/components/AuthForm";
import Navigation from "../../src/components/Navigation";

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>About that | Login</title>
                <meta name="description" content="A blog website inspired by 'one of us is lying' show" />
                <link rel="icon" href="/aboutthat.svg" />
            </Head>

            <Navigation />

            <AuthForm />
        </div>
    )
}
