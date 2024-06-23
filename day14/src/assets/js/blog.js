function submitBlog(event) {
  event.preventDefault();

  // Ambil nilai dari form
  let title = document.getElementById("inputTitle").value;
  let startdate = document.getElementById("startDate").value;
  let enddate = document.getElementById("endDate").value;
  let content = document.getElementById("inputContent").value;
  let nodeJS = document.getElementById("nodeJS").checked;
  let reactJS = document.getElementById("reactJS").checked;
  let nextJS = document.getElementById("nextJS").checked;
  let typeScript = document.getElementById("typeScript").checked;
  let image = document.getElementById("inputImage").files[0];

  // Validasi input
  if (!validateForm(title, startdate, enddate, content, nodeJS, reactJS, nextJS, typeScript, image)) {
    return;
  }

  // Buat URL gambar dari file yang diunggah
  let imageURL = URL.createObjectURL(image);

  // Tambahkan data blog baru ke dalam array dataBlog
  dataBlog.push({
    title: title,
    startdate: startdate,
    enddate: enddate,
    content: content,
    image: imageURL,
    technologies: {
      nodeJS: nodeJS,
      reactJS: reactJS,
      nextJS: nextJS,
      typeScript: typeScript,
    },
    duration: calculateDuration(startdate, enddate),
  });

  console.log(dataBlog);

  // Render ulang tampilan blog
  renderBlog(dataBlog);

  // Bersihkan form setelah disubmit
  clearForm();
}

// Fungsi untuk validasi form
function validateForm(title, startdate, enddate, content, nodeJS, reactJS, nextJS, typeScript, image) {
  if (title === "") {
    alert("Harap isi judul");
    return false;
  } else if (content === "") {
    alert("Harap isi konten");
    return false;
  } else if (!nodeJS && !reactJS && !nextJS && !typeScript) {
    alert("Harus memilih minimal satu teknologi!");
    return false;
  } else if (!image) {
    alert("Harap unggah gambar");
    return false;
  } else if (new Date(enddate) < new Date(startdate)) {
    alert("Masukkan rentang tanggal yang benar");
    return false;
  }
  return true;
}

// Fungsi untuk menghitung durasi proyek
function calculateDuration(startdate, enddate) {
  let startDate = new Date(startdate);
  let endDate = new Date(enddate);
  let duration = endDate - startDate;
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));
  return `${days} hari`;
}

// Fungsi untuk membersihkan form
function clearForm() {
  document.getElementById("inputTitle").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("inputContent").value = "";
  document.getElementById("nodeJS").checked = false;
  document.getElementById("reactJS").checked = false;
  document.getElementById("nextJS").checked = false;
  document.getElementById("typeScript").checked = false;
  document.getElementById("inputImage").value = "";
}

// Fungsi untuk merender data blog menggunakan Handlebars
function renderBlog(data) {
  const source = document.getElementById('blog-template').innerHTML;
  const template = Handlebars.compile(source);
  const html = template({ data });

  const contentContainer = document.getElementById('content');
  contentContainer.innerHTML = html;
}

// Fungsi untuk menghapus proyek dari dataBlog
function deleteProject(index) {
  dataBlog.splice(index, 1);
  renderBlog(dataBlog);
}
