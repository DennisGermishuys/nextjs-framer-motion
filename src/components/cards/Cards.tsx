import { useState } from "react";
import styles from "./cards.module.css";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/router";
import Loader from "../loader/loader";

const cardVariants: Variants = {
  hide: {
    opacity: 0,
    y: 200,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
    },
  },
};

const cardVariantsN: Variants = {
  hide: {
    opacity: 0,
    y: 200,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.4,
      type: "spring",
    },
  },
};

const animate = (e: React.MouseEvent<HTMLSpanElement>): void => {
  const letters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let interval: any = null;
  const name = e.target as HTMLElement;
  let iteration: number = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    name.innerText = name.innerText
      .split("")
      .map((letter: string, index: number) => {
        if (index < iteration && typeof name.dataset.value !== "undefined") {
          return name.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (
      typeof name.dataset.value !== "undefined" &&
      iteration >= name.dataset.value.length
    ) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
};

const Cards = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<true | false>(false);

  const handleNavigate = (url: string) => {
    setLoading(true);
    router.push(url);
  };

  const handleLinkNavigate = (
    e: React.MouseEvent<HTMLSpanElement>,
    url: string
  ) => {
    e.stopPropagation();
    window.open(url);
  };

  return (
    <div className={styles.wrapper}>
      {loading ? <Loader /> : null}
      <motion.section
        className={styles.section}
        whileHover={{ scale: 1.05 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        <motion.div
          className="screen"
          id={"screen"}
          initial={"hide"}
          whileInView={"show"}
          variants={cardVariants}
          viewport={{ once: true }}
          onClick={() => handleNavigate("technologies/nextjs")}
        >
          <div className="screen-image nextjs"></div>
          <div className="screen-overlay"></div>
          <div className="screen-content">
            <i className="screen-icon fa-brands fa-codepen"></i>
            <div className="screen-user">
              <span
                id={"name"}
                className="name"
                data-value="NextJS"
                onMouseEnter={(e) => animate(e)}
              >
                NextJS
              </span>
              <span
                className="link"
                onClick={(e) => {
                  handleLinkNavigate(e, "https://nextjs.org/showcase");
                }}
              >
                @NextJS/Showcase
              </span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className={styles.section}
        whileHover={{ scale: 1.05 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        <motion.div
          className="screen"
          id={"screen"}
          initial={"hide"}
          whileInView={"show"}
          variants={cardVariantsN}
          viewport={{ once: true }}
        >
          <div className="screen-image typescript"></div>
          <div className="screen-overlay"></div>
          <div className="screen-content">
            <i className="screen-icon fa-brands fa-codepen"></i>
            <div className="screen-user">
              <span
                id={"name"}
                className="name"
                data-value="TypeScript"
                onMouseEnter={(e) => animate(e)}
              >
                TypeScript
              </span>
              <span
                className="link"
                onClick={(e) => {
                  handleLinkNavigate(e, "https://www.typescriptlang.org/docs/");
                }}
              >
                @TypeScript/Docs
              </span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        className={styles.section}
        whileHover={{ scale: 1.05 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        <motion.div
          className="screen"
          id={"screen"}
          initial={"hide"}
          whileInView={"show"}
          variants={cardVariants}
          viewport={{ once: true }}
          onClick={() => handleNavigate("technologies/nodejs")}
        >
          <div className="screen-image nodejs"></div>
          <div className="screen-overlay"></div>
          <div className="screen-content">
            <i className="screen-icon fa-brands fa-codepen"></i>
            <div className="screen-user">
              <span
                id={"name"}
                className="name"
                data-value="NodeJS"
                onMouseEnter={(e) => animate(e)}
              >
                NodeJS
              </span>
              <span
                className="link"
                onClick={(e) => {
                  handleLinkNavigate(e, "https://nodejs.org/en/docs");
                }}
              >
                @NodeJS/Docs
              </span>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Cards;
