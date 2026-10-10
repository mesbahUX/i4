/* =========================================================
   IMAGE PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadImagePage();

});


/* =========================================================
   LOAD IMAGE
========================================================= */

async function loadImagePage() {

    const params = new URLSearchParams(window.location.search);

    const imageId = params.get("id");


    if (!imageId) {

        showImageError("تصویر موردنظر پیدا نشد.");

        return;
    }


    try {

        const response = await fetch("data/images.xml");


        if (!response.ok) {
            throw new Error("خطا در دریافت فایل تصاویر");
        }


        const xmlText = await response.text();

        const parser = new DOMParser();

        const xml = parser.parseFromString(
            xmlText,
            "application/xml"
        );


        const imageItems = xml.querySelectorAll("image");


        let imageItem = null;


        imageItems.forEach(item => {

            if (
                item.getAttribute("id") === imageId
            ) {

                imageItem = item;

            }

        });


        if (!imageItem) {

            showImageError("تصویر موردنظر پیدا نشد.");

            return;
        }


        renderImage(imageItem);

    }

    catch (error) {

        console.error(
            "خطا در بارگذاری تصویر:",
            error
        );

        showImageError(
            "خطا در بارگذاری تصویر."
        );

    }

}


/* =========================================================
   RENDER IMAGE
========================================================= */

function renderImage(item) {

    const title =
        getXMLValue(item, "title");

    const imagePath =
        getXMLValue(item, "image");


    /* -----------------------------------------------------
       TITLE
    ----------------------------------------------------- */

    const titleElement =
        document.getElementById("image-title");

    titleElement.textContent =
        title || "تصویر";


    /* -----------------------------------------------------
       IMAGE
    ----------------------------------------------------- */

    const imageElement =
        document.getElementById("image");


    imageElement.src = imagePath;

    imageElement.alt =
        title || "تصویر";


    /* -----------------------------------------------------
       TAGS
    ----------------------------------------------------- */

    renderTags(item);


    /* -----------------------------------------------------
       ACTIONS
    ----------------------------------------------------- */

    setupActions(
        item,
        imagePath,
        title
    );


    /* -----------------------------------------------------
       PAGE TITLE
    ----------------------------------------------------- */

    document.title =
        `${title || "تصویر"} | مصباح`;

}


/* =========================================================
   RENDER TAGS
========================================================= */

function renderTags(item) {

    const tagsContainer =
        document.getElementById("image-tags");


    tagsContainer.innerHTML = "";


    const tags =
        item.querySelectorAll("tags > tag");


    tags.forEach(tag => {

        const tagText =
            tag.textContent.trim();


        if (!tagText) {
            return;
        }


        const tagElement =
            document.createElement("span");


        tagElement.className =
            "image-tag";


        tagElement.textContent =
            tagText;


        tagsContainer.appendChild(
            tagElement
        );

    });


    if (!tags.length) {

        const title =
            document.querySelector(
                ".image-tags-title"
            );

        title.style.display = "none";

    }

}

/* =========================================================
   ACTIONS
========================================================= */

function setupActions(item, imagePath, title) {

    const imageId = String(item.getAttribute("id"));

    const downloadButton =
        document.getElementById("download-btn");

    const shareButton =
        document.getElementById("share-btn");

    const saveButton =
        document.getElementById("save-btn");


    /* DOWNLOAD */

    downloadButton?.addEventListener("click", () => {
        downloadImage(imagePath, title);
    });


    /* SHARE */

    shareButton?.addEventListener("click", () => {
        shareImage(imagePath, imageId, title);
    });


    /* SAVE */

    updateSaveButton(imageId);

    saveButton?.addEventListener("click", () => {
        toggleSave(imageId);
    });

}


/* =========================================================
   DOWNLOAD IMAGE
========================================================= */

async function downloadImage(imagePath, title) {

    try {

        const response = await fetch(imagePath);

        if (!response.ok) {
            throw new Error("دریافت فایل تصویر ناموفق بود.");
        }

        const blob = await response.blob();

        const extension =
            blob.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";

        const fileName =
            `${createFileName(title).replace(/\.[^.]+$/, "")}.${extension}`;

        const objectURL = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = objectURL;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(objectURL), 1000);

    } catch (error) {

        console.error("خطا در دانلود تصویر:", error);

        alert(
            "دانلود تصویر انجام نشد. ممکن است سرور اجازهٔ دریافت فایل را ندهد."
        );

    }

}


/* =========================================================
   SHARE IMAGE
========================================================= */

