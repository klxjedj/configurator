import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { Likert } from './likert';
import questListText from './questListText';

export function QuestList(props) {
    let [wtp, setWtp] = useState(500);
    let [endowment, setEndowment] = useState(500);

    let [perceivedTime, setPerceivedTime] = useState(10);

    let wtpChange = (e) => {
        setWtp(e.target.value);
    }
    let endowmentChange = (e) => {
        setEndowment(e.target.value);
    }

    let perceivedTimeChange = (e) => {
        setPerceivedTime(e.target.value);
    }

    let { show, submitted } = props
    return (
        <>
            <Modal show={show}  centered scrollable>
                <Modal.Header><Modal.Title>请完成以下问卷</Modal.Title></Modal.Header>
                <Modal.Body>


                    <Form action='./api/quest' method='post'>
                        <Form.Group className='mb-3'>
                            <Form.Label>您使用的设备类型是？</Form.Label><br></br>
                            <Form.Check value="Mobile" inline type='radio' name='device' label='手机' required></Form.Check>
                            <Form.Check value="Tablet" inline type='radio' name='device' label='平板电脑'></Form.Check>
                            <Form.Check value="Desktop" inline type='radio' name='device' label='台式电脑'></Form.Check>
                            <Form.Check value="Laptop" inline type='radio' name='device' label='笔记本电脑'></Form.Check>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>假如将您的设计专门生产并邮寄给您，您愿意支付的价格是多少？（0-1000元）</Form.Label>
                            <Form.Range min={0} max={1000} defaultValue={500} name='wtp' onChange={wtpChange} required></Form.Range>
                            <Form.Text>当前选择：{wtp}元</Form.Text>
                        </Form.Group>
                        
                        <Form.Group className='mb-3'>
                        <Form.Label>假如您在门店领取您定制的鞋时，一位与您鞋码相同的陌生顾客看中了您的定制鞋并向您提出购买，您能接受的最低出价是多少？（0-1000元）</Form.Label>
                            <Form.Range min={0} max={1000} defaultValue={500} name='endowment' onChange={endowmentChange} required></Form.Range>
                            <Form.Text>当前选择：{endowment}元</Form.Text>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>您感觉您的设计过程大概花了多长时间（0-20分钟）</Form.Label>
                            <Form.Range min={0} max={20} defaultValue={10} name='perceivedTime' onChange={perceivedTimeChange} required></Form.Range>
                            <Form.Text>当前选择：{perceivedTime}分钟</Form.Text>
                        </Form.Group>

                        <Form.Text>请就以下问题进行程度评分：</Form.Text>
                        {questListText.map((item) => (
                            <Form.Group key={item[0]}>
                                <Form.Label>{item[1]}</Form.Label><br></br>
                                <Likert name={item[0]}></Likert>
                            </Form.Group>))}

                        <Form.Group>
                            <Form.Control type='hidden' name='userTel' value={window.tel}></Form.Control>
                        </Form.Group>

                        <Button type="submit">完成</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </>
    )
}