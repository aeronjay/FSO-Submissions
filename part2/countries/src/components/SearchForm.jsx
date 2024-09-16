const SearchForm = (props) => {

    return(
        <form>
            <label htmlFor="country">Find Countries  </label>
            <input type="text" id="country" value={props.search} onChange={(e) => props.setSearch(e.target.value)} />
        </form>
    )
}

export default SearchForm