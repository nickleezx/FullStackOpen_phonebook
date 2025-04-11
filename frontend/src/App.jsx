import { useState, useEffect} from 'react';
import {Filter, Form, Persons, Notification} from './components/index';
import PersonService from './services/PersonService';
import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterName, setFilterName] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);

    const handleFilterChange = (e) => setFilterName(e.target.value);

    const hook = () => {
        // axios.get('http://localhost:3001/persons')
        // .then(response => {
        //     setPersons(response.data)
        // }) 
        PersonService.getAll().then(response => setPersons(response));
    }

    useEffect(hook, [])

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification statusMessage={statusMessage}></Notification>
            <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
            
            <h3>Add a new</h3>
            <Form 
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                persons={persons}
                setPersons={setPersons}
                setStatusMessage={setStatusMessage}
                statusMessage={statusMessage}
            />

            <h3>Numbers</h3>

            <Persons persons={persons} filterName={filterName} setPersons={setPersons}/>
            
        </div>
    )
}

export default App