export const getContacts = async () => {
  const res = await fetch('http://localhost/api/v1/contacts');
  const contactData = await res.json();
  return contactData;
};

