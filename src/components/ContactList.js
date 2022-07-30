import React from 'react';

const ContactList = ({ contactArray, id, name, number }) => (
  <ul>
    {{ contactArray }.map(contact => (
      <li key={contact.id}>
        {contact.name}
        <span>{contact.number}</span>
      </li>
    ))}
  </ul>
);

export default ContactList;
