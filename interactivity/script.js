const dropdown = document.getElementById("dropdown");
const dropdownResult = document.getElementById("dropdownResult");
dropdown.addEventListener("change", () => {
    const value = dropdown.value;

    if (value === "") {
        dropdownResult.textContent = "";
    } else {
        dropdownResult.textContent = "You selected: " + value;
    }
});

const modalOverlay = document.getElementById("modalOverlay");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

openModalBtn.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
});


modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
    }
});


const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess = document.getElementById("formSuccess");

function isValidEmail(email) {
    
    return /\S+@\S+\.\S+/.test(email);
}

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    formSuccess.textContent = "";

  
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Name is required";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

   
    if (emailInput.value.trim() === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = "Enter a valid email";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    
    if (messageInput.value.trim() === "") {
        messageError.textContent = "Message is required";
        isValid = false;
    } else {
        messageError.textContent = "";
    }

    if (isValid) {
        formSuccess.textContent = "Form submitted successfully ✔";
        
    }
});

