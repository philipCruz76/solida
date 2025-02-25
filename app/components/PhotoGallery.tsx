"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1.8,
    },
  },
};

export function PhotoGallery() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 grid-rows-3 gap-4 h-full"
    >
      <motion.div
        variants={item}
        className="col-span-1 row-span-1 relative rounded-lg overflow-hidden"
      >
        <Image
          src="/customer-2.jpg"
          alt="Happy customer"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        variants={item}
        className="col-span-2 row-span-1 relative rounded-lg overflow-hidden"
      >
        <Image
          src="/customer-1.jpg"
          alt="Happy family"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        variants={item}
        className="col-span-2 row-span-1 relative rounded-lg overflow-hidden"
      >
        <Image
          src="/customer-3.jpg"
          alt="Business customer"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        variants={item}
        className="col-span-1 row-span-2 relative rounded-lg overflow-hidden"
      >
        <Image
          src="/customer-4.jpg"
          alt="Happy couple"
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div
        variants={item}
        className="col-span-2 row-span-1 relative rounded-lg overflow-hidden"
      >
        <Image
          src="/customer-5.jpg"
          alt="Senior customer"
          fill
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
