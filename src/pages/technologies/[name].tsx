import { GetServerSideProps } from "next";
import styles from "../../styles/tech.module.css";
import { Variants, motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  const dbParam: string = resolvedUrl.split("/").pop()!;

  const firebaseConfig = {
    apiKey: "AIzaSyDhsJ5qCZXLeJS57PAVEbOi5_7D-T-6_ls",
    authDomain: "nextjs-database-60f90.firebaseapp.com",
    projectId: "nextjs-database-60f90",
    storageBucket: "nextjs-database-60f90.appspot.com",
    messagingSenderId: "1034160308172",
    appId: "1:1034160308172:web:b0ab71b8d789e939c76769",
  };

  initializeApp(firebaseConfig);

  const db = getFirestore();
  const colref = collection(db, "technologies");
  const q = query(colref, where("name", "==", dbParam));
  const querySnapshot = await getDocs(q);

  let docData: any = [];
  querySnapshot.forEach((doc) => {
    docData.push({ ...doc.data() });
  });

  return {
    props: {
      dbData: JSON.stringify(docData) || [],
    },
  };
};

interface pageProps {
  dbData: string;
}

const bodyVariants: Variants = {
  hide: {
    opacity: 0,
    x: 200,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 100,
    },
  },
};

const page = ({ dbData }: pageProps) => {
  const parsedData = JSON.parse(dbData)[0];
  const { name, details: deepDetails, avatar } = parsedData || {};

  return (
    <>
      <Head>
        <title>{name.toUpperCase()}</title>
        <meta name={"description"} content={"Technologies"} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.detailsWrapper}>
        <motion.span data-text={name} className={styles.name}>
          {name}
        </motion.span>
        <motion.div
          className={styles.deepDetails}
          initial={"hide"}
          whileInView={"show"}
          variants={bodyVariants}
          viewport={{ once: true }}
        >
          <Link href={"/"} className={styles.backLink}>
            Go Back
          </Link>
          {deepDetails}
        </motion.div>
        <Image className={styles.image} src={avatar} alt={name} fill priority />
      </div>
    </>
  );
};

export default page;
