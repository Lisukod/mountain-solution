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

function showError() {
	document.getElementById('loginError').classList.remove('hide');
	document.getElementById("formContainer").addEventListener('click', function(){
		document.getElementById('loginError').classList.add('hide');
	}, { once: true })
}

function showSuccess() {
	document.getElementById('loginSuccess').classList.remove('hide');
	document.getElementById("formContainer").addEventListener('click', function(){
		document.getElementById('loginSuccess').classList.add('hide');
	}, { once: true })
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

		if (responseData.status !== "ok") {
			showError()
		} else {
			showSuccess()
		}
		console.log({ responseData });
	} catch (error) {
		console.error(error);
	}
}

const popupForm = document.getElementById('login-form');
popupForm.addEventListener("submit", handleFormSubmit);
