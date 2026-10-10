/* =========================================================
   CARD FACTORY
   ساخت کارت بر اساس type
========================================================= */

function createCard(item) {

    const itemType =
        getXMLValue(item, "type");


    switch (itemType) {

        case "video":
            return createVideoCard(item);

        case "audio":
            return createAudioCard(item);

        case "playlist":
            return createPlaylistCard(item);
            
        case "book":
            return createBookCard(item);
        case "image":
            return createImageCard(item);
        case "speaker":
            return createSpeakerCard(item);

        case "topic":
            return createTopicCard(item);

            
        default:
            return null;

    }

}


/* =========================================================
   GET XML VALUE
========================================================= */

function getXMLValue(item, tag) {

    return (
        item.querySelector(tag)
            ?.textContent
            .trim() || ""
    );

}


/* =========================================================
   VIDEO CARD
========================================================= */

function createVideoCard(item) {

    const id = item.getAttribute("id");

    const title =
        getXMLValue(item, "title");

    const speaker =
        getXMLValue(item, "speaker");

    const image =
        getXMLValue(item, "image");

    const duration =
        getXMLValue(item, "duration");


    const card =
        document.createElement("a");


    card.href =
        `content.html?id=${id}`;


    card.className =
        "content-card video-card";


    card.innerHTML = `

        <div class="content-card-image">

            <img
                src="${image}"
                alt="${title}"
            >

            <span class="content-card-icon">

                <i class="fa-solid fa-video"></i>

            </span>


            ${
                duration
                    ? `
                        <span class="video-duration">
                            ${duration}
                        </span>
                    `
                    : ""
            }

        </div>


        <!-- <div class="content-card-body">

            <h3>
                ${title}
            </h3>

            <p>
                ${speaker}
            </p>

        </div> -->
        
<div class="content-card-body">

    <div class="card-title-row">

        <h3>
            ${title}
        </h3>

    </div>

    <p>
        ${speaker}
    </p>

</div>
    `;

const titleRow =
    card.querySelector(".card-title-row");

titleRow.appendChild(
    createCardActions(id, "content")
);

    return card;

}


/* =========================================================
   AUDIO CARD
========================================================= */

function createAudioCard(item) {

    const id = item.getAttribute("id");

    const title =
        getXMLValue(item, "title");

    const speaker =
        getXMLValue(item, "speaker");

    const image =
        getXMLValue(item, "image");


    const card =
        document.createElement("a");


    card.href =
        `content.html?id=${id}`;


    card.className =
        "content-card audio-card";


    card.innerHTML = `

        <div class="content-card-image">

            <img
                src="${image}"
                alt="${title}"
            >
            <span class="content-card-icon">

                <i class="fa-solid fa-headphones"></i>

            </span>
        </div>


        <!-- <div class="content-card-body">

            <h3>
                ${title}
            </h3>

            <p>
                ${speaker}
            </p>

        </div> -->
<div class="content-card-body">

    <div class="card-title-row">

        <h3>
            ${title}
        </h3>

    </div>

    <p>
        ${speaker}
    </p>

</div>
    `;

const titleRow =
    card.querySelector(".card-title-row");

titleRow.appendChild(
    createCardActions(id, "content")
);

    return card;

}


/* =========================================================
   PLAYLIST CARD
========================================================= */

