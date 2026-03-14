'use client'

import Example1 from "./example-1/page";
import Example2 from "./example-2/page";
import Example3 from "./example-3/page";

export default function ExamplesEasy() {
    return (
        <div className="grid grid-cols-2 gap-x-[60px] gap-y-[200px] p-10">
            <Example1 />
            <Example2 />
            <Example3 />
        </div>
    );
}