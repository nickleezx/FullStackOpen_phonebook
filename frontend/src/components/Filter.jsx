const Filter = function ({filterName, handleFilterChange}) {
    return (
        <div>
            <input value={filterName} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter