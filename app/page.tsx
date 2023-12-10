import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/hero/hero";
import Explore from "@/components/explore";


export const metadata = {
  title: "Book Dumps",
  description: "A place where you dump your book to the public"

}

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 'h-screen w-full bg-gradient-to-br from-purple-100 via-emerald-50-50 to-emerald-100 backdrop-blur-xl z-30 transition-all'">
      <Hero/>
      <Explore />
    </main>
  );
}
