import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'

const Form = () => {
    const [order, setOrder] = useState([])

    const [disableButton, setDisableButton] = useState(true)

    const [formState, setFormState] = useState({
        name: '',
        size: 'Extra Large',
        pepperoni: '',
        italianSausage: '',
        mushrooms: '',
        pineapple: '',
        specialInstructions: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        size: '',
        pepperoni: '',
        italianSausage: '',
        mushrooms: '',
        pineapple: '',
        specialInstructions: '',
    });

    useEffect(() => {
        
        formSchema.isValid(formState)
            .then(valid => {
                setDisableButton(!valid);
            });
        
        
    }, [formState]);

    const formSchema = yup.object().shape({
        name: yup.string()
            .min(2, "Obviously you have more than one letter in your name. Don't mock me!")
            .required("Please input your name."),
        size: yup.string(),
        pepperoni: yup.boolean(),
        italianSausage: yup.boolean(),
        mushrooms: yup.boolean(),
        pineapple: yup.boolean(),
        specialInstructions: yup.string()
    })
    

    const validateData = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                console.log(valid)
                
                setFormErrors({
                    ...formErrors,
                    [event.target.name]: ""
                })
            })
            .catch(error => {
                console.log(error)
                setFormErrors({
                  ...formErrors,
                  [event.target.name]: error.errors[0]
                })
            })
    }

    const updateOrder = event => {
        event.persist();
        validateData(event);
        setFormState({
            ...formState, 
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked: event.target.value});
    };

    const submitForm = event => {
        event.preventDefault();
        axios
          .post("https://reqres.in/api/users", formState)
          .then(response => {
            console.log("Ordered successfully: ", order);
            setOrder(response.data);
            setFormState({
                name: '',
                size: '',
                pepperoni: '',
                italianSausage: '',
                mushrooms: '',
                pineapple: '',
                specialInstructions: ''
            });
          })
          .catch(error => console.log("Order was not successful: ", error.response));
      };

    return (
        <div className='form-page'>
            <h2>Tell Us How You Want Your Delicious Pizza</h2>
            <form onSubmit={submitForm}>
                <label htmlFor='name'>
                    <h5>Name</h5>
                    <input id='name' name='name' type='text' value={formState.name} onChange={updateOrder}/>
                    {formErrors.name ? <p className='error'>{formErrors.name}</p> : null}
                </label>
                {formErrors.name ? <p className="error">{formErrors.name}</p> : null}
                <label htmlFor='size'>
                    <h5>Pizza Size</h5>
                    <select id='size' name='size' onChange={updateOrder}>
                        <option value='Extra Large'>Extra Large</option>
                        <option value='Large'>Large</option>
                        <option value='Medium'>Medium</option>
                        <option value='Small'>Small</option>
                    </select>
                </label>

                <label htmlFor='pepperoni'>
                    <input id='pepperoni' type='checkbox' name='pepperoni' checked={formState.pepperoni} onChange={updateOrder}/>
                    <p>Pepperoni</p>
                </label>

                <label htmlFor='italianSausage'>
                    <input id='italianSausage'type='checkbox' name='italianSausage' checked={formState.italianSausage} onChange={updateOrder}/>
                    <p>Italian Sausage</p>
                </label>

                <label htmlFor='mushrooms'>
                    <input id='mushrooms' type='checkbox' name='mushrooms' checked={formState.mushrooms} onChange={updateOrder}/>
                    <p>Mushrooms</p>
                </label>

                <label htmlFor='pineapple'>
                    <input id='pineapple' type='checkbox' name='pineapple' checked={formState.pineapple} onChange={updateOrder}/>
                    <p>Pineapple</p>
                </label>

                <label htmlFor='specialInstructions'>
                    <h5>Any special instructions for your order?</h5>
                    <textarea id='specialInstructions' name='specialInstructions' value={formState.specialInstructions} onChange={updateOrder} />
                </label>

                <button id="submit" disabled={disableButton}>Add Order</button>

                <pre>{JSON.stringify(order, null, 2)}</pre>
            </form>
        </div>
    )
    
}

export default Form