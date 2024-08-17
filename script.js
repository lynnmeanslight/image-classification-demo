const resultsList = document.getElementById("results");
const uploadInput = document.getElementById("image-upload");
const detectButton = document.getElementById("detect-button");
const resultText = document.getElementById("result");
const uploadedImage = document.getElementById("uploaded-image");

detectButton.addEventListener("click", async () => {
  const selectedFile = uploadInput.files[0];
  if (!selectedFile) {
    resultText.textContent = "Please select an image to detect.";
    return;
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/umm-maybe/AI-image-detector",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer API_KEY",
          "Content-Type": "application/json",
        },
        body: selectedFile,
      }
    );

    const data = await response.json();
    resultsList.innerText = "";
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.label}: ${item.score}`;
      resultsList.appendChild(listItem);
    });
  } catch (error) {
    console.log(error);
    resultText.textContent = "An error occurred during detection.";
  }
});

uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.src = e.target.result;
      uploadedImage.hidden = false;
    };
    reader.readAsDataURL(file);
  }
});
