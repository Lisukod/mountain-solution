document.getElementById("openPopupBtn").addEventListener("click", openLoginPopup);

function openLoginPopup() {
    const element = document.getElementById("loginPopup");
    element.classList.remove('hide');
    element.addEventListener("click", function(event) {
        let isClickInsideForm = document.getElementById("formContainer").contains(event.target);
        if (!isClickInsideForm)
            element.classList.add('hide');
    })
}



//Fetch login API

async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
}

async function handleFormSubmit(event) {
	event.preventDefault();

	const form = event.currentTarget;
	const url = form.action;

	try {
		const formData = new FormData(form);
		const responseData = await postFormDataAsJson({ url, formData });

		console.log({ responseData });
	} catch (error) {
		console.error(error);
	}
}

const popupForm = document.getElementById('login-form');
popupForm.addEventListener("submit", handleFormSubmit);
