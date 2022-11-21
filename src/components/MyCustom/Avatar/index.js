import React from 'react';
import YoutLogo from '../../../assets/img/yourlogo.png'
import './avatar.css';

export default function Avatar({ id, value, onChange }) {
    const photo = value ? value : YoutLogo;
    
    return (
        <div className="personal-image">
            <label className="label">
                <input type="file" id={id} accept="image/*" multiple onChange={onChange} />
                <figure className="personal-figure">
                    <img src={photo} className="personal-avatar rounded" alt="" />
                    <figcaption className="personal-figcaption">
                        <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                    </figcaption>
                </figure>
            </label>
        </div>
    );
}
