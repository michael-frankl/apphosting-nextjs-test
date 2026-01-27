"use server";

let counterState = 0;

export async function getCounterState() {
	console.log("counterState", counterState);
	return counterState;
}

export async function increaseCounter() {
	counterState++;
	console.log("increateCounter", counterState);
	return counterState;
}

export async function decreaseCounter() {
	console.log("decreaseCounter", counterState);
	counterState--;
	return counterState;
}