function createPlaylistCard(item) {

    const id =
        item.getAttribute("id");


    const title =
        getXMLValue(item, "title");


    const description =
        getXMLValue(item, "description");


    const format =
        getXMLValue(item, "format");


    const image1 =
        getXMLValue(item, "image1");


    const image2 =
        getXMLValue(item, "image2");


    const image3 =
        getXMLValue(item, "image3");


    /* =========================================================
       FORMAT INFO
    ========================================================= */

    let formatIcon = "fa-solid fa-layer-group";
    let formatText = "";


    if (format === "audio") {

        // formatIcon =
        //     "fa-solid fa-headphones";

        formatText =
            "صوتی";

    }

    else if (format === "video") {

        // formatIcon =
        //     "fa-solid fa-video";

        formatText =
            "تصویری";

    }

    else if (format === "mixed") {

        // formatIcon =
        //     "fa-solid fa-photo-film";

        formatText =
            "صوتی-تصویری";

    }


    /* =========================================================
       CREATE CARD
    ========================================================= */

    const card =
        document.createElement("a");


    card.href =
        `playlist.html?id=${id}`;


    card.className =
        "playlist-card";


    card.innerHTML = `

        <div class="playlist-image">

            <div class="playlist-images">

                <img
                    src="${image1}"
                    alt=""
                    aria-hidden="true"
                >

                <img
                    src="${image2}"
                    alt=""
                    aria-hidden="true"
                >

                <img
                    src="${image3}"
                    alt="${title}"
                >


                <span class="playlist-info">

                    <i class="${formatIcon}"></i>

                    <span>
                        ${formatText}
                    </span>

                </span>

                ${
                    description
                        ? `
                            <span class="playlist-hover-text">
                                ${description}
                            </span>
                        `
                        : ""
                }

            </div>

        </div>


        <!-- <h3>
            ${title}
        </h3> -->
<div class="card-title-row">

    <h3>
        ${title}
    </h3>

</div>

    `;


    /* =========================================================
       MOBILE + TABLET CLICK
    ========================================================= */

    card.addEventListener("click", (event) => {
        if (
            event.target.closest(".card-actions")
        ) {
            return;
        }
        /* فقط موبایل و تبلت */
        if (window.innerWidth > 1000) {
            return;
        }


        /* اگر اطلاعات هنوز نمایش داده نشده */
        if (!card.classList.contains("show-info")) {

            event.preventDefault();


            /* بستن اطلاعات کارت‌های دیگر */
            document
                .querySelectorAll(".playlist-card.show-info")
                .forEach(otherCard => {

                    otherCard.classList.remove("show-info");

                });


            /* نمایش اطلاعات این کارت */
            card.classList.add("show-info");

        }

        /*
        اگر show-info از قبل وجود داشته باشد،
        preventDefault اجرا نمی‌شود
        و لینک باز می‌شود.
        */

    });

const titleRow =
    card.querySelector(".card-title-row");

titleRow.appendChild(
    createCardActions(id, "playlist")
);
    return card;

}


/* =========================================================
   SPEAKER CARD
========================================================= */

function createSpeakerCard(item) {

    const id = item.getAttribute("id");

    const name =
        getXMLValue(item, "title");

    const image =
        getXMLValue(item, "image");


    const card =
        document.createElement("a");


    card.href =
        `speaker.html?id=${id}`;


    card.className =
        "speaker-card";


    card.innerHTML = `

        <div class="speaker-image">

            <img
                src="${image}"
                alt="${name}"
            >

        </div>


        <h3>
            ${name}
        </h3>

    `;


    return card;

}


/* =========================================================
   TOPIC CARD
========================================================= */

function createTopicCard(item) {

    const id =
        item.getAttribute("id");

    const title =
        getXMLValue(item, "title");


    const card =
        document.createElement("a");


    /*
       با کلیک روی کارت دسته‌بندی
       به صفحه نتایج می‌رویم
       و اسم خود کارت را همراه لینک می‌فرستیم
    */

    card.href =
        `results.html?topic=${encodeURIComponent(title)}`;


    card.className =
        "topic-card";


    card.innerHTML = `

        <h3>
            ${title}
        </h3>

    `;


    return card;

}

/* =========================================================
   IMAGE CARD
========================================================= */

function createImageCard(item) {

    const id =
        item.getAttribute("id");


    const title =
        getXMLValue(item, "title");


    const image =
        getXMLValue(item, "image");


    /* =====================================================
       CREATE CARD
    ===================================================== */

    const card =
        document.createElement("a");


    card.href =
        `image.html?id=${encodeURIComponent(id)}`;


    card.className =
        "image-card";


    card.innerHTML = `

        <div class="image-card-image">

            <div class="image-card-photo">

                <img
                    src="${image}"
                    alt="${title}"
                    loading="lazy"
                >

            </div>

        </div>


        <div class="image-card-body">

            <div class="card-title-row">

                <h3>
                    ${title}
                </h3>

            </div>

        </div>

    `;


    /* =====================================================
       CARD ACTIONS
    ===================================================== */

    const titleRow =
        card.querySelector(
            ".card-title-row"
        );


    titleRow.appendChild(
        createCardActions(
            id,
            "image"
        )
    );


    return card;

}

/* =========================================================
   BOOK CARD
========================================================= */

