import 'axios';
import axios from 'axios';
import {useState} from 'react'
import Figure from 'react-bootstrap/Figure'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form'

export function BootstrapTest() {
    let [value,setValue]=useState(null);
    let valueChange=(e)=>{
        console.log(e)
        setValue(e.target.value)
    }
    let handleClick = () => {
        axios.post('/api', { a: '5', b: '6' });
    }


    return (
        // <Button variant='primary' onClick={handleClick}>Button</Button>
<Figure.Image src="./waimai.jpg"></Figure.Image>
    )
}

