import React, { useState } from 'react';

import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../bootstrap/Modal';
import Spinner from '../../bootstrap/Spinner';


const ModalLoading = ({ open, setIsOpen, text }) => {

  const [isLoading, setIsLoading] = useState(false);


  return (
    <Modal
      id={'modal-register-pixKey'}
      titleId={'Cadastro de Chave PIX'}
      isOpen={open}
      setIsOpen={setIsOpen}
      isStaticBackdrop={true}
      isScrollable={false}
      isCentered={true}
      size="lg" // 'sm' || 'lg' || 'xl' 
      isAnimation={true}
    >
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="register-pixKey"> {text}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Spinner
          color="dark"
          inButton
          isGrow
          isSmall
          size={10}
          tag="span"
        >
          Carregando...
        </Spinner>
      </ModalBody>
    </Modal>
  )
}

export default ModalLoading;