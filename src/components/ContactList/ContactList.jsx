import PropTypes from 'prop-types';
import { ContactListStyled, ListElement, Btn } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ContactListStyled>
      {contacts.map(({ id, name, number }) => (
        <ListElement key={id}>
          <p>
            {name}: {number}
          </p>
          <Btn type="button" id={id} onClick={e => onDelete(e.target.id)}>
            Delete
          </Btn>
        </ListElement>
      ))}
    </ContactListStyled>
  );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};