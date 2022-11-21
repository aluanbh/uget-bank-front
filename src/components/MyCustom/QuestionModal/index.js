import React, { memo, useContext, useState } from 'react'
import Modal, { ModalBody, ModalHeader, ModalTitle, ModalFooter } from '../../bootstrap/Modal';
import Button from '../../bootstrap/Button';
import Spinner from '../../bootstrap/Spinner';

const QuestionModal = ({ open, onClose, onConfirm, onCancel, loading, title, message }) => {
  return (
    <Modal
      id={'modal-delete-products'}
      titleId={'Exclusão de Produtos'}
      isOpen={open}
      setIsOpen={onClose}
      isStaticBackdrop={true}
      isScrollable={false}
      isCentered={true}
      size="lg"
      isAnimation={true}
    >
      <ModalHeader>
        <ModalTitle id="delete-products">{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>{message}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          icon="cancel"
          rounded={1}
          onClick={() => {
            if(onCancel) onCancel();
            onClose();
          }}  
          shadow="sm"
          hoverShadow="sm"
          size="sm"
        >
          Cancelar
        </Button>
        {loading ? (
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
            onClick={() => {
              if(onConfirm) onConfirm();
              onClose();
            }}
          >
            Confirmar
          </Button>
        )}</ModalFooter>
    </Modal>
  )
}

export default memo(QuestionModal);
