// Function to insert the "Copy" button below suggestions
function insertCopyButton() {
    const suggestionBox = document.querySelector(".aajZCb"); // Google suggestion container
    if (!suggestionBox) return;
  
    // Avoid duplicate buttons
    if (document.getElementById("copy-keywords-btn")) return;
  
    // Create the button
    const copyButton = document.createElement("button");
    copyButton.id = "copy-keywords-btn";
    copyButton.textContent = "Copy Suggested Keywords";
    copyButton.style.cssText = `
      margin-top: 10px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      display: block;
    `;
    copyButton.addEventListener("click", copyKeywords);
  
    // Append the button below the suggestion box
    suggestionBox.parentElement.appendChild(copyButton);
  }
  
  // Function to copy suggested keywords only
  function copyKeywords() {
    const suggestionSpans = document.querySelectorAll(".erkvQe li span"); // Google suggestion spans
    const keywords = Array.from(suggestionSpans)
      .map((el) => el.textContent.trim())
      .filter((text) => text && text.toLowerCase() !== "see more"); // Exclude "See more"
  
    if (keywords.length > 0) {
      // Copy keywords to clipboard
      navigator.clipboard.writeText(keywords.join("\n")).then(() => {
        alert("Keywords copied to clipboard:\n" + keywords.join("\n"));
      }).catch((error) => {
        console.error("Failed to copy keywords:", error);
      });
    } else {
      alert("No valid suggestions found!");
    }
  }
  
  // Monitor the DOM for changes and insert the button dynamically
  const observer = new MutationObserver(() => {
    insertCopyButton();
  });
  
  // Start observing the DOM for changes
  observer.observe(document.body, { childList: true, subtree: true });
  