import { useAppDispatch } from '../../store/hooks';
import { attrSelected } from '../../store/slices/attrSlice';
import { optionSelected } from '../../store/slices/optionSlice';
// import "./option.css";
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
    const currentAttr=useAppSelector((state)=>state.selectedAttr)

    let { optionIndex, optionColorName, optionColorCode, src: imgSrc, attrIndex,vertical } = prop;
    let active = optionIndex === currentOption ? 'active' : ''
    let dispatch = useAppDispatch()
    let selectOption = (e) => {
        console.log("option: attrIndex:", attrIndex)
        console.log("option:optionIndex:", optionIndex)
        axios.put('./api/action',{
            userTel:window.tel,
            timestamp:Date.now(),
            actionType:'optionSelect',
            targetIndex:optionIndex,
            currentAttr:currentAttr
        });
        dispatch(optionSelected(optionIndex))
        // if (active) {
        //     axios.put('./api/action',{
        //         userTel:window.tel,
        //         timestamp:Date.now(),
        //         actionType:'optionCancel',
        //         targetIndex:optionIndex
        //     });
        //     dispatch(optionSelected(null)) }
        // else {
        //     axios.put('./api/action',{
        //         userTel:window.tel,
        //         timestamp:Date.now(),
        //         actionType:'optionSelect',
        //         targetIndex:optionIndex
        //     });
        //     dispatch(optionSelected(optionIndex))
        // }

    }
    let controllerPlace=vertical?'':'flex-column';

    return (
        <div className={`d-flex flex-shrink-0 ${controllerPlace}`} >
            <div className={`optionIcon d-flex d-inline-block text-center justify-content-center align-items-center `} >
                {imgSrc !== undefined
                    ? (<img src={`nikeid/${imgSrc}`}></img>)
                    : (<div className='option' style={{ backgroundColor: `#${optionColorCode}` }}></div>)}
                {/* <p className='optionClassName'>{optionColorName}</p> */}
            </div>
            <div className={`ratioIcon d-flex d-inline-block text-center justify-content-center align-items-center`} >
                <div className={`ratio6 border border-5 ${active}`} onClick={selectOption}></div>
            </div>
        </div>
        

    )


}