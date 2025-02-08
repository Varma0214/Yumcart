import React,{useState,useContext, useEffect} from 'react'
// import { useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name= event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  
  const placeOrder = async (event) => { 
    event.preventDefault();

    try {
        // Prepare order items from cart
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                // Clone item to avoid modifying the original food_list
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        // Log for debugging
        console.log("orderItems", orderItems);

        // Prepare order data
        let orderData = {
            address: data,  // Ensure `data` is the user's address
            items: orderItems,
            amount: getTotalCartAmount() + 10,  // Include delivery charges (2 units)
        };

        console.log("orderData", orderData);

        // Send order data to the server
        let response = await axios.post(url + "/api/order/place", orderData, { 
            headers: { token }
        });

        console.log("response", response);

        // Check if the order placement was successful
        if (response.data.success) {
            const sessionUrl = response.data.session_url;  // Use camelCase for consistency
            console.log("session_url", sessionUrl);

            // Redirect to Stripe session URL
            window.location.replace(sessionUrl);
        } else {
            alert("Order placement failed. Please try again.");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        alert("An error occurred while placing the order. Please try again later.");
    }
};

  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/cart')

    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  


  
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
              <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>
              <input required  name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
          </div>
                <input required  name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
                <input required  name='street' onChange={onChangeHandler} value={data.street}  type="text" placeholder='Street'/>
                <div className="multi-fields">
                    <input required  name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>  
                    <input required  name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
                </div>
                <div className="multi-fields">
                    <input required  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>  
                    <input required  name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
                </div>
                <input required  name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>
      <div className="place-order-right">
         <div className="cart-total">
                <h2>Cart Totals</h2>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr/>
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>${getTotalCartAmount()===0 ? 0 : 10}</p>
                </div>
                <hr/>
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount()===0 ? 0 : getTotalCartAmount()+10}</b>
                </div>
                <button type='submit'>Proceed to Payment</button>
            </div>
      </div>
    </form>
  )
}

export default PlaceOrder

