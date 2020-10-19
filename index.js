const form = document.getElementById('form');
const username = document.getElementById('full_name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const stage = document.getElementById('stage');
const store = document.getElementById('store');

function discounts() {
  var ele = document.getElementsByName('hmo');

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) return ele[i].value;
  }
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  checkInputs();

  if (checkInputs()) {
    handleHubspot(this.elements);
    return;
  }
});

function checkInputs() {
  // trim to remove the whitespaces
  const usernameValue = username.value.trim();
  const phoneValue = phone.value.trim();
  const emailValue = email.value.trim();

  let allValid = false;

  if (usernameValue === '') {
    setErrorFor(username, 'Name cannot be blank');
  } else {
    setSuccessFor(username);
  }
  if (phoneValue === '') {
    setErrorFor(phone, 'Phone Number cannot be blank');
  } else {
    setSuccessFor(phone);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Not a valid email');
  } else {
    setSuccessFor(email);
    allValid = true;
  }

  return allValid;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isEmail(email) {
  let emailRegex = new RegExp(
    '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
  );

  return emailRegex.test(email);
}

async function handleHubspot(elements) {
  const hubspotApiUrl =
    'https://api.hsforms.com/submissions/v3/integration/submit/3321037/28036717-f12e-48c5-8a6c-00f941cc3329';
  const formElements = Array.from(elements);
  let formValues = [];
  for (const element of formElements) {
    if (element.tagName === 'BUTTON' || element.name === 'hmo') {
      continue;
    }

    formValues.push({ name: element.name, value: element.value });
  }

  formValues = [...formValues, { name: 'hmo', value: discounts() }];

  const hubspotData = {
    submittedAt: Date.now(),
    fields: formValues,
    context: {
      pageUri: 'www.example.com/page',
      pageName: 'Example page',
    },
    legalConsentOptions: {
      consent: {
        // Include this object when GDPR options are enabled
        consentToProcess: true,
        text:
          'I agree to allow Babybliss to store and process my personal data.',
        communications: [
          {
            value: true,
            subscriptionTypeId: 999,
            text: 'I agree to receive marketing communications from Babybliss.',
          },
        ],
      },
    },
  };

  try {
    const data = await fetch(hubspotApiUrl, {
      body: JSON.stringify(hubspotData),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    window.location.href = 'https://babybliss.com.ng/checklist.pdf';

    console.log(data);
  } catch (error) {
    alert('An error occured. Please try again.');
    console.log(error);
  }
}
