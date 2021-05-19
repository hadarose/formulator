function formulator({ formTitle, formSections, submitButton }) {
  createAndAppendTitle(document.body, formTitle);

  const formElement = createForm();

  formSections.forEach(({ sectionTitle, isVerticalLayout, fields }) => {
    const formSection = document.createElement("fieldset");
    formSection.setAttribute("class", "form-group container row");

    createAndAppendTitle(formSection, sectionTitle);

    fields.forEach((field) => {
      createField(formSection, isVerticalLayout, field);
    });

    formElement.appendChild(formSection);
  });

  createSubmitButton(formElement, submitButton);
}

// Assist Functions
function createForm() {
  let formElement = document.createElement("form");
  formElement.className = "needs-validation";
  formElement.setAttribute("novalidate", "true");

  document.body.appendChild(formElement);

  return formElement;
}

function createAndAppendTitle(element, title) {
  if (!title) {
    return;
  }

  const newTag = element === document.body ? "h1" : "legend";
  const newTitle = document.createElement(newTag);
  newTitle.textContent = title;
  element.appendChild(newTitle);
}

function createField(formSection, isVerticalLayout, field) {
  const fieldContainer = document.createElement("div");
  fieldContainer.setAttribute("class", "col-" + field.colSpan);

  const label = document.createElement("label");
  label.setAttribute("for", field.label);

  const input = createInput(
    formSection,
    isVerticalLayout,
    fieldContainer,
    label,
    field
  );

  fieldContainer.appendChild(input);
  fieldContainer.appendChild(label);
  formSection.appendChild(fieldContainer);
}

function createInput(
  formSection,
  isVerticalLayout,
  fieldContainer,
  label,
  field
) {
  const input =
    field.type === "select"
      ? document.createElement("select")
      : document.createElement("input");

  addInputAttributes(input, field);

  if (field.type === "checkbox" || field.type === "radio") {
    setCheckboxAndRadioAttributes(label, field, input);
  } else if (field.type === "select") {
    setSelectAttributes(fieldContainer, label, field, input);
  }

  setSectionLayout(formSection, isVerticalLayout, fieldContainer, field.type);

  return input;
}

function addInputAttributes(input, field) {
  input.setAttribute("type", field.type);
  input.setAttribute("id", field.label);
  input.setAttribute("name", field.name);
  input.setAttribute("class", "form-control");

  if (field.required) {
    input.setAttribute("required", true);
  }

  switch (field.type) {
    case "text":
    case "email":
    case "password":
      input.setAttribute("placeholder", field.placeholder);
      break;
    default:
      break;
  }
}

function setCheckboxAndRadioAttributes(label, field, input) {
  input.setAttribute("class", "form-check-input");
  label.setAttribute("class", "form-check-label");
  label.textContent = field.label;
}

function setSelectAttributes(fieldContainer, label, { options }, input) {
  options.forEach((option) => {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", option);
    optionElement.textContent = option;
    input.appendChild(optionElement);
  });

  fieldContainer.setAttribute(
    "class",
    (fieldContainer.className += " form-select")
  );
  label.textContent = "";
}

function setSectionLayout(formSection, isVerticalLayout, fieldContainer, type) {
  if (isVerticalLayout) {
    if (type === "radio" || type === "checkbox") {
      formSection.classList.remove("container", "row");
    } else {
      formSection.classList.remove("container", "row");
    }
  } else {
    if (type === "radio" || type === "checkbox") {
      fieldContainer.className += " form-check";
      fieldContainer.className = "form-check form-check-inline";
    }
  }
}

function createSubmitButton(formElement, { text, onSubmit }) {
  let button = document.createElement("input");
  button.setAttribute("type", "submit");
  button.setAttribute("value", text);
  button.className = "btn btn-info";

  formElement.appendChild(button);

  formElement.addEventListener("submit", onSubmit);
  // // Todo onSubmit
  // formElement.addEventListener("submit", (event) => {
  //   if (formElement.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //
  //   formElement.classList.add("was-validated");
  // });
}

// Calling the form builder

let field1 = {
  type: "text",
  label: "firstName",
  name: "firstName",
  placeholder: "First Name",
  colSpan: 4,
  required: true,
};

let field2 = {
  type: "text",
  label: "lastName",
  name: "lastName",
  placeholder: "Last Name",
  colSpan: 8,
  required: true,
};

let emailBox = {
  type: "email",
  label: "email",
  name: "email",
  placeholder: "xxxx@xxxx.com",
  colSpan: 8,
  required: true,
};

let passwordBox = {
  type: "password",
  label: "password",
  name: "password",
  placeholder: "******",
};

let cityBox = {
  type: "select",
  label: "city",
  name: "city",
  placeholder: "",
  colSpan: 12,
  options: ["Choose An Option", "TLV", "Rishon", "Jerusalem", "Ramat Gan"],
  required: false,
};

let field3 = {
  type: "radio",
  label: "Beginner",
  name: "programming-level",
  placeholder: "",
  colSpan: 6,
  required: false,
};

let field4 = {
  type: "radio",
  label: "Advanced",
  name: "programming-level",
  placeholder: "",
  colSpan: 6,
  required: false,
};

let field5 = {
  type: "checkbox",
  label: "Under 21",
  name: "age",
  placeholder: "",
  colSpan: 4,
  required: false,
};

let field6 = {
  type: "checkbox",
  label: "21-50",
  name: "age",
  placeholder: "",
  colSpan: 4,
  required: false,
};

let field7 = {
  type: "checkbox",
  label: "50+",
  name: "age",
  placeholder: "",
  colSpan: 4,
  required: false,
};

formulator({
  formTitle: "Formulator Example",
  formSections: [
    {
      sectionTitle: "Personal Details",
      isVerticalLayout: true,
      fields: [field1, field2, emailBox],
    },
    {
      sectionTitle: "City",
      isVerticalLayout: false,
      fields: [cityBox],
    },
    {
      sectionTitle: "Programming Level",
      isVerticalLayout: false,
      fields: [field3, field4],
    },
    {
      sectionTitle: "Age",
      isVerticalLayout: true,
      fields: [field5, field6, field7],
    },
  ],
  submitButton: {
    text: "Submit",
    onSubmit: () => alert("submit"),
  },
});
