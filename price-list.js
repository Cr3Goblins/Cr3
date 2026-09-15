(() => {
  const dialog = document.querySelector("#image-lightbox");

  if (!dialog || typeof dialog.showModal !== "function") {
    return;
  }

  const enlargedPhoto = dialog.querySelector(".lightbox-image");
  const photoName = dialog.querySelector(".lightbox-name");
  const photoCount = dialog.querySelector(".lightbox-count");
  const closeButton = dialog.querySelector(".lightbox-close");
  const previousButton = dialog.querySelector(".lightbox-previous");
  const nextButton = dialog.querySelector(".lightbox-next");
  let galleryPhotos = [];
  let currentIndex = 0;
  let openingButton = null;

  function showPhoto(index) {
    currentIndex = (index + galleryPhotos.length) % galleryPhotos.length;
    const photo = galleryPhotos[currentIndex];

    enlargedPhoto.src = photo.currentSrc || photo.src;
    enlargedPhoto.alt = photo.alt;
    photoName.textContent = photo.alt;
    photoCount.textContent = galleryPhotos.length > 1
      ? `${currentIndex + 1} of ${galleryPhotos.length}`
      : "1 photo";

    const hasMultiplePhotos = galleryPhotos.length > 1;
    previousButton.hidden = !hasMultiplePhotos;
    nextButton.hidden = !hasMultiplePhotos;
  }

  function openPhoto(photo, button) {
    galleryPhotos = Array.from(photo.closest(".tool-gallery").querySelectorAll("img"));
    openingButton = button;
    showPhoto(galleryPhotos.indexOf(photo));
    document.documentElement.classList.add("lightbox-open");
    dialog.showModal();
    closeButton.focus();
  }

  document.querySelectorAll(".tool-gallery img").forEach((photo) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-image-button";
    button.setAttribute("aria-label", `Enlarge ${photo.alt || "tool photo"}`);
    photo.before(button);
    button.append(photo);
    button.addEventListener("click", () => openPhoto(photo, button));
  });

  closeButton.addEventListener("click", () => dialog.close());
  previousButton.addEventListener("click", () => showPhoto(currentIndex - 1));
  nextButton.addEventListener("click", () => showPhoto(currentIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && galleryPhotos.length > 1) {
      showPhoto(currentIndex - 1);
    }

    if (event.key === "ArrowRight" && galleryPhotos.length > 1) {
      showPhoto(currentIndex + 1);
    }
  });

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("lightbox-open");
    enlargedPhoto.removeAttribute("src");
    openingButton?.focus();
  });
})();
