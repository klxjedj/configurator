import Form from 'react-bootstrap/Form'

export function Likert(props){
    let {name}=props;

    return(
        <>
        {[1,2,3,4,5,6,7].map(val=>
            <Form.Check inline type='radio' value={val} name={name} label={val} required></Form.Check>
        )}
        </>
    )
}