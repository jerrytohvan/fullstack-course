export const PersonForm = ({ handleSubmit, handleInputChange }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input type="text" id='name' onChange={handleInputChange} />
                </div>
                <div>
                    number: <input type="text" id='number' onChange={handleInputChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
}