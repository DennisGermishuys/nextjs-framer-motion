import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Cards from "@/components/cards/Cards";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dennis Germishuys</title>
        <meta
          name="description"
          content="A little portfolio by Dennis Germishuys"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="xM6HnZRAwo_qcc4e5lFjCp-Cm1z-PRQPuCiExw4IPm4" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>A FullStack JS Developer</p>
          <div>
            <a
              href="https://www.linkedin.com/in/dennis-germishuys-6585811b9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By Dennis Germishuys
              <Image
                src="/favicon.png"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={20}
                height={20}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.heading}>
            Your Next
            <span className={styles.developer} data-text={"Developer"}>
              Developer
            </span>
          </div>
        </div>

        <Cards />
      </main>
    </>
  );
}
