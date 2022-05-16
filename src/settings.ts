import { writable } from "svelte/store"

export const darkMode = writable(localStorage.getItem("darkMode") || false)
export const theme = writable(localStorage.getItem("theme") || "green")

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
		// case "red":
		// 	document.documentElement.style.setProperty("--main", "#fe4131")
		// 	document.documentElement.style.setProperty("--main-dark", "#fe3131")
		// 	break
		// case "purple":
		// 	document.documentElement.style.setProperty("--main", "#a431fe")
		// 	document.documentElement.style.setProperty("--main-dark", "#8331fe")
		// 	break
	}
	localStorage.setItem("theme", value)
})