function submitData(event) {
  event.preventDefault();

  const inputName = document.getElementById("inputName").value;
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPhone = document.getElementById("inputPhone").value;
  const inputSubject = document.getElementById("inputSubject").value;
  const inputSelect = document.getElementById("inputSelect").value;
  const inputMessage = document.getElementById("inputMessage").value;

  // Perkondisian
  if (inputName === "") {
    alert("in"); // Kondisi 1
    return;
  } else if (inputEmail === "") {
    alert("Email Harus Diisi"); // kondisi 2
    return;
  } else if (inputPhone === "") {
    alert("Phone Number tidak boleh kosong"); // kondisi 3
    return;
  } else if (inputSubject === "") {
    alert("Subject tidak boleh kosong"); // kondisi 4
    return;
  } else if (inputSelect === "") {
    alert("Please select an option"); // kondisi 5
    return;
  } else if (inputMessage === "") {
    alert("Message tidak boleh kosong"); // kondisi 6
    return;
  }

  console.log(
    `Name: ${inputName}\nEmail: ${inputEmail}\nPhone: ${inputPhone}\nSubject: ${inputSubject}\nSelect: ${inputSelect}\nMessage: ${inputMessage}`
  );

  const myemail = "chalidanwarr@gmail.com";
  let a = document.createElement("a");
  a.href = `mailto:${myemail}?subject=${inputSubject}&body=Hello, my name is ${inputName}, my email is ${inputEmail}, my phone number is ${inputPhone}, I selected ${inputSelect}, and my message is: ${inputMessage}`;
  a.click();
}
