const Persons = ({persons, search, handleDelete}) => {



    return(
        <>
            <h2>Numbers</h2>
            {
                (search === '') ? 
                persons.map((person) => {
                    return <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name) }>Delete</button></p>;
                })
                : 
                persons
                    .filter((person) => {
                    if(person.name.toLocaleLowerCase().includes(search.toLowerCase())){
                        return true;
                    }}).map((person) => {
                        return <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Delete</button></p>;
                    })

            }
        </>
    )
}

export default Persons