import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import styles from "../../styles/tech.module.css";
import { Variants, motion } from "framer-motion";
import Image from "next/image";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  const dbParam: string = resolvedUrl.split("/").pop()!;

  const details = await prisma.technology.findFirst({
    where: {
      name: dbParam,
    },
  });

  return {
    props: {
      details: details,
    },
  };
};

interface pageProps {
  details: {
    name: string;
    details: string;
    avatar: string;
  };
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

const page = ({ details }: pageProps) => {
  const { name, details: deepDetails, avatar } = details || {};

  return (
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
        {deepDetails}
      </motion.div>
      <img src={avatar} alt={name} height={"100%"} width={"100%"} />
    </div>
  );
};

export default page;