function createBookCard(item) {

    const id =
        item.getAttribute("id");


    const title =
        getXMLValue(item, "title");


    const author =
        getXMLValue(item, "author");


    const image =
        getXMLValue(item, "image");


    /* =====================================================
       CREATE CARD
    ===================================================== */

    const card =
        document.createElement("a");


    card.href =
        `book.html?id=${encodeURIComponent(id)}`;


    card.className =
        "book-card";


card.innerHTML = `

    <div class="book-card__cover">

        <div class="book">

            <div class="book__back"></div>

            <div class="book__pages">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div class="book__front">

                <div class="book__front-cover">

                    <img
                        src="${image}"
                        alt="${title}"
                        loading="lazy"
                    >

                </div>

                <div class="book__front-inside"></div>

            </div>

            <div class="book__spine"></div>

        </div>

    </div>


<div class="book-card__info">

    <div class="card-title-row">

        <h3 class="book-card__title">
            ${title}
        </h3>

    </div>

    <p class="book-card__author">
        ${author}
    </p>

</div>

`;
const titleRow =
    card.querySelector(".card-title-row");

titleRow.appendChild(
    createCardActions(id, "book")
);


/* =========================================================
   BOOK COLOR
========================================================= */

const book =
    card.querySelector(".book");

if (book) {

    applyBookColor(book);

}


return card;

}
/* =========================================================
   BOOK COLOR
========================================================= */

function applyBookColor(book) {

    const image =
        book.querySelector(
            ".book__front-cover img"
        );


    if (!image) return;


    if (image.complete) {

        setBookColor(
            book,
            image
        );

    } else {

        image.addEventListener(
            "load",
            () => {

                setBookColor(
                    book,
                    image
                );

            },
            { once: true }
        );

    }

}


/* =========================================================
   EXTRACT COLOR
========================================================= */

function setBookColor(book, image) {

    try {

        const canvas =
            document.createElement("canvas");


        canvas.width = 8;
        canvas.height = 8;


        const context =
            canvas.getContext(
                "2d",
                {
                    willReadFrequently: true
                }
            );


        context.drawImage(
            image,
            0,
            0,
            8,
            8
        );


        const pixels =
            context.getImageData(
                0,
                0,
                8,
                8
            ).data;


        let red = 0;
        let green = 0;
        let blue = 0;

        let count = 0;


        for (
            let i = 0;
            i < pixels.length;
            i += 4
        ) {

            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const a = pixels[i + 3];


            if (a < 150) {
                continue;
            }


            if (
                r > 235 &&
                g > 235 &&
                b > 235
            ) {

                continue;

            }


            red += r;
            green += g;
            blue += b;

            count++;

        }


        if (!count) {

            setDefaultBookColor(book);

            return;

        }


        red =
            Math.round(
                red / count
            );

        green =
            Math.round(
                green / count
            );

        blue =
            Math.round(
                blue / count
            );


        const color =
            rgbToHex(
                red,
                green,
                blue
            );


        book.style.setProperty(
            "--book-color",
            color
        );


        book.style.setProperty(
            "--book-color-dark",
            darkenColor(
                red,
                green,
                blue,
                0.72
            )
        );

    } catch (error) {

        console.warn(
            "Could not extract book color:",
            error
        );


        setDefaultBookColor(book);

    }

}


/* =========================================================
   DEFAULT
========================================================= */

function setDefaultBookColor(book) {

    book.style.setProperty(
        "--book-color",
        "#765638"
    );


    book.style.setProperty(
        "--book-color-dark",
        "#503a26"
    );

}


/* =========================================================
   RGB → HEX
========================================================= */

