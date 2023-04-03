import { useAppDispatch } from '../../store/hooks';
import { attrSelected } from '../../store/slices/attrSlice';
import { optionSelected } from '../../store/slices/optionSlice';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import { useAppSelector } from "../../store/hooks"
import Dropdown from 'react-bootstrap/Dropdown'

import axios from 'axios';


interface OptionProp {
    optionColorCode: string;
    optionColorName: string;
    src: string | null
    optionIndex: number
    attrIndex: number
    vertical:boolean
}

export function Option(prop: OptionProp) {
    const currentOption = useAppSelector((state) => state.selectedOption)
    const currentAttr = useAppSelector((state) => state.selectedAttr)

    let { optionIndex, optionColorName, optionColorCode, src: imgSrc, attrIndex,vertical } = prop;

    return (
            <div className={`optionIcon d-flex d-inline-block text-center justify-content-center align-items-center `} key={optionIndex}>
                {imgSrc !== undefined
                    ? (<img src={`nikeid/${imgSrc}`}></img>)
                    : (<div className='option' style={{ backgroundColor: `#${optionColorCode}` }}></div>)}
                {/* <p className='optionClassName'>{optionColorName}</p> */}
            </div>
    

    )


}