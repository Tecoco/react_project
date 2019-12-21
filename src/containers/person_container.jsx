import {connect} from 'react-redux';
import Person from '../components/person';
import {addPerson} from '../redux/actions/person_action';

export default connect(
            state => ({persons: state.persons}), 
            {addPerson}
            )(Person);
