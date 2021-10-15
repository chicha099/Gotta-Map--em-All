import react from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import Nav from './Nav';

export default function About() {
    return (
        <div>
            <Nav />
            <div className='mainAbout'>
                <h1>About Me</h1>
                <div>
                    <p>This is the about me route</p>
                </div>
                <div>
                    <a href="https://github.com/chicha099" target='_blank'>
                        <img src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Emblem.png" alt="" width='7%' />
                    </a>
                    <a href="https://www.linkedin.com/in/seraf%C3%ADn-dericks-a4784a155/" target='_blank' className='aboutLogo'>
                        <img src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Linkedin.png" alt="" width='7%' />
                    </a>
                </div>
            </div>
        </div>
    )
}