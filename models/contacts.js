
const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const {generatorId} = require('../helpers')



const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const result = await listContacts();
  const contact = result.find(item => item.id === id);
  return contact || null;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  if (!contacts) return null;
  const removedContact = await getContactById(id);
  const newContacts = contacts.filter(item => item.id !== id);
  const newContactsStr = JSON.stringify(newContacts, null, 2);
  fs.writeFile(contactsPath, newContactsStr );
  return removedContact;
}

const addContact = async (body) => {
  const result = await listContacts();
  if (!result) return null;
  const id = generatorId(result);
  const data = {id, ...body};
  const newContacts = result ? [...result, data] : [data];
  const newContactsStr = JSON.stringify(newContacts, null, 2);
  fs.writeFile(contactsPath, newContactsStr );
  return data;
}

const updateContact = async (id, body) => {
  const result = await listContacts();

  const contact = result.find(item => item.id === id);
  if (!contact) return null;

  let fixedContact = {};
  const newContacts = result ? result.map(el => {if (el.id === id) {fixedContact = {...el, ...body}; return fixedContact }else{return el}}) : null;
  const newContactsStr = JSON.stringify(newContacts, null, 2);
  fs.writeFile(contactsPath, newContactsStr );
  return fixedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
