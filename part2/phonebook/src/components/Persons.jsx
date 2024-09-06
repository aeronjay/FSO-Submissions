const Persons = ({persons, search}) => {
    return(
        <>
            <h2>Numbers</h2>
            {
                (search === '') ? 
                persons.map((person) => {
                return <p key={person.name}>{person.name} {person.number}</p>;
                })
                : 
                persons.filter((person) => {
                if(person.name.toLocaleLowerCase().includes(search.toLowerCase())){
                    return true;
                }
                }).map((person) => {
                return <p key={person.name}>{person.name} {person.number}</p>;
                })

            }
        </>
    )
}

export default Persons