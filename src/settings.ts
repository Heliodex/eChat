import { writable } from "svelte/store"

export const darkMode = writable(localStorage.getItem("darkMode") == "true" || false)
export const theme = writable(localStorage.getItem("theme") || "green")
export const historyLength = writable(localStorage.getItem("historyLength") || "100")
export const transitionLength = writable(localStorage.getItem("transitionLength") || "Normal")

darkMode.subscribe(value => {
	if (value) {
		document.documentElement.style.setProperty("--p", "#777")
		document.documentElement.style.setProperty("--t1", "black")
		document.documentElement.style.setProperty("--t2", "#222")
		document.documentElement.style.setProperty("--t3", "#777")
		document.documentElement.style.setProperty("--t4", "white")
	} else {
		document.documentElement.style.setProperty("--p", "white")
		document.documentElement.style.setProperty("--t1", "white")
		document.documentElement.style.setProperty("--t2", "#ccc")
		document.documentElement.style.setProperty("--t3", "#aaa")
		document.documentElement.style.setProperty("--t4", "black")
	}
	localStorage.setItem("darkMode", String(value))
})

theme.subscribe(value => {
	switch (value) {
		case "green":
			document.documentElement.style.setProperty("--main", "#31a47e")
			document.documentElement.style.setProperty("--main-dark", "#31837e")
			break
		case "blue":
			document.documentElement.style.setProperty("--main", "#31a4fe")
			document.documentElement.style.setProperty("--main-dark", "#3183fe")
			break
		case "orange":
			document.documentElement.style.setProperty("--main", "#fea431")
			document.documentElement.style.setProperty("--main-dark", "#fe8331")
			break
	}
	localStorage.setItem("theme", value)
})

historyLength.subscribe(value => {
	localStorage.setItem("historyLength", value)
})

transitionLength.subscribe(value => {
	localStorage.setItem("transitionLength", value)
})