import React, { useState } from 'react'
import Modal, { ModalBody, ModalHeader, ModalTitle, ModalFooter } from '../../bootstrap/Modal';
import Button from '../../bootstrap/Button';
import Spinner from '../../bootstrap/Spinner';

const _messageCreateSuccess = (
  <div>
    <p>
      Chave PIX criada com sucesso!
    </p>
  </div>
);

const _messageCreateError = (
  <div>
    <p>
      Erro ao criar Chave PIX!
    </p>
  </div>
);

const ModalCreatePixKey = ({ open, setIsOpen, setIsClose, id }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    setIsLoading(true)
  }

  return (
    <Modal
      id={'modal-create-chavePIX'}
      titleId={'Criação de Chave PIX'}
      isOpen={open}
      setIsOpen={setIsOpen}
      isStaticBackdrop={true}
      isScrollable={false}
      isCentered={true}
      size="lg"
      isAnimation={true}
    >
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="create-pixKey">Criação de Chave PIX</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Você está criando uma Chave PIX. Deseja continuar?</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          icon="cancel"
          rounded={1}
          onClick={setIsClose}
          shadow="sm"
          hoverShadow="sm"
          size="sm"
        >
          Cancelar
        </Button>
        {isLoading ? (
          <Button
            color="success"
            rounded={1}
            hoverShadow="sm"
            shadow="sm"
            size="sm"
          >
            <Spinner
              color="light"
              inButton
              isGrow
              isSmall
              size={10}
              tag="span"
            >
              Carregando...
            </Spinner>
            Carregando...
          </Button>
        ) : (
          <Button
            type='submit'
            color='success'
            icon="check"
            rounded={1}
            hoverShadow="sm"
            shadow="sm"
            size="sm"
            onClick={handleCreate}
          >
            Confirmar
          </Button>
        )}</ModalFooter>
    </Modal>
  )
}

export default ModalCreatePixKey
