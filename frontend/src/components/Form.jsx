import PersonService from '../services/PersonService'

const Form = function({newName, newNumber, setNewName, setNewNumber, persons, setPersons, statusMessage, setStatusMessage}){
    const handleNameChange = (e) => setNewName(e.target.value);

    const handleNumberChange = (e) => setNewNumber(e.target.value);

    const handleStatus = function (message) {
        setStatusMessage(message);
        setTimeout(()=> setStatusMessage(null), 5000);
    }

    const handleSubmit = function (e) {
        e.preventDefault();
        let newEntry = {
            name: newName,
            number: newNumber,
        };
    
        const found = persons.find((element) => element.name === newName);
    
        if (found) {
            // If found, confirm to replace the number
            if (confirm(`${newEntry.name} is already added to phonebook, replace the old number with a new one?`)) {
                newEntry = { ...found, number: newEntry.number }; 
                console.log(newEntry);
                PersonService.updatePerson(newEntry.id, newEntry)
                    .then(response => {
                        // Update the persons state with the new entry
                        setPersons(persons.map(person => 
                            person.id === response.id ? response : person
                        ));
                        setNewName('');
                        setNewNumber('');
                        handleStatus(`Updated ${response.name}`);
                    })
                    .catch(e => {
                        setStatusMessage(`Information about ${newEntry.name} has already been removed from the server`);
                        setPersons(persons.filter(p => p.id !== newEntry.id));
                        setTimeout(() => setStatusMessage(null), 5000);
                    });
            }
        } else {
            // If not found, add a new contact
            PersonService.addNumber(newEntry)
                .then(response => {
                    setPersons(persons.concat(response)); // Append the newly added contact
                    setNewName('');
                    setNewNumber('');
                    handleStatus(`Added ${response.name}`);
                }).catch(e => console.log(e.message));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} required/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} required/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
    )
}

export default Form