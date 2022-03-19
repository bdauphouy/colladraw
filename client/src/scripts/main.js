console.log('hello world')


// Active popup "Share"
const open = document.getElementById("open");
const container = document.getElementById("container");

open.addEventListener("click", () => {
    container.classList.add("active");
});

// Copy url & change button style 
const copyText = document.querySelector(".copy")
const text = document.querySelector(".url")

function copy() {
    navigator.clipboard.writeText(text.value);
    copyText.innerText = "Copied";
    copyText.style.border = "none";
    window.setTimeout(backNormal, 2000);
}

function backNormal() {
    copyText.innerText = "Copy";
    copyText.style.borderStyle = "solid";
    copyText.style.borderWidth = "2px";
    copyText.style.borderColor = "#BBB2F9";
}
copyText.addEventListener('click', copy)


// Get the url of the page
const getUrl = document.location
const idRoom = "id-room:123456789"
document.querySelector(".url").value = getUrl + idRoom;