const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector(".drag-text");
const input = dropArea.querySelector("#input-file");
const buttonForUploadFile = document.querySelector("#uploadFile");
const selectedOption = document.querySelector("#select-quality");
const maxTimeButtonDownload = 600000;
let files;
let fileUploaded;
let resolution;

document.addEventListener("DOMContentLoaded", (event) => {
  if (!fileUploaded) {
    buttonForUploadFile.setAttribute("disabled", "disabled");
  }
});

dropArea.addEventListener("click", (event) => {
  input.click();
});

selectedOption.addEventListener("change", function () {
  resolution = this.options[selectedOption.selectedIndex].value;
  //console.log(resolution);
});

buttonForUploadFile.addEventListener("click", (event) => {
  if (!resolution) {
    alert("Debe seleccionar una resolución para optimizar la imagen");
  }
  if (fileUploaded && resolution) {
    buttonForUploadFile.textContent = "Subiendo...";

    buttonForUploadFile.setAttribute("disabled", "disabled");
    uploadFile(fileUploaded, resolution);
  }
});

input.addEventListener("change", (event) => {
  files = event.target.files[0];
  dropArea.classList.add("active");
  showFiles(files);
  dropArea.classList.remove("active");
});

function showFiles(file) {
  processFile(file);
}

function processFile(file) {
  const docType = file.type;

  const validExtensions = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svgo",
    "image/webp",
    "image/gif",
  ];

  if (validExtensions.includes(docType)) {
    const image = `
            <div class="file-container">
              <div class="status">
              <p>Archivo cargado:</p>
                <span>${file.name}<span/>
              <div/>
            <div/>
            `;
    document.querySelector("#preview").innerHTML = image;

    fileUploaded = file;

    buttonForUploadFile.removeAttribute("disabled");
  } else {
    alert("El archivo ingresado no tiene un formato valido");
  }
}

async function uploadFile(file, resolution) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("resolution", resolution);

  try {
    const response = await fetch("/", {
      method: "POST",
      body: formData,
    });

    const responseText = await response.json();
    //console.log(responseText);

    if (responseText.error === true) {
      throw responseText.message;
    }

    const imgRoute = `${window.location.origin}/${responseText.optimizedImagePath}`;

    const imgName = responseText.optimizedImagePath.split("/")[1];

    const img = `<a class="dowloadFile" id="dowloadFile" href="${imgRoute}" target="_blank" download="${imgName}">Descargar Imagen <img src="/download.png"></a>`,
      backHome = `<a class="back-home" id="back-home" href="/"><img src="/home.png"> volver atrás</a>`;
    document.querySelector("#view").innerHTML = img;
    document.querySelector("#back-home").innerHTML = backHome;
    document.querySelector("#preview").remove();
    document.querySelector("#content-quality").remove();
    document.querySelector(".drop-area").remove();
    document.querySelector("#uploadFile").remove();

    setTimeout(() => {
      document.querySelector("#view").remove();
    }, maxTimeButtonDownload);
  } catch (error) {
    alert(error);
    //console.log(error);
  }
}
