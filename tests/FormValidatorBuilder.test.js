import {Validadores} from "../src/validadores-portugal/Validadores"
import FormValidatorBuilder from "../src/form-validator-builder/FormValidatorBuilder";

const form = document.createElement("form");
const name = document.createElement("input");
name.id = "name"
const job = document.createElement("input");
job.id = "job"
job.value = "Developer"
form.appendChild(name)
form.appendChild(job)
document.body.appendChild(form)

test('must return only 1 error', () => {
    expect(new FormValidatorBuilder()
        .to(form)
        .field("name")
        .verify(Validadores.Required.validate)
        .field("job")
        .verify(Validadores.Required.validate)
        .callbackError(() => { console.log() })
        .validate().length).toBe(1)
 });

test('field name must be validated', () => {
    expect(new FormValidatorBuilder()
        .to(form)
        .field("name")
        .verify(Validadores.Required.validate)
        .field("job")
        .verify(Validadores.Required.validate)
        .callbackError(() => { console.log() })
        .validate()[0].id).toBe("name")
});

test('only field name must return error', () => {
    expect(new FormValidatorBuilder()
        .to(form)
        .field(["name", "job"])
        .verify(Validadores.Required.validate)
        .callbackError(() => { console.log() })
        .validate().length).toBe(1)
});

test('field name is not required sometimes', () => {
    expect(new FormValidatorBuilder()
        .to(form)
        .when(() => { return document.querySelector("#job").value == "Develop" })
        .field(["name", "job"])
        .verify(Validadores.Required.validate)
        .callbackError(() => { console.log() })
        .validate().length).toBe(0)
});

test('field name is required sometimes', () => {
    expect(new FormValidatorBuilder()
        .to(form)
        .when(() => { return document.querySelector("#job").value == "Developer" })
        .field(["job"])
        .verify(Validadores.Required.validate)
        .period()
        .field("name")
        .verify(Validadores.Required.validate)
        .callbackError(() => { console.log() })
        .validate().length).toBe(1)
});