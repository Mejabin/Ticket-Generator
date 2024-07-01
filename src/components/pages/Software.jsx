import { motion } from "framer-motion";
import figma from "./../../assets/figma.svg";
import javascript from "./../../assets/javascript.svg";
import laravel from "./../../assets/laravel.svg";
import mongodb from "./../../assets/mongodb.svg"; // Corrected from mysql to mongodb
import mysql from "./../../assets/mysql.svg";
import nextjs from "./../../assets/nextjs.svg";
import nodejs from "./../../assets/nodejs-alt.svg";
import php from "./../../assets/php.svg";
import python from "./../../assets/python.svg";
import react from "./../../assets/react.svg";
import tailwindcss from "./../../assets/tailwindcss.svg";
import typescript from "./../../assets/typescript.svg";
import wordpress from "./../../assets/wordpress-fill.svg";

export const Software = () => {
  return (
    <div className="">
      <motion.span
        className="absolute opacity-25 -z-10 -left-8 bottom-40 "
        animate={{ x: -60 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img className="opacity-45 w-32" src={react} alt="Node.js" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-30 -left-0 bottom-[19rem] "
        animate={{ x: -100, y: 10 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img className="opacity-45 w-14" src={tailwindcss} alt="Node.js" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-20 -left-0 top-32"
        animate={{ x: -70 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img
          className="opacity-45  rotate-12 w-16"
          src={wordpress}
          alt="Node.js"
        />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-10 -left-6 bottom-72"
        cx={500}
        animate={{ cx: [null, 100] }}
      >
        <img className="opacity-45 w-10 -rotate-45" src={figma} alt="Figma" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-10 -left-16 top-52"
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          className="opacity-45 -rotate-12 w-20"
          src={javascript}
          alt="JavaScript"
        />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-10 -left-14 bottom-24"
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <img className="opacity-45 -rotate-12" src={laravel} alt="Laravel" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-10 -right-10 bottom-40"
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <img className="opacity-45 rotate-90" src={mongodb} alt="MongoDB" />
      </motion.span>
      {/* <motion.span
        className="absolute opacity-25 -z-10 -right-16 bottom-24"
        cx={500}
        animate={{ cx: [null, 100] }}
      >
        {" "}
        <img src={mysql} alt="MySQL" />
      </motion.span> */}
      <motion.span
        className="absolute opacity-25 -z-10 -right-24 top-20"
        animate={{ x: -60 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img className="opacity-45 -rotate-12" src={nextjs} alt="Next.js" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-10 right-4 top-60"
        animate={{ x: 60 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img className="opacity-45 rotate-6 mb-4" src={php} alt="Node.js" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-10 -right-4 top-32"
        animate={{ x: 60 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img className="opacity-45 rotate-12 w-28" src={nodejs} alt="Node.js" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-10 -right-3 top-72"
        animate={{ x: 60 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img className="opacity-45 w-24 rotate-12" src={python} alt="Node.js" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-10 right-8 bottom-52 "
        animate={{ x: 60 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img className="opacity-45 " src={react} alt="Node.js" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-30 -right-8 bottom-48"
        animate={{ x: 60 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img className="opacity-45 w-16" src={tailwindcss} alt="Node.js" />
      </motion.span>
      <motion.span
        className="absolute opacity-25 -z-20 -right-0 bottom-20"
        animate={{ x: 60 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <img
          className="opacity-45 rotate-12 w-20"
          src={typescript}
          alt="Node.js"
        />
      </motion.span>
    </div>
  );
};

export default Software;
