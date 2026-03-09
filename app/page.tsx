import Link from "next/link";
import ExamplesEasy from "./examples-easy/page";

export default function Home() {


  return (

    <div className="bg-amber-100 w-[300px] h-[300px] absolute left-1/2 top-1/2 -translate-1/2 p-6 ">
      <div className="text-2xl hover:text-amber-300 w-fit">
        <Link href="/examples-easy">Легкие задачки</Link>
      </div>
    </div>

  );
}