const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const { nanoid } = require("nanoid");

const updateContact = async (contactData) =>
  await fs.writeFile(contactsPath, JSON.stringify(contactData, null, 2));

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateContact(data);
  return result;
};

const addContact = async ( contactDetails) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    ...contactDetails,
  };
  data.push(newContact);
  await updateContact(data);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
