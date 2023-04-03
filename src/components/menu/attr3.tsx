import { useRef } from 'react';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import { attrSelected } from '../../store/slices/attrSlice';
import { optionSelected } from '../../store/slices/optionSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';


export function Attr(prop) {
    const currentAttr: number | null = useAppSelector((state) => state.selectedAttr);
    let dispatch = useAppDispatch();
    let icon = useRef(null);
    let { attrIndex, attrName, src: imgSrc, vertical } = prop;
    let active = (attrIndex == currentAttr) ? 'active' : '';
    let controllerPlace = vertical ? '' : 'flex-column';
    
    return (


        <div
            ref={icon}
            className={`attrIcon d-flex align-items-center justify-content-evenly `}
            key={attrIndex}
        >
            <img src={`nikeid/${imgSrc}`} ></img>
            {/* {attrName} */}
        </div>

    )


}