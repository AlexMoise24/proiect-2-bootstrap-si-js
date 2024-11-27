// Funcția care va salva datele utilizatorului
function saveData(event) {
  event.preventDefault(); // Previne trimiterea formularului (reîncărcarea paginii)

  // Colectăm valorile din formular
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var telefon = document.getElementById("telefon").value;
  var mesaj = document.getElementById("mesaj").value;
  var email = document.getElementById("email").value;

  if (!isValidName(lastName)) {
    Swal.fire({
      title: "Eroare",
      text: "Numele trebuie să înceapă cu literă mare.",
      icon: "error",
    });
    return;
  }

  if (!isValidCNP(telefon)) {
    Swal.fire({
      title: "Eroare",
      text: "Telefonul-ul trebuie să conțină exact 10 caractere numerice.",
      icon: "error",
    });
    return;
  }

  if (!isValidEmail(email)) {
    Swal.fire({
      title: "Eroare",
      text: "Email-ul trebuie să fie valid și să conțină @gmail sau @yahoo.",
      icon: "error",
    });
    return;
  }

  // Creăm un obiect cu datele introduse
  var userData = {
    firstName: firstName,
    lastName: lastName,
    telefon: telefon,
    mesaj: mesaj,
    email: email,
  };

  console.log(userData);

  // cream un array pt datele stocate,pt momentul in care in locat storage nu avem nimic cu acesta cheie de users
  storedData = [];

  // luam lista din local storage
  usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));

  // verificam daca exista ce vrem sa luam din local storage
  if (usersFromLocalStorage === null) {
    storedData.push(userData);
    localStorage.setItem("users", JSON.stringify(storedData));
    // daca exista un array deja in local storage, doar adaugam noul obiect din formular
  } else {
    usersFromLocalStorage.push(userData);
    console.log(usersFromLocalStorage);
    localStorage.setItem("users", JSON.stringify(usersFromLocalStorage));
  }
  // preluam datele din formular si resetam formularul
  document.getElementById("registrationForm").reset();
  // Afișăm un mesaj de confirmare
  Swal.fire({
    title: "Felicitari!",
    text: "Mesajul a fost trimis!",
    icon: "success",
  });
}

// Validare nume
function isValidName(firstName) {
  if (firstName.charAt(0) !== firstName.charAt(0).toUpperCase()) {
    return false;
  } else {
    return true;
  }
}

// validare prenume
function isValidName(lastName) {
  if (lastName.charAt(0) !== lastName.charAt(0).toUpperCase()) {
    return false;
  } else {
    return true;
  }
}

// Validare CNP
function isValidCNP(telefon) {
  // Verificăm dacă CNP-ul are exact 13 caractere numerice și prima cifră este 1 sau 2
  if (/^\d{10}$/.test(telefon)) {
    return true;
  } else {
    return alert("Telefonul este incomplet");
  }
}

// Validare email
function isValidEmail(email) {
  return /^(.*@gmail\.com|.*@yahoo\.com)$/.test(email);
}

// Functie pentru a prelua si afisa datele din localStorage
function displayUserData() {
  // Preluăm datele din localStorage
  var usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));

  // Verificăm dacă există date stocate
  if (usersFromLocalStorage !== null && usersFromLocalStorage.length > 0) {
    // Creăm un container pentru a adăuga datele
    var usersList = document.getElementById("usersList");
    usersList.innerHTML = ""; // Curățăm orice conținut existent

    // Parcurgem fiecare utilizator din lista stocată
    usersFromLocalStorage.forEach(function (user) {
      // Creăm un element pentru fiecare utilizator
      var userElement = document.createElement("div");
      userElement.classList.add("user");

      // Adăugăm informațiile utilizatorului
      userElement.innerHTML = `
          <div class="userDiv">
            <p><strong>Nume:</strong> ${user.firstName} ${user.lastName}</p>
            <p><strong>Telefon:</strong> ${user.telefon}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Mesaj:</strong> ${user.mesaj}</p>
            
          </div>
        `;

      // Adăugăm elementul la lista de utilizatori
      usersList.appendChild(userElement);
    });
  } else {
    // Dacă nu există date, afișăm un mesaj
    document.getElementById("usersList").innerHTML =
      "<p>Nu există mesaje de la utilizatori.</p>";
  }
}

// Apelăm funcția la încărcarea paginii
window.onload = function () {
  displayUserData();
};
