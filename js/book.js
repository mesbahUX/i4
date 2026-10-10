/* =========================================================
   BOOK PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadBook();

});


/* =========================================================
   LOAD BOOK
========================================================= */

async function loadBook() {

    const params =
        new URLSearchParams(window.location.search);

    const bookId =
        params.get("id");

    if (!bookId) return;


    try {

        const response =
            await fetch("data/books.xml");

        const text =
            await response.text();


        const parser =
            new DOMParser();

        const xml =
            parser.parseFromString(
                text,
                "text/xml"
            );


        /* =================================================
           FIND BOOK
        ================================================= */

        const book =
            xml.querySelector(
                `book[id="${bookId}"]`
            );

        if (!book) return;


        /* =================================================
           DATA
        ================================================= */

        const title =
            book.querySelector("title")
                ?.textContent.trim() || "";

        const author =
            book.querySelector("author")
                ?.textContent.trim() || "";

        const publisher =
            book.querySelector("publisher")
                ?.textContent.trim() || "";

        const year =
            book.querySelector("publishYear")
                ?.textContent.trim() || "";

        const image =
            book.querySelector("image")
                ?.textContent.trim() || "";

        const pdf =
            book.querySelector("pdf")
                ?.textContent.trim() || "";


        /* =================================================
           TITLE
        ================================================= */

        const titleElement =
            document.getElementById("book-title");

        if (titleElement) {

            titleElement.textContent =
                title;

        }


        /* =================================================
           AUTHOR
        ================================================= */

        const authorElement =
            document.getElementById("book-author");

        if (authorElement) {

            authorElement.textContent =
                author;

        }

        /* =================================================
        PUBLISHER
        ================================================= */

        const publisherElement =
            document.getElementById("book-publisher");

        if (publisherElement) {

            publisherElement.textContent =
                publisher;

        }


        /* =================================================
        PUBLISH YEAR
        ================================================= */

        const yearElement =
            document.getElementById("book-year");

        if (yearElement) {

            yearElement.textContent =
                year;

        }
        /* =================================================
           COVER
        ================================================= */

        const cover =
            document.getElementById("book-cover");

        if (cover) {

            cover.src =
                image;

            cover.alt =
                title;

        }

        /* =================================================
        PDF
        ================================================= */

        const download =
            document.getElementById("book-download");

        if (download) {

            download.href = pdf;

            const fileName =
                (title || "کتاب")
                    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
                    .trim();

            download.setAttribute(
                "download",
                `${fileName}.pdf`
            );

        }


        /* =================================================
           PAGE TITLE
        ================================================= */

        document.title =
            title || "کتاب";


    } catch (error) {

        console.error(
            "خطا در بارگذاری کتاب:",
            error
        );

    }

}

/* =========================================================
   BOOK SAVE
========================================================= */

const BookSaveStorage = {

    key: "mesbah_saved_books",

    get() {

        try {

            const data =
                localStorage.getItem(this.key);

            if (!data) {
                return [];
            }

            const ids =
                JSON.parse(data);

            return Array.isArray(ids)
                ? ids.map(String)
                : [];

        }

        catch (error) {

            console.error(
                "BOOK SAVE GET ERROR:",
                error
            );

            return [];

        }

    },


    set(ids) {

        localStorage.setItem(
            this.key,
            JSON.stringify(ids)
        );

    },


    has(id) {

        return this
            .get()
            .includes(String(id));

    },


    toggle(id) {

        id = String(id);

        const ids = this.get();


        if (ids.includes(id)) {

            this.set(
                ids.filter(
                    item => item !== id
                )
            );

            return false;

        }


        ids.push(id);

        this.set(ids);

        return true;

    }

};


/* =========================================================
   UPDATE BOOK SAVE BUTTON
========================================================= */

function updateBookSaveButton(
    button,
    saved
) {

    const icon =
        button.querySelector("i");

    if (!icon) return;


    if (saved) {

        button.classList.add("saved");

        icon.classList.remove(
            "fa-regular"
        );

        icon.classList.add(
            "fa-solid"
        );

        button.title =
            "ذخیره شد";

    }

    else {

        button.classList.remove("saved");

        icon.classList.remove(
            "fa-solid"
        );

        icon.classList.add(
            "fa-regular"
        );

        button.title =
            "ذخیره";

    }

}


