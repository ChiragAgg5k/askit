"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const ArrowLink = () => {
  return (
    <Link href={`/posts/`} className={`flex items-center`}>
      <p className={`ml-2 text-foreground hover:underline`}>
        View all questions here
      </p>
      <motion.p
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: 10, opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className={`inline-block text-foreground`}
      >
        &nbsp;&rarr;
      </motion.p>
    </Link>
  );
};

export default ArrowLink;
