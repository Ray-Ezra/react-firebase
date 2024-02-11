import React, { useState, useEffect } from 'react';
import './Contacts.css'
import { app, database } from "../firebaseConfig";
import { getAuth } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

function Contacts() {
    let auth = getAuth();
    const [data, setData] = useState({
        name: '',
        email: '',
        number: ''
    });
    const [contacts, setContacts] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [editContactId, setEditContactId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const dataSnapshot = await getDocs(collection(database, "contacts"));
        setContacts(dataSnapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
    }

    const handleInputs = (event) => {
        let { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        addDoc(collection(database, "contacts"), {
            name: data.name,
            email: data.email,
            number: parseInt(data.number)
        })
            .then(() => {
                alert('Data sent');
                fetchData();
                setShowOverlay(false);
                setData({ name: '', email: '', number: '' });
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleEdit = (id) => {
        const contactToEdit = contacts.find(contact => contact.id === id);
        setData({ ...contactToEdit });
        setEditContactId(id);
        setShowOverlay(true);
    };

    const handleUpdate = () => {
        const dataToUpdate = doc(database, "contacts", editContactId);
        updateDoc(dataToUpdate, { ...data })
            .then(() => {
                alert("Data updated");
                fetchData();
                setShowOverlay(false);
                setData({ name: '', email: '', number: '' });
                setEditContactId(null);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const deleteData = (id) => {
        const dataToDelete = doc(database, 'contacts', id);
        deleteDoc(dataToDelete)
            .then(() => {
                alert("Data Deleted");
                fetchData();
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className='App1'>
            <div className='title'>
               <h1 className='heading'>CONTACTS</h1>
            <button className="button2" onClick={() => setShowOverlay(true)}>Add Contact</button>             
            </div>
            {contacts.map(contact => (
                <div className="contact-container" key={contact.id}>
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>
                    <p>{contact.number}</p>
                    <div className="contact-actions">
                        <button onClick={() => handleEdit(contact.id)}>Edit</button>
                        <button onClick={() => deleteData(contact.id)}>Delete</button>
                    </div>
                </div>
            ))}

            {showOverlay && (
                <div className="overlay">
                    <input
                        className="input-field"
                        type="text"
                        name='name'
                        placeholder='name'
                        value={data.name}
                        onChange={handleInputs}
                    />
                    <input
                        className="input-field"
                        type="email"
                        name='email'
                        placeholder='email'
                        value={data.email}
                        onChange={handleInputs}
                    />
                    <input
                        className="input-field"
                        type="tel"
                        name='number'
                        placeholder='number'
                        value={data.number}
                        onChange={handleInputs}
                    />
                    {editContactId !== null ? (
                        <button onClick={handleUpdate}>Update</button>
                    ) : (
                        <button onClick={handleSubmit}>Add</button>
                    )}
                    <button onClick={() => {
                        setShowOverlay(false);
                        setData({ name: '', email: '', number: '' });
                        setEditContactId(null);
                    }}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Contacts;