/* =========================================================
   BOOK SHARE
========================================================= */

// async function handleBookShare() {

//     const bookId =
//         new URLSearchParams(
//             window.location.search
//         ).get("id");

//     if (!bookId) return;


//     const title =
//         document
//             .getElementById("book-title")
//             ?.textContent
//             .trim() || "کتاب";


//     const pageUrl =
//         window.location.href;


//     if (navigator.share) {

//         try {

//             await navigator.share({

//                 title: title,

//                 text:
//                     `«${title}»\n\nاز سامانه مصباح`,

//                 url: pageUrl

//             });

//         }

//         catch (error) {

//             if (
//                 error.name !== "AbortError"
//             ) {

//                 console.error(
//                     "BOOK SHARE ERROR:",
//                     error
//                 );

//             }

//         }

//         return;

//     }


//     /* =========================
//        BROWSER WITHOUT SHARE
//     ========================= */

//     try {

//         await navigator.clipboard.writeText(
//             pageUrl
//         );

//         alert(
//             "لینک کتاب کپی شد."
//         );

//     }

//     catch (error) {

//         console.error(
//             "BOOK SHARE ERROR:",
//             error
//         );

//     }

// }

async function handleBookShare() {

    const title =
        document.getElementById("book-title")
            ?.textContent.trim() || "";

    const author =
        document.getElementById("book-author")
            ?.textContent.trim() || "";

    const publisher =
        document.getElementById("book-publisher")
            ?.textContent.trim() || "";

    const year =
        document.getElementById("book-year")
            ?.textContent.trim() || "";

    const pdfPath =
        document.getElementById("book-download")
            ?.href || "";

    const url = window.location.href;

    const shareText = [
        title,
        author ? `نویسنده: ${author}` : "",
        publisher ? `ناشر: ${publisher}` : "",
        year ? `سال انتشار: ${year}` : "",
        "از سامانه مصباح",
        url
    ].filter(Boolean).join("\n");

    try {

        // دریافت و اشتراک‌گذاری خود فایل PDF
        if (pdfPath && navigator.share && navigator.canShare) {

            const response = await fetch(pdfPath);

            if (!response.ok) {
                throw new Error("دریافت فایل PDF ناموفق بود.");
            }

            const blob = await response.blob();

            const file = new File(
                [blob],
                `${title || "book"}.pdf`,
                { type: "application/pdf" }
            );

            if (navigator.canShare({ files: [file] })) {

                await navigator.share({
                    title: title || "کتاب از سامانه مصباح",
                    text: shareText,
                    files: [file]
                });

                return;
            }
        }

        // اگر اشتراک‌گذاری فایل پشتیبانی نشد
        if (navigator.share) {

            await navigator.share({
                title: title || "کتاب از سامانه مصباح",
                text: shareText
            });

        } else {

            await navigator.clipboard.writeText(shareText);

            alert("اطلاعات کتاب و لینک آن کپی شد.");

        }

    } catch (error) {

        if (error.name === "AbortError") return;

        console.error(
            "خطا در اشتراک‌گذاری کتاب:",
            error
        );

        alert("اشتراک‌گذاری انجام نشد.");

    }

}

/* =========================================================
   BOOK ACTIONS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const saveButton =
            document.getElementById(
                "book-save"
            );

        const shareButton =
            document.getElementById(
                "book-share"
            );


        const bookId =
            new URLSearchParams(
                window.location.search
            ).get("id");


        /* =========================
           SAVE STATE
        ========================= */

        if (
            saveButton &&
            bookId
        ) {

            updateBookSaveButton(
                saveButton,
                BookSaveStorage.has(
                    bookId
                )
            );

        }


        /* =========================
           SAVE
        ========================= */

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                () => {

                    if (!bookId) return;


                    const saved =
                        BookSaveStorage.toggle(
                            bookId
                        );


                    updateBookSaveButton(
                        saveButton,
                        saved
                    );

                }
            );

        }


        /* =========================
           SHARE
        ========================= */

        if (shareButton) {

            shareButton.addEventListener(
                "click",
                handleBookShare
            );

        }

    }
);