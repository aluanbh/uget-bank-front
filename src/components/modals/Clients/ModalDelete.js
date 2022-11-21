import React, { useState } from 'react'
import Modal, { ModalBody, ModalHeader, ModalTitle, ModalFooter } from '../../bootstrap/Modal';
import Button from '../../bootstrap/Button';
import Spinner from '../../bootstrap/Spinner';
import UserDB from '../../../database/wrappers/user';
import showNotification from '../../extras/showNotification';
import api from '../../../services/api';

const _messageDeleteSuccess = (
  <div>
    <p>
      Usuário deletado com sucesso!
    </p>
  </div>
);

const _messageDeleteError = (
  <div>
    <p>
      Erro ao deletar usuário!
    </p>
  </div>
);

const ModalDeleteUsers = ({ open, setIsOpen, setIsClose, loadUsers, userId }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    const data = {
      uid: userId
    }
    console.log(data);
    api.delete('routes/users', { data })
    .then(res => {
      showNotification('', _messageDeleteSuccess, 'success')
      loadUsers();
    })
    .catch(error => {
      console.error(error);
      showNotification('', _messageDeleteError, 'danger')
    })
    .finally(() => {
      setIsLoading(false)
      setIsClose()
    })
  }

  return (
    <Modal
      id={'modal-delete-user'}
      titleId={'Exclusão de Users'}
      isOpen={open}
      setIsOpen={setIsOpen}
      isStaticBackdrop={true}
      isScrollable={false}
      isCentered={true}
      size="lg"
      isAnimation={true}
    >
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="user">Exclusão de Usuário</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>Você está excluindo um Usuário. Está ação é irreversível. Deseja continuar?</p>
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

export default ModalDeleteUsers
