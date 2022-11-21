import React, { useState } from 'react'
import Modal, { ModalBody, ModalHeader, ModalTitle, ModalFooter } from '../../bootstrap/Modal';
import Button from '../../bootstrap/Button';
import Spinner from '../../bootstrap/Spinner';

const _messageDeleteSuccess = (
  <div>
    <p>
      Estabelecimento deletado com sucesso!
    </p>
  </div>
);

const _messageDeleteError = (
  <div>
    <p>
      Erro ao deletar estabelecimento!
    </p>
  </div>
);

const ModalDeleteEstablishments = ({ open, setIsOpen, setIsClose, id }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
  }

  return (
    <Modal
      id={'modal-dekete-establishments'}
      titleId={'Exclusão de Estabelecimentos'}
      isOpen={open}
      setIsOpen={setIsOpen}
      isStaticBackdrop={true}
      isScrollable={false}
      isCentered={true}
      size="lg"
      isAnimation={true}
    >
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="delete-establishment">Exclusão de Estabelecimento</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Você está excluindo um estabelecimento. Está ação é irreversível. Deseja continuar?</p>
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
            onClick={handleDelete}
          >
            Confirmar
          </Button>
        )}</ModalFooter>
    </Modal>
  )
}

export default ModalDeleteEstablishments
