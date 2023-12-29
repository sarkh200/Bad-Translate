const languages = ["af", "ga", "sq", "it", "ar", "ja", "az", "kn", "eu", "ko", "bn", "la", "be", "lv", "bg", "lt", "ca", "mk", "zh-CN", "ms", "zh-TW", "mt", "hr", "no", "cs", "fa", "da", "pl", "nl", "pt", "en", "ro", "eo", "ru", "et", "sr", "tl", "sk", "fi", "sl", "fr", "es", "gl", "sw", "ka", "sv", "de", "ta", "el", "te", "gu", "th", "ht", "tr", "iw", "uk", "hi", "ur", "hu", "vi", "is", "cy", "id", "yi"]
const badTranslated = ["la", "zh-TW", "zh-CN", "sa", "lo", "lus", "ko", "pl", "uk", "yo"];

let usedLanguages = languages;
let lastLang = "auto";

let iterations = 1;
let iterationNumber = 0;

function changeIteration(to) {
    iterationNumber = to;
    document.getElementById("iterationNumber").textContent = iterationNumber;
}

//https://translate.google.com/?hl=en&sl=auto&tl=InsertOutputLanguageHere&text=InsertInputTextHere&op=translate
function translate(input, language) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let newUrl = `https://translate.google.com/?hl=en&sl=${lastLang}&tl=${language}&text=${encodeURI(input)}&op=translate`;
        lastLang = language;
        chrome.tabs.update({ url: newUrl });
    });
}

chrome.runtime.onMessage.addListener(
    function (sender) {
        changeIteration(iterationNumber + 1);
        if (iterationNumber < iterations) {
            translate(sender.message, usedLanguages[Math.floor(Math.random() * usedLanguages.length)]);
        }
        else if (iterationNumber == iterations) {
            translate(sender.message, "en");
        }
    }
);

chrome.tabs.onUpdated.addListener(async function (tabId, info) {
    if (info.status === 'complete') {
        chrome.scripting
            .executeScript({
                target: { tabId: tabId },
                files: ["content.js"],
            });
    }
});

window.onload = function () {
    document.getElementById("translateButton").onclick = function () {
        if (document.getElementById("input").value != '') {
            changeIteration(0);
            lastLang = "auto";
            translate(document.getElementById("input").value, usedLanguages[Math.floor(Math.random() * usedLanguages.length)])
        }
    };
    document.getElementById("iterations").onchange = function () { iterations = document.getElementById("iterations").value; };

    document.getElementById("useLessAccurate").onchange = function () { if (document.getElementById("useLessAccurate").checked) { usedLanguages = badTranslated; console.log("Bad"); } else { usedLanguages = languages; } };
}