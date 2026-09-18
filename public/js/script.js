(() => {
    'use strict';

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {

        form.addEventListener('submit', event => {

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');

        }, false);

    });
})();




const rating = document.querySelector("#rating");
const ratingValue = document.querySelector("#rating-value");

rating.addEventListener("input", () => {
    ratingValue.textContent = rating.value;
});