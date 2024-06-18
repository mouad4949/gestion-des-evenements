import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LOGIN_ROUTE, PANIER } from '@/router';
import { Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function UserDashboard() {
    const [evenements, setEvenements] = useState([]);
    const [filteredEvenements, setFilteredEvenements] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('All');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/evenements')
            .then(response => {
                const allEvenements = response.data;
                setEvenements(allEvenements);

                // Extract unique types from events
                const uniqueTypes = ['All', ...new Set(allEvenements.map(evenement => evenement.type))];
                setTypes(uniqueTypes);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });

        // Fetch CSRF token
        axios.get('http://localhost:8000/csrf-token')
            .then(response => {
                setCsrfToken(response.data.csrf_token);
            })
            .catch(error => {
                console.error('There was an error fetching the CSRF token!', error);
            });
    }, []);

    useEffect(() => {
        if (selectedType === 'All') {
            setFilteredEvenements(evenements);
        } else {
            setFilteredEvenements(evenements.filter(evenement => evenement.type === selectedType));
        }
    }, [selectedType, evenements]);

    const handleAddToCart = async (evenement) => {
        try {
            await axios.post('http://localhost:8000/api/panier', {
                type: evenement.type,
                description: evenement.description,
                prix: evenement.prix,
                date: evenement.date,
                localisation: evenement.localisation
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });

            console.log('Event added to cart successfully');
        } catch (error) {
            console.error('There was an error adding the event to the cart!', error);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <div className="bg-gray-800 p-4">
                <nav className="flex justify-center space-x-4">
                    {types.map(type => (
                        <button
                            key={type}
                            className={`text-white px-3 py-2 rounded-md text-sm font-medium ${
                                selectedType === type ? 'bg-gray-900' : 'bg-gray-700 hover:bg-gray-900'
                            }`}
                            onClick={() => setSelectedType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Cards */}
            <div className="flex flex-wrap justify-center">
                {filteredEvenements.map(evenement => (
                    <div key={evenement.id} className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
                        <a href="#">
                            <img className="rounded-t-lg w-full h-48 object-cover" src={`../../images/${evenement.image_url}`} alt={evenement.description} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{evenement.localisation}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{evenement.description}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{evenement.date}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{evenement.prix} €</p>
                            <Link className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={PANIER}>Acheter</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
