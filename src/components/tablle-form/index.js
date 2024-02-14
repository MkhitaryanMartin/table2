import Checkbox from '../UI/checkbox';
import Button from '../UI/button';
import "./style.css";

const TablleForm = ({
    onCancel, 
    formState, 
    handleSubmit, 
    handleChange,
    handleSearch,
    searchValue,
    items,
    handleSelectAll
}) => {
   
return (
        <form className='Table-form' onSubmit={handleSubmit}>
            <input type='search' onChange={handleSearch} value={searchValue} className="Table__search-input"/>
            <Checkbox
                    key={"Select all"}
                    checked={formState["Select all"].checked}
                    name={"Select all"}
                    label={"Select all"}
                    onChange={handleSelectAll}
                    id={formState["Select all"].id}
                />
            {items.map((item) => (
                <Checkbox
                    key={item}
                    checked={formState[item].checked}
                    name={item}
                    label={item}
                    onChange={handleChange}
                    id={formState[item].id}
                />
            ))}
            <div className='Table-form__button-block' >
                <Button variant='light' text='Cancel' onClick={onCancel} />
                <Button variant='primary' text='Continue' type="submit" />
            </div>
        </form>
    );
};

export default TablleForm
