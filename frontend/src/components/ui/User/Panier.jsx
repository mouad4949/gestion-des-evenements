import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Panier() {


    const [paniers, setPanier] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/panier')
            .then(response => {
                setPanier(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
    }, []);
    // const [panierItems, setPanierItems] = useState([]);
    
    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/panier')
    //         .then(response => {
    //             const allpanier = response.data;
    //             setPanierItems(allpanier);

    //             // Extract unique types from events
    //             const uniqueTypes = ['All', ...new Set(allpanier.map(panier => panier.type))];
    //             setTypes(uniqueTypes);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the items!', error);
    //         });
    // }, []);
    // // Fonction pour charger les éléments du panier depuis la base de données
    // const loadPanierItems = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/api/panier');
    //         setPanierItems(response.data);
    //     } catch (error) {
    //         console.error('Error fetching panier items:', error);
    //     }
    // };

    // // Effet pour charger les éléments du panier au chargement de la page
    // useEffect(() => {
    //     loadPanierItems();
    // }, []);

    // Fonction pour supprimer un élément du panier
    // const handleDeleteItem = async (itemId) => {
    //     try {
    //         await axios.delete(`http://localhost:8000/api/panier/${itemId}`);
    //         // Recharge les éléments du panier après suppression
    //         loadPanierItems();
    //     } catch (error) {
    //         console.error('Error deleting panier item:', error);
    //     }
    // };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Prix
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Localisation
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Validation
                        </th>
                    </tr>
                </thead>
                <tbody>
                {paniers.map((panier) => (
                        <tr key={panier.id}>
                            <td className="px-6 py-4">{panier.description}</td>
                            <td className="px-6 py-4">{panier.type}</td>
                            <td className="px-6 py-4">{panier.prix} €</td>
                            <td className="px-6 py-4">{panier.localisation}</td>
                            <td className="px-6 py-4">{panier.date}</td>
                            <td className="px-6 py-4">
                                <button
                                    
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                                >
                                    Valider
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
