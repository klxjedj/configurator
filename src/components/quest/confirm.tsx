import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

export function Confirm(props) {
    let { show, confirmed, cancelled } = props

    return (
        <Modal show={show} centered>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>确定完成？</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    点击“确定”填写问卷，点击“取消”继续设计
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={confirmed}>确定</Button>
                    <Button onClick={cancelled}>取消</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )
}