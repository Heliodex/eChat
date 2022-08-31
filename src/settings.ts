import gsap from "gsap"
import { writable, get } from "svelte/store"

export const darkMode = writable(localStorage.getItem("darkMode") == "true")
export const theme = writable(localStorage.getItem("theme") || "green")
export const historyLength = writable(localStorage.getItem("historyLength") || "100")
export const transitionLength = writable(localStorage.getItem("transitionLength") || "1")
export const hideChannel = writable(localStorage.getItem("hideChannel") == "true")

// updating on first run (no animations)

if (get(darkMode)) {
	document.documentElement.style.setProperty("--p", "#777") // very very dry
	document.documentElement.style.setProperty("--t0", "black")
	document.documentElement.style.setProperty("--t1", "#111")
	document.documentElement.style.setProperty("--t2", "#222")
	document.documentElement.style.setProperty("--t3", "#777")
	document.documentElement.style.setProperty("--t4", "white")
	document.documentElement.style.setProperty("--d", "1")
} else {
	document.documentElement.style.setProperty("--p", "white")
	document.documentElement.style.setProperty("--t0", "white")
	document.documentElement.style.setProperty("--t1", "#111")
	document.documentElement.style.setProperty("--t2", "#ccc")
	document.documentElement.style.setProperty("--t3", "#aaa")
	document.documentElement.style.setProperty("--t4", "black")
	document.documentElement.style.setProperty("--d", "0")
}

switch (get(theme)) {
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
	
document.documentElement.style.setProperty("--transitionLength", get(transitionLength))

// actual settings updating (animations)

darkMode.subscribe(value => {
	localStorage.setItem("darkMode", String(value))

	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--p": value ? "#777" : "white" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--t0": value ? "black" : "white" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--t2": value ? "#222" : "#ccc" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--t3": value ? "#777" : "#aaa" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--t4": value ? "white" : "black" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--d": value ? "1" : "0" })
})

theme.subscribe(value => {
	localStorage.setItem("theme", value)
	switch (value) {
		case "green":
			gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main": "#31a47e" })
			gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main-dark": "#31837e" })
			break
		case "blue":
			gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main": "#31a4fe" })
			gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main-dark": "#3183fe" })
			break
		case "orange":
			gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main": "#fea431" })
			gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main-dark": "#fe8831" })
			break
	}
})

historyLength.subscribe(value => {
	localStorage.setItem("historyLength", value)
})

transitionLength.subscribe(value => {
	localStorage.setItem("transitionLength", value)
	document.documentElement.style.setProperty("--transitionLength", value)
})