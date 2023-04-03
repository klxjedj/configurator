import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas'
import Modal from 'react-bootstrap/Modal'

import { useAppSelector } from '../../store/hooks';
import { OptionList } from './optionList';

export function OptionMenu({ vertical }) {

  const currentAttr: number | null = useAppSelector((state) => state.selectedAttr);
  const [show, setShow] = useState(false);
  let handleClose = () => { setShow(false) }

  useEffect(() => {
    if (currentAttr !== null) {
      setShow(true)
    }
  }, [currentAttr]);


  return (
    <Modal show={show} onHide={handleClose} placement={vertical ? 'end' : 'bottom'} animation={true} scrollable={true} centered>
      <Modal.Header><Modal.Title>选择该部件的颜色</Modal.Title></Modal.Header>
      <Modal.Body>
        <OptionList attrIndex={currentAttr} vertical={vertical} />
      </Modal.Body>
      {/* {currentAttr==null?null:(<OptionList attrIndex={currentAttr} vertical={vertical}/>)} */}
    </Modal>
  )
}


