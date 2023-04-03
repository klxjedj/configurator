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
    let { attrIndex, attrName, src: imgSrc,vertical,key } = prop;
    let active = (attrIndex == currentAttr) ? 'active' : '';
    let controllerPlace=vertical?'':'flex-column';
    console.log(`vertical?:${vertical}`)

    let selectAttr = (e) => {
        console.log(attrIndex);
        if (active) {
            axios.put('./api/action',{
                userTel:window.tel,
                timestamp:Date.now(),
                actionType:'attrCancel',
                targetIndex:attrIndex,
                currentAttr:currentAttr
            });
            dispatch(attrSelected(null));
            dispatch(optionSelected(null));
        }
        else {
            axios.put('./api/action',{
                userTel:window.tel,
                timestamp:Date.now(),
                actionType:'attrSelect',
                targetIndex:attrIndex,
                currentAttr:currentAttr

            });
            dispatch(attrSelected(attrIndex));
            dispatch(optionSelected(null));
        }
    }

    return (


        <div className={`d-flex attrContainer ${controllerPlace}`} key={key}>
            <div
                ref={icon}
                className={`attrIcon d-flex align-items-center justify-content-evenly ${active}`}
                >
                <img src={`nikeid/${imgSrc}`} ></img>
                {/* {attrName} */}

            </div>
            <div className={`ratioIcon d-flex d-inline-block text-center justify-content-center align-items-center`} >
                <div className={`ratio6 border border-5 ${active}`} onClick={selectAttr}></div>
            </div>
        </div>


    )


}