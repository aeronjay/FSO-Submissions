const Filter = ({search, setSearch}) => {
    return (
        <>
            <h2>Phonebook</h2>
            <div>
                filter contact: 
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
        </>
    )
}
export default Filter