function rgbToHex(r, g, b) {

    return "#" +
        [r, g, b]
            .map(value =>
                value
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("");

}


function darkenColor(
    r,
    g,
    b,
    amount
) {

    return rgbToHex(
        Math.round(r * amount),
        Math.round(g * amount),
        Math.round(b * amount)
    );

}
/* =========================================================
   CARD ACTIONS
   منوی سه نقطه کارت
========================================================= */

function createCardActions(id, type = "content") {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "card-actions";


wrapper.innerHTML = `

    <button
        class="card-actions-button"
        type="button"
        aria-label="گزینه‌ها"
    >
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>

    <div class="card-actions-menu">
${
    type === "image"
        ? `
            <button
                class="image-card-share-button"
                data-image-id="${id}"
                type="button"
            >
                <i class="fa-solid fa-share-nodes"></i>
                <span>اشتراک‌گذاری</span>
            </button>

            <button
                class="image-card-save-button"
                data-image-id="${id}"
                type="button"
            >
                <i class="fa-regular fa-bookmark"></i>
                <span>ذخیره</span>
            </button>

            <button
                class="image-card-download-button"
                data-image-id="${id}"
                type="button"
            >
                <i class="fa-solid fa-download"></i>
                <span>دانلود</span>
            </button>
        `
    : type === "playlist"
        ? `
            <button
                class="playlist-card-share-button"
                data-playlist-id="${id}"
                type="button"
            >
                <i class="fa-solid fa-share-nodes"></i>
                <span>اشتراک‌گذاری</span>
            </button>

            <button
                class="playlist-card-save-button"
                data-playlist-id="${id}"
                type="button"
            >
                <i class="fa-regular fa-bookmark"></i>
                <span>ذخیره</span>
            </button>
        `

    : type === "book"
        ? `
            <button
                class="book-card-share-button"
                data-book-id="${id}"
                type="button"
            >
                <i class="fa-solid fa-share-nodes"></i>
                <span>اشتراک‌گذاری</span>
            </button>

            <button
                class="book-card-save-button"
                data-book-id="${id}"
                type="button"
            >
                <i class="fa-regular fa-bookmark"></i>
                <span>ذخیره</span>
            </button>

            <button
                class="book-card-download-button"
                data-book-id="${id}"
                type="button"
            >
                <i class="fa-solid fa-download"></i>
                <span>دانلود</span>
            </button>
        `

            : `
                <button
                    class="content-actions-button share-button"
                    data-content-id="${id}"
                    type="button"
                >
                    <i class="fa-solid fa-share-nodes"></i>
                    <span>اشتراک‌گذاری</span>
                </button>

                <button
                    class="content-actions-button save-action"
                    data-content-id="${id}"
                    type="button"
                >
                    <i class="fa-regular fa-bookmark"></i>
                    <span>ذخیره</span>
                </button>

                <button
                    class="content-actions-button download-button"
                    data-content-id="${id}"
                    type="button"
                >
                    <i class="fa-solid fa-download"></i>
                    <span>دانلود</span>
                </button>
            `
}

        </div>

    `;


    /* =========================================================
       THREE DOT BUTTON
    ========================================================= */

    const button =
        wrapper.querySelector(
            ".card-actions-button"
        );


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            document
                .querySelectorAll(
                    ".card-actions.show"
                )
                .forEach(other => {

                    if (other !== wrapper) {

                        other.classList.remove(
                            "show"
                        );

                    }

                });


            wrapper.classList.toggle(
                "show"
            );
const saveButton =
    wrapper.querySelector(
".save-action, .playlist-card-save-button, .book-card-save-button, .image-card-save-button"    );

if (saveButton) {

const storageKey =
    type === "playlist"
        ? "mesbah_saved_playlists"
        : type === "book"
            ? "mesbah_saved_books"
            : "mesbah_saved_contents";

    const savedItems =
        JSON.parse(
            localStorage.getItem(storageKey) || "[]"
        );


    const saved =
        savedItems.includes(id);


    const icon =
        saveButton.querySelector("i");


    if (saved) {

        icon.classList.remove(
            "fa-regular"
        );

        icon.classList.add(
            "fa-solid"
        );

    } else {

        icon.classList.remove(
            "fa-solid"
        );

        icon.classList.add(
            "fa-regular"
        );

    }

}
        }
    );

    /* =========================================================
       PREVENT CARD LINK
       جلوگیری از رفتن به صفحه کارت هنگام کلیک روی اکشن‌ها
    ========================================================= */

    wrapper
        .querySelectorAll(
            ".card-actions-menu button"
        )
        .forEach(actionButton => {

            actionButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                }
            );

        });
return wrapper;
}


/* =========================================================
   CLOSE CARD MENUS
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".card-actions"
            )
        ) {

            document
                .querySelectorAll(
                    ".card-actions.show"
                )
                .forEach(action => {

                    action.classList.remove(
                        "show"
                    );

                });

        }

    }
);

/* =========================================================
   PLAYLIST CARD ACTIONS
========================================================= */

