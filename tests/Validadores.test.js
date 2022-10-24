import {Validadores} from "../src/validadores-portugal/Validadores"

test('NIF 123456789 is valid', () => {
    expect(Validadores.NIF.validate(123456789)).toBe(true)
});

test('NIF 123456788 is invalid', () => {
    expect(Validadores.NIF.validate(123456788)).toBe(false)
});

test('Telemovel 900123456 is valid', () => {
    expect(Validadores.Telemovel.validate(900123456)).toBe(true)
});

test('Telemovel 90012345 is invalid', () => {
    expect(Validadores.Telemovel.validate(90012345)).toBe(false)
});

test('email user@site.com is valid', () => {
    expect(Validadores.Email.validate("user@site.com")).toBe(true)
});

test('email user@.site.com.comax is invalid', () => {
    expect(Validadores.Email.validate("user@.site.com.comax")).toBe(false)
});

