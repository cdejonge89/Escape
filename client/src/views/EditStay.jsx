import { Button } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import '../styles/createStay.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from "axios"


export default (props) => {
    const {hostId, stayId} = useParams()

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [numberOfRoom, setNumberOfRoom] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [type, setType] = useState("House");
    const [cancelation, setCancelation] = useState(false);

    const [coordinates, setCoordinates] = useState({})

    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/stay/one/${stayId}`, {withCredentials: true})
            .then(response => {
                const stay = response.data
                setName(stay.name)
                setPrice(stay.price)
                setAddress(stay.address)
                setDescription(stay.description)
                setNumberOfRoom(stay.numberOfRoom)
                setNumberOfPeople(stay.numberOfPeople)
                setType(stay.type)
                setCancelation(stay.cancelation)
            })
            .catch(err => console.log(err))
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const tempCoordinates = await processNewAddress(address);

        axios.put(`http://localhost:8000/api/stay/edit/${stayId}`, {withCredentials: true, name, price, address, description, numberOfRoom, numberOfPeople})
            .then(response => {
                console.log("from put front end", response.data)
                navigate(`/dashboard/host/${hostId}`)
            })
            .catch(err => {
                const errorResponseDataErrors = err.response.data.errors
                console.log(errorResponseDataErrors)
                const errMsgArr = []
                for (const eachKey in errorResponseDataErrors) {
                    errMsgArr.push(errorResponseDataErrors[eachKey].message)
                }
                setErrors(errMsgArr)
            })
    }

    const processNewAddress = async (listingAddress) => {
        try {
        const res = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GEOCODE_API_KEY}&address=${listingAddress}`
        )
        let thisLocation = res.data.results[0].geometry.location
        setCoordinates(thisLocation)
        console.log(thisLocation)
        return thisLocation
    }   catch {
        alert(`${listingAddress} is not a valid address!`)
    }
    }

    return (
        <>
        <Header/>
        <div className="createStay">
            <form className='createStay_form' onSubmit={onSubmitHandler} encType='multipart/form-data'>

            {errors.map((err, index) =>
                    <p key={index} style={{ color: "red" }}>{err}</p>)}

            <p>
                <input type="text" name="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
            </p>
            <p>
                <input type="number" name="price" placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)}/>
            </p>
            <p>
                <input type="text" name="address" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}/>
            </p>
            <p>
                <input type="text" name="description" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
            </p>
            <p>
                <input type="number" name="room" placeholder='Number of rooms' value={numberOfRoom} onChange={(e) => setNumberOfRoom(e.target.value)}/>
            </p>
            <p>
                <input type="number" name="people" placeholder='Number of people' value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)}/>
            </p>
            <select className='select' onChange={(e) => setType(e.target.value)} value={type}>
                <option>Select Type</option>
                <option value='house' name="house">House</option>
                <option value='apartment' name="apartment">Apartment</option>
                <option value='yourt' name="yourt">Yourt</option>
                <option value='tent' name="tent">Tent</option>
                <option value='cabana' name="cabana">Cabana</option>
                <option value='island' name="island">Island</option>
                <option value='castle' name="castle">Castle</option>
            </select>
            <div className='radio'>
                <input type="radio" name="cancelation" unChecked="cancelation" className='radio' onChange={(e) => setCancelation(e.target.checked)} /> <p>Accept Cancelations</p></div>

            <Button varriant='outlined' type="submit"> Edit</Button>
            </form>
        </div>
        <Footer/>
        </>
    )
}

