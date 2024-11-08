
chrome.runtime.onMessage.addListener((data) => {
	const { event, prefs } = data;
	switch (event) {
		case "onStart":
			handleOnStart(prefs);
			break;
		default:
			break;
	}
});

const handleOnStart = (prefs) => {
	console.log("prefs received:", prefs);
    chrome.storage.local.set(prefs);
};