document.addEventListener(
    "click",
    event => {

        /* =====================================================
           SHARE
        ===================================================== */

        const shareButton =
            event.target.closest(
                ".playlist-card-share-button"
            );


        if (shareButton) {

            event.preventDefault();
            event.stopPropagation();


            const playlistId =
                shareButton.dataset.playlistId;


            if (!playlistId) return;


            const card =
                shareButton.closest(
                    ".playlist-card"
                );


            const title =
                card
                    ?.querySelector(
                        ".card-title-row h3"
                    )
                    ?.textContent
                    .trim()
                || "مجموعه";


            const url =
                `${window.location.origin}` +
                `${window.location.pathname
                    .replace(
                        /[^/]+$/,
                        "playlist.html"
                    )}` +
                `?id=${encodeURIComponent(playlistId)}`;


            if (navigator.share) {

                navigator.share({

                    title: title,

                    text:
                        `${title}\n\nاز سامانه مصباح\n${url}`,

                    url: url

                }).catch(error => {

                    if (
                        error.name !==
                        "AbortError"
                    ) {

                        console.error(
                            "PLAYLIST CARD SHARE ERROR:",
                            error
                        );

                    }

                });

            } else {

                navigator.clipboard
                    .writeText(url)
                    .then(() => {

                        // alert(
                        //     "لینک مجموعه کپی شد."
                        // );

                    });

            }


            return;

        }


        /* =====================================================
           SAVE
        ===================================================== */

        const saveButton =
            event.target.closest(
                ".playlist-card-save-button"
            );


        if (saveButton) {

            event.preventDefault();
            event.stopPropagation();


            const playlistId =
                saveButton.dataset.playlistId;


            if (!playlistId) return;


            let saved = [];

            try {

                saved =
                    JSON.parse(
                        localStorage.getItem(
                            "mesbah_saved_playlists"
                        )
                    ) || [];

            } catch {

                saved = [];

            }


            const id =
                String(playlistId);


            const icon =
                saveButton.querySelector("i");


            if (
                saved.includes(id)
            ) {

                saved =
                    saved.filter(
                        item =>
                            String(item) !== id
                    );


                saveButton.classList.remove(
                    "saved"
                );


                if (icon) {

                    icon.className =
                        "fa-regular fa-bookmark";

                }

            } else {

                saved.push(id);


                saveButton.classList.add(
                    "saved"
                );


                if (icon) {

                    icon.className =
                        "fa-solid fa-bookmark";

                }

            }


            localStorage.setItem(
                "mesbah_saved_playlists",
                JSON.stringify(saved)
            );


            return;

        }

    }
);


/* =========================================================
   BOOK CARD ACTIONS
========================================================= */

