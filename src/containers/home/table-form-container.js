import React, { useState } from 'react';
import TablleForm from '../../components/tablle-form';

const TablleFormContainer = ({ items, onSubmit, onChange, onCancel }) => {
    const [formState, setFormState] = useState(items);
    const [searchValue, setSearchValue]= useState("")

    const checkboxTitle = [ 
    "Description",
    "Date created",
    "Created by",
    "Version",
    "Template status",
    "Template type",
    "Product area",
    "Template stage",
    "Report/CTD Code",
    "Effective date",
    "Report/CTD Title",
    "Date modified",
    "Effective version",
    "Scope/BB Code"]

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setFormState(prevState => {
            const newState = { ...prevState };
            const item = newState[name];
            delete newState[name];
            const orderedState = { "Select all": prevState["Select all"], [name]: { ...item, checked }, ...newState };
            const allChecked = Object.values({...orderedState, "Select all": {checked:true, id:"Select all"}}).every(value => value.checked);
            if (allChecked) {
                orderedState["Select all"] = { ...orderedState["Select all"], checked: true };
            } else {
                orderedState["Select all"] = { ...orderedState["Select all"], checked: false };
            }
            return orderedState;
        });
    }
    
    
    const handleSelectAll = (e,checked) => {
        const updatedFormState = {};
        for (const key in formState) {
            updatedFormState[key] = { ...formState[key], checked: checked || e.target.checked };
        }
        setFormState(updatedFormState);
    };
    

    const handleSearch = (e) => {
        const updatedFormState = {};
        if (e.target.value) {
            
            const searchTerm = e.target.value.toLowerCase(); 
            Object.keys(formState).forEach((el) => {
                if (el.toLowerCase().includes(searchTerm)) { 
                    updatedFormState[el] = el === "Select all"? { checked: false, id: el }: { checked: true, id: el };
                } else {
                    updatedFormState[el] = { checked: false, id: el };
                }
            });
    
            setFormState(updatedFormState); 
        }
        setSearchValue(e.target.value)
    }
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState)
        setSearchValue("")
    }
  
    return (
        <TablleForm
        items={checkboxTitle}
        onSubmit={onSubmit}
        onChange={onChange}
        onCancel={onCancel}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formState={formState} 
        handleSearch={handleSearch}
        searchValue={searchValue}
        handleSelectAll={handleSelectAll}
    />
    );
};

export default TablleFormContainer
