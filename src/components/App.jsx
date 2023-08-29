import {Component} from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {ContactForm} from './ContactForm';
import {Section} from './Section';
import {ContactFilter} from './ContactFilter';
import {ContactList} from './ContactList';

export class App extends Component{
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: ''
    }

    onSubmitForm = (cont) => {
        if (this.state.contacts.find((el) => el.number === cont.number)) {
            const existingContact = this.state.contacts.find(e => e.number === cont.number);
            alert(`This number (${cont.number}) is already in the contact list, recorded as ${existingContact.name}`);
          return;
        }
        const newContact = { ...cont, id: 'id-' + nanoid(3) }; 
        this.setState((prevState) => ({
          contacts: [...prevState.contacts, newContact],
        }));
      };
    

    onChange= filter => {
        this.setState({filter: filter.toLowerCase()})
    }

    onDelete = id => {
        this.setState(pState => ({
            contacts: pState.contacts.filter(e => e.id !== id)
        }))
    }

    render(){
        return (
            <>
                <Section title={'Phonebook'}>
                    <ContactForm onSubmit={this.onSubmitForm} />
                </Section>
                <Section title={'Contacts'}>
                    <ContactFilter onChange={this.onChange} />
                        {this.state.contacts.length ? (
                    <ContactList
                        contacts={this.state.contacts.filter(el =>
                            el.name.toLowerCase().includes(this.state.filter)
                        )}
                        onDelete={this.onDelete}
                    />
                    ) : (
                    <p>No contacts</p>
                    )}
                </Section>
            </>
        );
    }
    
};

App.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
};