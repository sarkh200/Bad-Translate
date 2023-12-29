function redirect(){
    console.log("Redirected!");
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        let newUrl = tabs[0].url.replace("youtube.com/shorts", "youtube.com/watch");
        if(newUrl != tabs[0].url){
            chrome.tabs.update(undefined, { url: newUrl });
            console.log(`from ${tabs[0].url} to ${newUrl}`);
        }
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    redirect();
})