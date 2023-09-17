# everyday-gita-text-automation
Automation for Everyday G.I.T.A Text 
This script allows for the automated extraction of verses from the Bhagavad Gita as present on the website [shlokam.org](https://shlokam.org). It fetches the verses chapter-wise, and after completing each chapter, a `.txt` file containing the verses of that chapter is downloaded.

## Features

- Batch extraction of verses.
- Auto-download verses in text format chapter-wise.
- Configurable to specify which chapter to start with.

## Prerequisites

- A web browser with Developer Tools (like Chrome, Firefox).
- Access to the website [shlokam.org](https://shlokam.org).

## How to Use

1. **Navigate to the Website:**
   
   Open your web browser and visit [shlokam.org](https://shlokam.org).

2. **Open Developer Tools:**

   - **For Chrome**: Press `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac).
   - **For Firefox**: Press `Ctrl + Shift + K` (Windows/Linux) or `Cmd + Option + K` (Mac).

3. **Run the Script:**

   Copy the provided JavaScript script and paste it into the console tab of the Developer Tools and press `Enter`.

4. **Wait for Extraction and Download:**

   The script will start fetching the verses chapter-wise. After completing each chapter, a `.txt` file containing the verses of that chapter will be automatically downloaded. By default, the script starts with Chapter 12, but you can modify it to start from any chapter.

5. **Stopping the Script:**

   If you want to stop the extraction at any point, you can typically do this by closing or refreshing the browser tab.

## Notes

- The extraction might take some time depending on the number of verses and chapters. Ensure you have a stable internet connection.
- Make sure pop-ups are not blocked in the browser settings, as it might interfere with the downloading of files.
- If the website structure changes in the future, the script might need modifications to work correctly.

## Credits

- Verses Source: [shlokam.org](https://shlokam.org)
- Script developed with assistance from OpenAI's ChatGPT.

