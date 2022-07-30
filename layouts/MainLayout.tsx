import { FC } from "react";

import Head from "next/head";
import { NavBar } from "../components";

import styles from "../styles/MainLayout.module.css"
import { useRouter } from "next/router";



interface Props {
    children: React.ReactNode | JSX.Element,
    title: string
}

const origin = (typeof window ==='undefined')? '':window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {

    

    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="David" />
                <meta name="description" content={`Información sobre el pokemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />

                <meta property="og:title" content={`Información sobre ${title}`} />
                <meta property="og:description" content={`Esta es la página sobre ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>

            <NavBar />

            <main className={styles.main}>
                {children}
            </main>
        </>
    )
};