document.addEventListener(
    "click",
    async event => {

        const shareButton =
            event.target.closest(
                ".book-card-share-button"
            );

        const saveButton =
            event.target.closest(
                ".book-card-save-button"
            );

        const downloadButton =
            event.target.closest(
                ".book-card-download-button"
            );

        const actionButton =
            shareButton ||
            saveButton ||
            downloadButton;

        if (!actionButton) return;

        event.preventDefault();
        event.stopPropagation();

        const bookId =
            actionButton.dataset.bookId;

        if (!bookId) return;


        /* =====================================================
           SAVE / UNSAVE
        ===================================================== */

        if (saveButton) {

            let saved = [];

            try {

                saved =
                    JSON.parse(
                        localStorage.getItem(
                            "mesbah_saved_books"
                        )
                    ) || [];

                if (!Array.isArray(saved)) {
                    saved = [];
                }

            } catch {

                saved = [];

            }

            const id = String(bookId);

            const isSaved =
                saved.some(
                    item => String(item) === id
                );

            const icon =
                saveButton.querySelector("i");

            if (isSaved) {

                saved =
                    saved.filter(
                        item => String(item) !== id
                    );

                saveButton.classList.remove("saved");

                if (icon) {
                    icon.className =
                        "fa-regular fa-bookmark";
                }

            } else {

                saved.push(id);

                saveButton.classList.add("saved");

                if (icon) {
                    icon.className =
                        "fa-solid fa-bookmark";
                }

            }

            localStorage.setItem(
                "mesbah_saved_books",
                JSON.stringify(saved)
            );

            return;
        }


        /* =====================================================
           LOAD BOOK DATA
        ===================================================== */

        try {

            const response =
                await fetch("data/books.xml");

            if (!response.ok) {
                throw new Error(
                    "دریافت اطلاعات کتاب ناموفق بود."
                );
            }

            const text =
                await response.text();

            const xml =
                new DOMParser().parseFromString(
                    text,
                    "application/xml"
                );

            const book =
                Array.from(
                    xml.querySelectorAll("book")
                ).find(
                    item =>
                        item.getAttribute("id") ===
                        String(bookId)
                );

            if (!book) {
                throw new Error("کتاب پیدا نشد.");
            }

            const getValue = tag =>
                book.querySelector(tag)
                    ?.textContent.trim() || "";

            const title =
                getValue("title") || "کتاب";

            const author =
                getValue("author");

            const publisher =
                getValue("publisher");

            const year =
                getValue("publishYear");

            const pdf =
                getValue("pdf");

            const pageUrl = new URL(
                "book.html",
                window.location.href
            );

            pageUrl.searchParams.set(
                "id",
                bookId
            );

            const shareText = [
                title,
                author ? `نویسنده: ${author}` : "",
                publisher ? `ناشر: ${publisher}` : "",
                year ? `سال انتشار: ${year}` : "",
                "از سامانه مصباح",
                pageUrl.href
            ].filter(Boolean).join("\n");


            /* =====================================================
               SHARE BOOK PDF + DETAILS
            ===================================================== */

            if (shareButton) {

                if (!navigator.share) {

                    await navigator.clipboard.writeText(
                        shareText
                    );

                    alert(
                        "اطلاعات کتاب و لینک آن کپی شد. مرورگر از اشتراک‌گذاری مستقیم پشتیبانی نمی‌کند."
                    );

                    return;
                }

                if (pdf && navigator.canShare) {

                    try {

                        const pdfUrl = new URL(
                            pdf,
                            window.location.href
                        ).href;

                        const pdfResponse =
                            await fetch(pdfUrl);

                        if (!pdfResponse.ok) {
                            throw new Error(
                                "دریافت فایل PDF ناموفق بود."
                            );
                        }

                        const blob =
                            await pdfResponse.blob();

                        const fileName =
                            title
                                .replace(
                                    /[<>:"/\\|?*\x00-\x1F]/g,
                                    "-"
                                )
                                .trim() + ".pdf";

                        const file = new File(
                            [blob],
                            fileName,
                            {
                                type: "application/pdf"
                            }
                        );

                        if (
                            navigator.canShare({
                                files: [file]
                            })
                        ) {

                            await navigator.share({
                                title: title,
                                text: shareText,
                                files: [file]
                            });

                            return;
                        }

                    } catch (error) {

                        if (error.name === "AbortError") {
                            return;
                        }

                        console.error(
                            "BOOK CARD PDF SHARE ERROR:",
                            error
                        );

                    }
                }

                await navigator.share({
                    title: title,
                    text: shareText
                });

                return;
            }


            /* =====================================================
               DOWNLOAD PDF WITH BOOK TITLE
            ===================================================== */

            if (downloadButton) {

                if (!pdf) {
                    throw new Error(
                        "فایل PDF برای این کتاب ثبت نشده است."
                    );
                }

                const pdfUrl = new URL(
                    pdf,
                    window.location.href
                ).href;

                const pdfResponse =
                    await fetch(pdfUrl);

                if (!pdfResponse.ok) {
                    throw new Error(
                        "دریافت فایل PDF ناموفق بود."
                    );
                }

                const blob =
                    await pdfResponse.blob();

                const fileName =
                    title
                        .replace(
                            /[<>:"/\\|?*\x00-\x1F]/g,
                            "-"
                        )
                        .trim() + ".pdf";

                const blobUrl =
                    URL.createObjectURL(blob);

                const link =
                    document.createElement("a");

                link.href = blobUrl;
                link.download = fileName;

                document.body.appendChild(link);
                link.click();
                link.remove();

                setTimeout(
                    () => URL.revokeObjectURL(blobUrl),
                    1000
                );

                return;
            }

        } catch (error) {

            if (error.name === "AbortError") return;

            console.error(
                "BOOK CARD ACTION ERROR:",
                error
            );

            alert(
                "اجرای عملیات کتاب ناموفق بود. فایل PDF و مسیر آن را بررسی کن."
            );

        }

    }
);

/* =========================================================
   IMAGE CARD ACTIONS
========================================================= */

document.addEventListener("click", async event => {

    const shareButton = event.target.closest(
        ".image-card-share-button"
    );

    const saveButton = event.target.closest(
        ".image-card-save-button"
    );

    const downloadButton = event.target.closest(
        ".image-card-download-button"
    );

    const actionButton =
        shareButton || saveButton || downloadButton;

    if (!actionButton) return;

    event.preventDefault();
    event.stopPropagation();

    const imageId = actionButton.dataset.imageId;

    if (!imageId) return;

    /* دریافت اطلاعات تصویر از XML */

    async function getImageData() {

        const response = await fetch("data/images.xml");

        if (!response.ok) {
            throw new Error("دریافت اطلاعات تصاویر ناموفق بود.");
        }

        const xmlText = await response.text();

        const xml = new DOMParser().parseFromString(
            xmlText,
            "application/xml"
        );

        const items = xml.querySelectorAll("image");

        for (const item of items) {

            if (item.getAttribute("id") === imageId) {

                return {
                    id: imageId,
                    title: getXMLValue(item, "title"),
                    image: getXMLValue(item, "image"),
                    type: "image"
                };

            }

        }

        throw new Error("تصویر موردنظر پیدا نشد.");
    }

    try {

        const imageData = await getImageData();

        /* -------------------------
           SHARE
        ------------------------- */

        if (shareButton) {

            const url = new URL(
                "image.html",
                window.location.href
            );

            url.searchParams.set("id", imageId);

            if (navigator.share) {

                try {

                    const response = await fetch(imageData.image);

                    if (!response.ok) {
                        throw new Error("دریافت فایل تصویر ناموفق بود.");
                    }

                    const blob = await response.blob();

                    const extension =
                        blob.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";

                    const file = new File(
                        [blob],
                        `${createImageFileName(imageData.title).replace(/\.[^.]+$/, "")}.${extension}`,
                        {
                            type: blob.type || "image/jpeg"
                        }
                    );

                    const shareData = {
                        title: imageData.title,
                        text: `از سامانه مصباح\n${url.href}`,
                        files: [file]
                    };

                    if (navigator.canShare && navigator.canShare({ files: [file] })) {

                        await navigator.share(shareData);

                    } else {

                        await navigator.share({
                            title: imageData.title,
                            text: `${imageData.title}\nاز سامانه مصباح\n${url.href}`,
                            url: url.href
                        });

                    }

                } catch (error) {

                    if (error.name !== "AbortError") {
                        console.error("IMAGE SHARE ERROR:", error);
                        alert("اشتراک‌گذاری تصویر انجام نشد.");
                    }

                }

            } else {

                await navigator.clipboard.writeText(url.href);
                alert("لینک تصویر کپی شد. مرورگر از اشتراک‌گذاری مستقیم عکس پشتیبانی نمی‌کند.");

            }

            return;
        }

        /* -------------------------
           SAVE / UNSAVE
        ------------------------- */

        if (saveButton) {

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

            const id = String(imageId);

            const isSaved = savedItems.some(
                item => String(item) === id
            );

            const icon = saveButton.querySelector("i");

            if (isSaved) {

                savedItems = savedItems.filter(
                    item => String(item) !== id
                );

                saveButton.classList.remove("saved");

                if (icon) {
                    icon.className = "fa-regular fa-bookmark";
                }

            } else {

                savedItems.push(id);

                saveButton.classList.add("saved");

                if (icon) {
                    icon.className = "fa-solid fa-bookmark";
                }

            }

            localStorage.setItem(
                "mesbah_saved_images",
                JSON.stringify(savedItems)
            );

            return;
        }


        /* -------------------------
           DOWNLOAD
        ------------------------- */

        if (downloadButton) {

            const link = document.createElement("a");

            link.href = pdf;

            const fileName =
                (book.querySelector("title")
                    ?.textContent.trim() || "کتاب")
                    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
                    .trim();

            link.download = `${fileName}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

        }

    } catch (error) {

        if (error.name !== "AbortError") {

            console.error(
                "خطا در اکشن کارت تصویر:",
                error
            );

            alert("اجرای عملیات تصویر ناموفق بود.");

        }

    }

});


/* =========================================================
   IMAGE FILE NAME
========================================================= */

function createImageFileName(title) {

    if (!title) {
        return "image.jpg";
    }

    return title
        .replace(/[\\/:*?"<>|]/g, "")
        .trim() + ".jpg";

}