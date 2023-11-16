/**
 * @typedef {Object} User
 * @property {number} id - The user's ID.
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 * @property {string} maidenName - The user's maiden name.
 * @property {number} age - The user's age.
 * @property {string} gender - The user's gender.
 * @property {string} email - The user's email address.
 * @property {string} phone - The user's phone number.
 * @property {string} username - The user's username.
 * @property {string} password - The user's password.
 * @property {string} birthDate - The user's date of birth.
 * @property {string} image - The user's profile image URL.
 * @property {string} bloodGroup - The user's blood group.
 * @property {number} height - The user's height in centimeters.
 * @property {number} weight - The user's weight in kilograms.
 * @property {string} eyeColor - The user's eye color.
 * @property {Object} hair - The user's hair details.
 * @property {string} hair.color - The color of the user's hair.
 * @property {string} hair.type - The type of the user's hair.
 * @property {string} domain - The user's domain.
 * @property {string} ip - The user's IP address.
 * @property {Object} address - The user's address details.
 * @property {string} address.address - The user's street address.
 * @property {string} address.city - The city where the user resides.
 * @property {Object} address.coordinates - The geographic coordinates of the user's location.
 * @property {number} address.coordinates.lat - The latitude of the user's location.
 * @property {number} address.coordinates.lng - The longitude of the user's location.
 * @property {string} address.postalCode - The postal code of the user's location.
 * @property {string} address.state - The state where the user resides.
 * @property {string} macAddress - The user's MAC address.
 * @property {string} university - The user's university.
 * @property {Object} bank - The user's bank details.
 * @property {string} bank.cardExpire - The expiration date of the user's bank card.
 * @property {string} bank.cardNumber - The user's bank card number.
 * @property {string} bank.cardType - The type of the user's bank card.
 * @property {string} bank.currency - The currency used for bank transactions.
 * @property {string} bank.iban - The user's IBAN (International Bank Account Number).
 * @property {Object} company - The user's company details.
 * @property {Object} company.address - The company's address details.
 * @property {string} company.address.address - The company's street address.
 * @property {string} company.address.city - The city where the company is located.
 * @property {Object} company.address.coordinates - The geographic coordinates of the company's location.
 * @property {number} company.address.coordinates.lat - The latitude of the company's location.
 * @property {number} company.address.coordinates.lng - The longitude of the company's location.
 * @property {string} company.address.postalCode - The postal code of the company's location.
 * @property {string} company.address.state - The state where the company is located.
 * @property {string} company.department - The user's department within the company.
 * @property {string} company.name - The name of the company.
 * @property {string} company.title - The user's job title within the company.
 * @property {string} ein - The user's Employer Identification Number (EIN).
 * @property {string} ssn - The user's Social Security Number (SSN).
 * @property {string} userAgent - The user's user agent string.
 */

const data = require("../data/users.json");

/**
 * @returns {User[]} An array of users.
 */
function getAll() {
    return data.users;
}

/**
 * @param {number} id - The user's ID.
 */
function get(id) {
    return data.users.find((user) => user.id === id);
}

/*function getUsersByCategory(category) {
  return data.users.filter((user) => user.category === category);
}*/

function search(query) {
    return data.users.filter((user) => {
        return (
            user.title.toLowerCase().includes(query.toLowerCase()) ||
            user.description.toLowerCase().includes(query.toLowerCase())
        );
    });
}

//CRUD: create read update delete

/**
 * @param {User} user - user to create
 * @returns {User} - created user
 */
function create(user) {
    const newUser = {
        id: data.users.length + 1,
        ...user,
    };
    data.users.push(newUser);
    return newUser;
}

/**
 * @param {number} id - user's id'
 * @param {User} user - user's data
 * @returns {User} - updated user
 */
function update(id, user) {
    const index = data.users.findIndex((p) => p.id === user.id);
    if (index === -1) {
        throw new Error('User not found');
    }
    data.users[index] = {
        ...data.users[index],
        ...user,
    };
    return data.users[index];
}

/**
 * @param {number} id - user's id
 */
function remove(id) {
    const index = data.users.findIndex(p => p.id === id);
    if (index === -1) {
        throw new Error('User not found');
    }
    data.users.splice(index, 1);
}

module.exports = {
    getAll, get, search, create, update, remove
};