import gsap from "gsap"
import { writable, get } from "svelte/store"

export const darkMode = writable(localStorage.getItem("darkMode") == "true")
export const theme = writable(localStorage.getItem("theme") || "green")
export const historyLength = writable(localStorage.getItem("historyLength") || "100")
export const transitionLength = writable(localStorage.getItem("transitionLength") || "1")
export const hideChannel = writable(localStorage.getItem("hideChannel") == "true")
export const superSecretSetting = writable(false)

// updating on first run (no animations)

if (get(darkMode)) {
	document.documentElement.style.setProperty("--p", "#777") // very very dry
	document.documentElement.style.setProperty("--t0", "black")
	document.documentElement.style.setProperty("--t1", "#171717")
	document.documentElement.style.setProperty("--t2", "#272727")
	document.documentElement.style.setProperty("--t3", "#555")
	document.documentElement.style.setProperty("--t4", "white")
	document.documentElement.style.setProperty("--d", "1")
} else {
	document.documentElement.style.setProperty("--p", "white")
	document.documentElement.style.setProperty("--t0", "white")
	document.documentElement.style.setProperty("--t1", "#ddd")
	document.documentElement.style.setProperty("--t2", "#ccc")
	document.documentElement.style.setProperty("--t3", "#aaa")
	document.documentElement.style.setProperty("--t4", "black")
	document.documentElement.style.setProperty("--d", "0")
}

const themes: any = {
	green: ["#31a47e", "#31837e"],
	blue: ["#31a4fe", "#3183fe"],
	orange: ["#fea431", "#fe8831"],
	indigo: ["#2a3a8a", "#1a2a77"],
	red: ["#be0031", "#7e0031"],
}

document.documentElement.style.setProperty("--main", themes[get(theme)][0])
document.documentElement.style.setProperty("--main-dark", themes[get(theme)][1])

function changeTheme(themeValue: string) {
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main": themes[themeValue][0] })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main-dark": themes[themeValue][1] })
}

document.documentElement.style.setProperty("--transitionLength", get(transitionLength))

function randomColor() {
	// thanks, tutorialspoint	https://www.tutorialspoint.com/generating-random-hex-color-in-javascript
	let color = "#"
	for (let i = 0; i < 6; i++) {
		const random = Math.random()
		const bit = (random * 16) | 0
		color += bit.toString(16)
	}
	return color
}

let lastSuperSecretSetting: number
const superSecretSettings = [
	// [0] is the setter, [1] is the unsetter
	[
		() => {
			gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main": randomColor() })
			gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--main-dark": randomColor() })
		},
		() => {
			const currentTheme = localStorage.getItem("theme") || "green"
			theme.set(currentTheme)
			changeTheme(currentTheme)
		},
	],
	[
		() => {
			document.documentElement.style.setProperty("--transform", `rotate(${(Math.random() - 0.5) * 20}deg)`)
		},
		() => {
			document.documentElement.style.setProperty("--transform", "")
		},
	],
	[
		() => {
			document.documentElement.style.setProperty("--filter", "invert(1)")
		},
		() => {
			document.documentElement.style.setProperty("--filter", "")
		},
	],
	[
		() => {
			document.documentElement.style.setProperty("--filter", "blur(2px)")
		},
		() => {
			document.documentElement.style.setProperty("--filter", "")
		},
	],
	[
		() => {
			document.documentElement.style.setProperty("--transform", `scale(${Math.random() > 0.5 ? 0.9 : -1}, ${Math.random() > 0.5 ? 0.9 : -1})`)
		},
		() => {
			document.documentElement.style.setProperty("--transform", "")
		},
	],
	[
		() => {
			document.documentElement.style.setProperty("--font", `"Comic Sans MS"`)
		},
		() => {
			document.documentElement.style.setProperty("--font", "")
		},
	],
]

// actual settings updating (animations)

darkMode.subscribe(value => {
	localStorage.setItem("darkMode", String(value))

	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--p": value ? "#777" : "white" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--t0": value ? "black" : "white" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--t1": value ? "#171717" : "#ddd" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--t2": value ? "#272727" : "#ccc" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--t3": value ? "#555" : "#aaa" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--t4": value ? "white" : "black" })
	gsap.to(":root", { duration: 0.3 * parseFloat(get(transitionLength)), "--d": value ? "1" : "0" })
})

theme.subscribe(value => {
	localStorage.setItem("theme", value)
	changeTheme(value)
})

historyLength.subscribe(value => {
	localStorage.setItem("historyLength", value)
})

transitionLength.subscribe(value => {
	localStorage.setItem("transitionLength", value)
	document.documentElement.style.setProperty("--transitionLength", value)
})

hideChannel.subscribe(value => {
	localStorage.setItem("hideChannel", value.toString())
})

superSecretSetting.subscribe(value => {
	if (value) {
		const rand = Math.floor(Math.random() * superSecretSettings.length)
		superSecretSettings[rand][0]()
		lastSuperSecretSetting = rand
		return
	} else if (lastSuperSecretSetting !== undefined) {
		superSecretSettings[lastSuperSecretSetting][1]()
	}
})
