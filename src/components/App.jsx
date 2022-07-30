import Filter from './Filter';
// import ContactList from './ContactList';
import 'react-native-get-random-values'
import { nanoid } from "nanoid";
const { Component } = require("react");



export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
  }

  nameId = nanoid();
  numbId = nanoid();
  filtId = nanoid();

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  }

  handleFilterChange = event => {
    return this.setState({ filter: event.currentTarget.value });
  }



  handleSubmit = event => {
    this.reset();
    event.preventDefault();
    this.state.contacts.push({ id: nanoid(), name: this.state.name, number: this.state.number });
    console.log(this.state.contacts);
    
  }

  reset = () => {
    this.setState({name: '', number: ''});
  }

  getVisiableContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
    
  }

  render() {
    const { contacts, filter } = this.state;
    const visiableContacts = this.getVisiableContacts();
    return (<div>
    <h1>Phonebook</h1>  
    <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameId}>Name
        <input
          id={this.nameId}
          type="text"
          value={this.state.name}
          name="name"
          onChange={this.handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required />
          </label>
        <label htmlFor={this.numbId}>Number      
        <input
          id={this.numbId}
            type="tel"
            value={this.state.number}
          name="number"
          onChange={this.handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required />
          </label>
    <button type="submit">Add contact</button>
      </form>
      <h2>Contacts</h2>
      <Filter id={this.filtId} value={filter} onChange={this.handleFilterChange} />
      {/* <ContactList id={contacts.id} contactArray={visiableContacts} name={contacts.name} number={contacts.number} /> */}
      <ul>
        {visiableContacts.map((contact) => (<li key={contact.id}>{contact.name}<span>{contact.number}</span></li>)
        )}
      </ul>  
    </div>)
   
  }
}