async function shareImage(imagePath, imageId, title) {

    const url = new URL(
        "image.html",
        window.location.href
    );

    url.searchParams.set("id", imageId);

    try {

        if (navigator.share) {

            const response = await fetch(imagePath);

            if (!response.ok) {
                throw new Error("دریافت فایل تصویر ناموفق بود.");
            }

            const blob = await response.blob();

            const extension =
                blob.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";

            const file = new File(
                [blob],
                `${createFileName(title).replace(/\.[^.]+$/, "")}.${extension}`,
                {
                    type: blob.type || "image/jpeg"
                }
            );

            if (
                navigator.canShare &&
                navigator.canShare({ files: [file] })
            ) {

                await navigator.share({
                    title: title,
                    text: `از سامانه مصباح\n${url.href}`,
                    files: [file]
                });

            } else {

                await navigator.share({
                    title: title,
                    text: `${title}\nاز سامانه مصباح\n${url.href}`,
                    url: url.href
                });

            }

            return;
        }


        /* مرورگر بدون Web Share API */

        await navigator.clipboard.writeText(url.href);

        alert(
            "مرورگر شما اشتراک‌گذاری مستقیم عکس را پشتیبانی نمی‌کند؛ لینک صفحهٔ تصویر کپی شد."
        );

    } catch (error) {

        if (error.name === "AbortError") {
            return;
        }

        console.error("خطا در اشتراک‌گذاری تصویر:", error);

        alert("اشتراک‌گذاری تصویر انجام نشد.");

    }

}


/* =========================================================
   SAVE / UNSAVE
   فقط ذخیرهٔ آیدی تصویر
========================================================= */

function toggleSave(imageId) {

    const id = String(imageId);

    let savedItems = [];

    try {

        savedItems = JSON.parse(
            localStorage.getItem("mesbah_saved_images") || "[]"
        );

        if (!Array.isArray(savedItems)) {
            savedItems = [];
        }

    } catch {

        savedItems = [];

    }


    const isSaved = savedItems.some(
        saved => String(saved) === id
    );


    if (isSaved) {

        savedItems = savedItems.filter(
            saved => String(saved) !== id
        );

    } else {

        savedItems.push(id);

    }


    localStorage.setItem(
        "mesbah_saved_images",
        JSON.stringify(savedItems)
    );


    updateSaveButton(id);

}


/* =========================================================
   UPDATE SAVE BUTTON
========================================================= */

function updateSaveButton(imageId) {

    const saveButton =
        document.getElementById("save-btn");

    const saveIcon =
        document.getElementById("save-icon");

    const saveText =
        document.getElementById("save-text");


    if (!saveButton) return;


    let savedItems = [];

    try {

        savedItems = JSON.parse(
            localStorage.getItem("mesbah_saved_images") || "[]"
        );

        if (!Array.isArray(savedItems)) {
            savedItems = [];
        }

    } catch {

        savedItems = [];

    }


    const isSaved = savedItems.some(
        saved => String(saved) === String(imageId)
    );


    saveButton.classList.toggle("is-saved", isSaved);


    if (saveIcon) {

        saveIcon.classList.toggle("fa-solid", isSaved);
        saveIcon.classList.toggle("fa-regular", !isSaved);

    }


    if (saveText) {

        saveText.textContent = isSaved
            ? "ذخیره‌شده"
            : "ذخیره";

    }

}


/* =========================================================
   IMAGE FILE NAME
========================================================= */

function createFileName(title) {

    const safeTitle = (title || "image")
        .replace(/[\\/:*?"<>|]/g, "")
        .trim();

    return `${safeTitle || "image"}.jpg`;

}

/* =========================================================
   XML VALUE
========================================================= */

function getXMLValue(
    parent,
    tagName
) {

    const element =
        parent.querySelector(
            `:scope > ${tagName}`
        );


    return element
        ? element.textContent.trim()
        : "";

}


/* =========================================================
   FILE NAME
========================================================= */

function createFileName(
    title
) {

    if (!title) {
        return "image.jpg";
    }


    return title
        .replace(
            /[\\/:*?"<>|]/g,
            ""
        )
        .trim()
        + ".jpg";

}


/* =========================================================
   ERROR
========================================================= */

function showImageError(
    message
) {

    const page =
        document.querySelector(
            ".image-page"
        );


    if (!page) {
        return;
    }


    page.innerHTML = `
        <div class="image-error">
            ${message}
        </div>
    `;

}