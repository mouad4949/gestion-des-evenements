import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LOGIN_ROUTE } from '@/router';
import { Link } from 'react-router-dom';
export default function Home() {
    const [evenements, setEvenements] = useState([]);
    const [filteredEvenements, setFilteredEvenements] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('All');

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
    }, []);

    useEffect(() => {
        if (selectedType === 'All') {
            setFilteredEvenements(evenements);
        } else {
            setFilteredEvenements(evenements.filter(evenement => evenement.type === selectedType));
        }
    }, [selectedType, evenements]);

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
                         <Link className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={LOGIN_ROUTE}>Acheter</Link>
                             
                             {/* <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                             </svg> */}
                         
                     </div>
                 </div>
                ))}
            </div>
        </div>
        
    );
}
