// popup.js
document.getElementById("describe").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        // Call the globally exposed function
        if (typeof window.getListingImage === "function") {
          window.getListingImage();
        } else {
          console.error("getListingImage is not defined.");
        }
      },
    });
  });
});