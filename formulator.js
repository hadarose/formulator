function formulator({ formTitle, formFields, submitButtonText }) {
  createMainTitle(formTitle);
  let form = createForm();

  formFields.forEach((formField) => {
    createFieldTitle(form, formField.title);

    let fieldContainer = document.createElement("div");
    fieldContainer.className = "form-group container row"; //TODO row

    formField.boxes.forEach((box) => {
      let boxContainer = document.createElement("div");
      boxContainer.className = "col-" + box.area; //TODO col
      fieldContainer.appendChild(boxContainer);

      let label = document.createElement("label");
      label.setAttribute("for", box.label);

      let input =
        box.type === "select"
          ? document.createElement("select")
          : document.createElement("input");

      addInputAttributes(input, box);
      input.className = "form-control";

      if (box.type === "checkbox" || box.type === "radio") {
        if (formField.layout === "inline") {
          boxContainer.className = "form-check form-check-inline";
          fieldContainer.style.paddingLeft = "30px";
        } else {
          boxContainer.className += " form-check";
          fieldContainer.className = fieldContainer.className.replace(
            " row",
            ""
          );

          fieldContainer.style.marginLeft = "0px";
        }

        input.className = "form-check-input";
        label.className = "form-check-label";
        label.textContent = box.label;
      }

      if (box.type === "select") {
        box.options.forEach((boxOption) => {
          let option = document.createElement("option");
          option.setAttribute("value", boxOption);
          option.textContent = boxOption;
          input.appendChild(option);
        });

        boxContainer.className += " form-select";
        label.textContent = box.type === "select" ? "" : box.label;
      }

      boxContainer.appendChild(input);
      boxContainer.appendChild(label);
      fieldContainer.appendChild(boxContainer);
    });

    form.appendChild(fieldContainer);
  });

  form.appendChild(createSubmitButton(submitButtonText));
  form.addEventListener("submit", (event) => {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add("was-validated");
  });
}

// Assist Functions
function createMainTitle(formTitle) {
  if (formTitle) {
    let mainTitle = document.createElement("h1");
    mainTitle.textContent = formTitle;
    document.body.appendChild(mainTitle);
  }
}

function createForm() {
  let form = document.createElement("form");
  form.className = "needs-validation";
  form.setAttribute("novalidate", "true");
  document.body.appendChild(form);
  return form;
}

function createFieldTitle(form, title) {
  if (title) {
    let fieldTitle = document.createElement("h4");
    fieldTitle.style.padding = "15px";
    fieldTitle.textContent = title;
    form.appendChild(fieldTitle);
  }
}

function addInputAttributes(input, box) {
  input.setAttribute("type", box.type);
  input.setAttribute("id", box.label);
  input.setAttribute("name", box.name);

  if (box.required) {
    input.setAttribute("required", "true");
  }

  if (box.type === "text" || box.type === "email" || box.type === "password") {
    input.setAttribute("placeholder", box.placeholder);
  }
}

function createSubmitButton(text) {
  let button = document.createElement("input");
  button.setAttribute("type", "submit");
  button.setAttribute("value", text);
  button.className = "btn btn-info";
  button.style.marginLeft = "15px";

  return button;
}
// Calling the form builder

let box1 = {
  type: "text",
  label: "firstName",
  name: "firstName",
  placeholder: "First Name",
  layout: "",
  area: 4,
};

let box2 = {
  type: "text",
  label: "lastName",
  name: "lastName",
  placeholder: "Last Name",
  layout: "",
  area: 8,
};

let emailBox = {
  type: "email",
  label: "email",
  name: "email",
  placeholder: "xxxx@xxxx.com",
  layout: "",
  area: 12,
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
  layout: "",
  area: 12,
  options: ["Choose An Option", "TLV", "Rishon", "Jerusalem"],
};

let box3 = {
  type: "radio",
  label: "Beginner",
  name: "programming-level",
  placeholder: "",
  layout: "",
  area: 6,
};

let box4 = {
  type: "radio",
  label: "Advanced",
  name: "programming-level",
  placeholder: "",
  layout: "",
  area: 6,
};

let box5 = {
  type: "checkbox",
  label: "Under 21",
  name: "age",
  placeholder: "",
  layout: "block",
  area: 4,
};

let box6 = {
  type: "checkbox",
  label: "21-50",
  name: "age",
  placeholder: "",
  layout: "",
  area: 4,
};

let box7 = {
  type: "checkbox",
  label: "50+",
  name: "age",
  placeholder: "",
  layout: "",
  area: 4,
};

formulator({
  formTitle: "Formulator Example",
  formFields: [
    {
      title: "Personal Details",
      boxes: [box1, box2, emailBox],
    },
    {
      layout: "",
      title: "City",
      boxes: [cityBox],
    },
    {
      title: "Programming Level",
      layout: "block",
      boxes: [box3, box4],
    },
    {
      title: "Age",
      layout: "inline",
      boxes: [box5, box6, box7],
    },
  ],
  submitButtonText: "Submit",
});
