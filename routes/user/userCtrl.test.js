const userCtrl = require('./userCtrl')
const request = require('supertest');
const app = require('../../app');

test('Test de la réponse de la route GET /user/:/id avec un id valide', (done) => {
    return request(app).get('/user/00000000-0000-0000-0000-000000000001').then(response => {
        expect(response.type).toBe('application/json')
        expect(response.body).not.toEqual({})
        expect(response.statusCode).toBe(200)
        done()
    })
})

test('Test de la réponse de la route GET /user/:/id avec un id invalide', (done) => {
    return request(app).get('/user/1819841489').then(response => {
        expect(response.body).toEqual({})
        expect(response.statusCode).toBe(400)
        done()
    })
})

test('Actions vide, doit retourner un objet vide', () => {
    expect(userCtrl.getViewedItems([])).toEqual({})
})

test("Regarde si un item existe déjà dans l'array et doit retourner true si oui,", () => {
    const arr = [500653615, 500653613]
    expect(userCtrl.checkIfItemExistInArray(arr, arr[0])).toBeTruthy()
})

test("Regarde si un item existe déjà dans l'array et doit retourner false si non,", () => {
    const arr = [500653615, 500653613]
    expect(userCtrl.checkIfItemExistInArray(arr, 500653614)).toBeFalsy()
})