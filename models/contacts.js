const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try{
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  }catch(error){
    console.log('\x1b[33m%s\x1b[0m', error.message);
    return null;
  }
}

// ! corrected == on ===
const getContactById = async (id) => {
  const result = await listContacts();
    if(!result) return null;
    const contact = result.find(item => item.id === id);
    if(!contact) console.warn("\x1B[31m Contact not found");
    return contact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContact = await getContactById(contactId);
  
  if (!contacts || !removedContact) return null;
  const id = contactId.toString();

  const newContacts = contacts.filter(item => item.id !== id);
  const newContactsStr = JSON.stringify(newContacts, null, 2);

  fs.writeFile(contactsPath, newContactsStr );
  return removedContact;
}

const addContact = async (body) => {
  const result = await listContacts();
    if(!result) console.warn("\x1b[33m%s\x1b[0m Failed to read previous contacts. Contacts will be overwritten.");
    const id = (Number(result[result.length - 1].id) + 1).toString() || 1;
    const data = {id, ...body};
    const newContacts = result ? [...result, data] : [data];
    const newContactsStr = JSON.stringify(newContacts, null, 2);
    fs.writeFile(contactsPath, newContactsStr );
    return data;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
