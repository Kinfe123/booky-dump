"use client";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/utils";
import { motion } from "framer-motion";
import Upload from "../upload/upload";

const Hero = () => {
  return (
    <motion.div
      className="z-10 max-w-2xl px-5 xl:px-0 font-display2"
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <motion.a
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        href="https://twitter.com/steventey/status/1616505632001232896"
        target="_blank"
        rel="noreferrer"
        className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
      >
        {/* <Twitter className="h-5 w-5 text-[#1d9bf0]" /> */}
        <p className="text-sm font-semibold text-[#1d9bf0]">
          Introducing Booky Dump
        </p>
      </motion.a>
      <motion.h1
        className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        Explore the world <br /> of books with humans
      </motion.h1>
      <motion.p
        className="mt-6 text-center text-gray-500 md:text-xl font-display2 text-4xl bg-gradient-to-tr from-zinc-600/90 via-zinc-500/80 to-black/90  bg-clip-text text-transparent"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        
          Curious how you&apos;ll look in 10 years? 20 years? When you&apos;re
          90? Upload a photo and find out!{" "}
          {/* <Tooltip
              content={
                <div className="flex flex-col items-center justify-center space-y-3 p-10 text-center sm:max-w-xs">
                  <p className="text-sm text-gray-700">
                    Any photos you upload are automatically deleted after 24
                    hours.
                  </p>
                  <a
                    href="https://github.com/steven-tey/extrapolate"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 rounded-full border border-black bg-black px-5 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
                  >
                    See how it works
                  </a>
                </div>
              }
            >
              <span className="hidden cursor-default underline decoration-dotted underline-offset-2 transition-colors hover:text-gray-800 sm:block">
                100% free and privacy-friendly
              </span>
            </Tooltip> */}
      
      </motion.p>
      <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="-mb-4">
        <button
          className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
          // onClick={() => setShowUploadModal(true)}
        >
          {/* <Upload className="h-5 w-5 text-white group-hover:text-black" /> */}
          {/* <p>Upload a photo</p> */}
          <Upload />
        </button>
      </motion.div>
    </motion.div>
  );
};
export default Hero;
