import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = data => {
    const contactExists = this.state.contacts.some(
      contact =>
        contact.name.toLowerCase() === data.name.toLowerCase() ||
        contact.number === data.number
    );

    if (contactExists) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, data],
      };
    });
  };

  handleinputChangeFilter = data => {
    this.setState({
      filter: data,
    });
  };

  handleOnDelete = id => {
    this.setState(prevState => {
      const newContactsArray = prevState.contacts.filter(el => el.id !== id);
      return {
        contacts: newContactsArray,
      };
    });
  };

  handleFilterContacts = () => {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return filteredContacts;
  };

  render() {
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter
          filter={this.handleinputChangeFilter}
          filterValue={this.state.filter}
        />
        <ContactList
          contacts={this.handleFilterContacts}
          handleOnDelete={this.handleOnDelete}
        />
      </div>
    );
  }
}
