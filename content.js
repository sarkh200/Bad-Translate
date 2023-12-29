let nullAmount = 0;
let translation = null;
let text = '';

let interval = setInterval(() => {
    translation = document.querySelector("span[jsname='W297wb']");

    console.log(translation == null);

    if (translation != null) {
        nullAmount = 0;
        clearInterval(interval)
        document.querySelectorAll("span[jsname='W297wb']").forEach((node) => {
            text = text.concat(node.textContent);
        });
        console.log(text);
        chrome.runtime.sendMessage({ message: text });
    }
    else if (nullAmount > 10) {
        nullAmount = 0;
        //document.querySelector("#yDmH0d > c-wiz > div > div.ToWKne > c-wiz > div.OlSOob > c-wiz > div.ccvoYb.EjH7wc > div.AxqVh > div.OPPzxe > c-wiz.sciAJc > div > div.yHkUKc > div:nth-child(3) > button").click()
        location.reload();
    }
    else {
        nullAmount++;
    }
}, 100)
