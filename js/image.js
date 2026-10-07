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

function setupActions(
    item,
    imagePath,
    title
) {

    const imageId =
        item.getAttribute("id");


    const downloadButton =
        document.getElementById(
            "download-btn"
        );


    const shareButton =
        document.getElementById(
            "share-btn"
        );


    const saveButton =
        document.getElementById(
            "save-btn"
        );


    /* -----------------------------------------------------
       DOWNLOAD
    ----------------------------------------------------- */

    downloadButton.addEventListener(
        "click",
        () => {

            downloadImage(
                imagePath,
                title
            );

        }
    );


    /* -----------------------------------------------------
       SHARE
    ----------------------------------------------------- */

    shareButton.addEventListener(
        "click",
        () => {

            shareImage(
                imageId,
                title
            );

        }
    );


    /* -----------------------------------------------------
       SAVE
    ----------------------------------------------------- */

    updateSaveButton(
        imageId
    );


    saveButton.addEventListener(
        "click",
        () => {

            toggleSave(
                item
            );

        }
    );

}


/* =========================================================
   DOWNLOAD IMAGE
========================================================= */

function downloadImage(
    imagePath,
    title
) {

    const link =
        document.createElement("a");


    link.href = imagePath;

    link.download =
        createFileName(title);


    document.body.appendChild(link);

    link.click();

    link.remove();

}


/* =========================================================
   SHARE IMAGE
========================================================= */

async function shareImage(
    imageId,
    title
) {

    const url =
        `${window.location.origin}${window.location.pathname}?id=${imageId}`;


    if (
        navigator.share
    ) {

        try {

            await navigator.share({
                title: title,
                text: title,
                url: url
            });

        }

        catch (error) {

            if (
                error.name !==
                "AbortError"
            ) {

                console.error(
                    "خطا در اشتراک‌گذاری:",
                    error
                );

            }

        }

        return;
    }


    try {

        await navigator.clipboard.writeText(
            url
        );


        alert(
            "لینک تصویر کپی شد."
        );

    }

    catch (error) {

        console.error(
            "خطا در کپی لینک:",
            error
        );

    }

}


/* =========================================================
   SAVE
========================================================= */

function toggleSave(item) {

    const imageId =
        item.getAttribute("id");


    let savedItems =
        JSON.parse(
            localStorage.getItem(
                "mesbah_saved_contents"
            ) || "[]"
        );


    const index =
        savedItems.findIndex(
            saved =>
                String(
                    saved.id
                ) === String(imageId)
        );


    if (index !== -1) {

        savedItems.splice(
            index,
            1
        );

    }

    else {

        savedItems.push({

            id: imageId,

            type: "image",

            title:
                getXMLValue(
                    item,
                    "title"
                ),

            image:
                getXMLValue(
                    item,
                    "image"
                )

        });

    }


    localStorage.setItem(
        "mesbah_saved_contents",
        JSON.stringify(savedItems)
    );


    updateSaveButton(
        imageId
    );

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


    const savedItems =
        JSON.parse(
            localStorage.getItem(
                "mesbah_saved_contents"
            ) || "[]"
        );


    const isSaved =
        savedItems.some(
            saved =>
                String(saved.id) === String(imageId) &&
                saved.type === "image"
        );


    saveButton.classList.toggle(
        "is-saved",
        isSaved
    );


    /* فقط کلاس آیکن موجود را تغییر بده */

    saveIcon.classList.toggle(
        "fa-solid",
        isSaved
    );

    saveIcon.classList.toggle(
        "fa-regular",
        !isSaved
    );


    saveText.textContent =
        isSaved
            ? "ذخیره‌شده"
            : "ذخیره";
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