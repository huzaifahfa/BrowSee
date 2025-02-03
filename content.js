// content.js
function getListingImage() {
    const imgElements = document.querySelectorAll("img"); // Select all images
    let listingImage = null;
  
    imgElements.forEach((img) => {
      if (img.src.includes("marketplace")) { // Check if the image is from Marketplace
        listingImage = img;
      }
    });
  
    if (listingImage) {
      console.log("Listing image found:", listingImage);
      fetch(listingImage.src)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            chrome.runtime.sendMessage(
              {
                action: "describeImage",
                image: reader.result,
              },
              (response) => {
                if (response && response.description) {
                  speakDescription(response.description);
                } else {
                  console.error("No description received.");
                }
              }
            );
          };
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    } else {
      console.error("No listing image found.");
    }
  }
  
  function speakDescription(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  }
  
  // Expose the function to the global scope
  window.getListingImage = getListingImage;