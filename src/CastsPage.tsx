import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CastsPage.css';
import vijayVarma from './images/vijayvarmacopy.jpeg';
import naseeruddinShah from './images/NaseeruddinShahcopy.jpeg';
import pankajKapur from './images/PankajKapurcopy.jpeg';
import arvindSwamy from './images/ArvindSwamycopy.jpeg';
import diaMirza from './images/DiaMirzacopy.jpeg';
import kumudMishra from './images/KumudMishracopy.jpeg';
import manojPahwa from './images/ManojPahwacopy.jpeg';
import adityaSrivastava from './images/AdityaSrivastavacopy.jpeg';


interface CastMemberData {
    image: string;
    name: string;
    description: string;
}

const CastsPage: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Scroll to the top when the component is rendered
        window.scrollTo(0, 0);
    }, []);

    const handleBackClick = () => {
        navigate('/'); 
    };

    // Cast and crew data for IC 814: The Kandahar Hijack
    const castMembers: CastMemberData[] = [
        {
            image: vijayVarma,
            name: 'Vijay Varma',
            description: 'An actor known for his roles in "Gully Boy," "Darlings," and "Monsoon Shootout."'
        },
        {
            image: naseeruddinShah,
            name: 'Naseeruddin Shah',
            description: 'A legendary actor known for his work in "A Wednesday," "The League of Gentlemen," and "The Dirty Picture."'
        },
        {
            image: pankajKapur,
            name: 'Pankaj Kapur',
            description: 'An acclaimed actor known for his roles in "Maqbool," "The Blue Umbrella," and "Khatta Meetha."'
        },
        {
            image: arvindSwamy,
            name: 'Arvind Swamy',
            description: 'An actor known for his roles in "Roja," "Bombay," and "Thani Oruvan."'
        },
        {
            image: diaMirza,
            name: 'Dia Mirza',
            description: 'An actress and producer known for her performances in "Rehnaa Hai Terre Dil Mein," "Lal Kaptaan," and "Sanju."'
        },
        {
            image: kumudMishra,
            name: 'Kumud Mishra',
            description: 'An actor known for his work in "Rang De Basanti," "Jolly LLB," and "Nakkash."'
        },
        {
            image: manojPahwa,
            name: 'Manoj Pahwa',
            description: 'An actor known for his work in "Dil Chahta Hai," "Banda Yeh Bindass Hai," and "Pataakha."'
        },
        {
            image: adityaSrivastava,
            name: 'Aditya Srivastava',
            description: 'An actor known for his roles in "Paanch," "Black Friday," and "Lal Kaptaan."'
        },
    ];

    // CastMember component logic inside the main file
    const CastMember: React.FC<CastMemberData> = ({ image, name, description }) => {
        const [showDescription, setShowDescription] = useState(false);

        const handleMouseEnter = () => {
            setShowDescription(true);
        };

        const handleMouseLeave = () => {
            setShowDescription(false);
        };

        return (
            <div 
                className="cast-member" 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                style={{ marginBottom: '20px', cursor: 'pointer' }}
            >
                <img src={image} alt={name} style={{ width: '180px', height: '200px' }} />
                <h3>{name}</h3>
                {showDescription && <p>{description}</p>}
            </div>
        );
    };

    return (
        <div className='casts-page'>
            <div className="heading">
                <h1>CASTS AND CREW</h1>
            </div>
            <div className='mid-container'>
                <div className='flightpic'>
                    {castMembers.map((member, index) => (
                        <CastMember 
                            key={index} 
                            image={member.image} 
                            name={member.name} 
                            description={member.description} 
                        />
                    ))}
                </div>
            </div>
            <div className="back-button-container">
                <button className="back-button" onClick={handleBackClick}>Back</button>
            </div>
        </div>
    );
}

export default CastsPage;
