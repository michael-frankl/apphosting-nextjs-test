"use client";

import {useEffect, useState} from "react";
import {getCounterState, increaseCounter} from "@/app/counterlib";

export default function Counter() {
	const [counter, setCounter] = useState<number>(0);

	useEffect(() => {
		getCounterState().then((counter) => setCounter(()=>counter));
	}, [counter]);

	async function plus() {
		const newCounter = await increaseCounter();
		setCounter(newCounter);
	}

	return <><div className="px-4 border-2">{counter}</div> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={plus}>+</button> </>
}
