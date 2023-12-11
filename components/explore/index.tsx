"use client";

import { CardPost } from "../cards/books-list";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
const Explore = () => {
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  
  const fetchData = async () => {
    const res = await fetch("/api/books");
    const rep = await res.json();
    setData(rep);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);

    fetchData();
  }, []);
  // useEffect(() => {
  //   fetchData();
  // }, [loading]);

  // console.log("Teh user: " , user.user?.id)

  return (
    <div className="">
      <motion.h1
        className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-2xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-4xl md:leading-[5rem]"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        Available Dumps.
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        {data ? (
          data!.map((book: any) => {
            return (
              <div className="" key={book.id}>
                <CardPost book={book} fetcher={fetchData}/>
              </div>
            );
          })
        ) : (
          // <div>
          //   <CardPost />
          // </div>

          <>
            <div>
              <Skeleton className="h-5 w-1/5 mb-1" />

              <Skeleton className="h-4 w-4/5 mb-1" />
              <Skeleton className="h-20 w-4/5" />
            </div>
            <div>
              <Skeleton className="h-5 w-1/5 mb-1" />

              <Skeleton className="h-4 w-4/5 mb-1" />
              <Skeleton className="h-20 w-4/5" />
            </div>
            <div>
              <Skeleton className="h-5 w-1/5 mb-1" />

              <Skeleton className="h-4 w-4/5 mb-1" />
              <Skeleton className="h-20 w-4/5" />
            </div>
          </>
        )}

        {/* <div>
          <CardPost />
        </div>
        <div>
          <CardPost />
        </div> */}
      </div>
    </div>
  );
};
export default Explore;
