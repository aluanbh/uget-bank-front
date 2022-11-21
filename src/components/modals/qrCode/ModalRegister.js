import React, { useState, useEffect, useContext, useCallback } from 'react';
import Button from '../../bootstrap/Button';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../bootstrap/Modal';
import showNotification from '../../extras/showNotification';
import QRCode from 'qrcode.react';
import { formataStringDate } from '../../../utils/formatDate';
import Money from '../../../helpers/utils/money/money';
import Pdf from 'react-to-pdf';

const ModalQrCode = ({
  establishment,
  typePix,
  open,
  setIsOpen,
  setIsClose,
  due_date,
  total_ammount_immediate,
  total_ammount_billing,
  due_date_billing,
  pixResponseData
}) => {

  const codigo_pix = pixResponseData?.instantPayment?.textContent;
  const ref = React.createRef();
  const transaction_id = pixResponseData?.transactionId

  return (
    <Modal
      id={'modal-register-pix'}
      titleId={'Codigo QR PIX para pagamento'}
      isOpen={open}
      setIsOpen={setIsOpen}
      isStaticBackdrop={true}
      isScrollable={false}
      isCentered={true}
      size="lg" // 'sm' || 'lg' || 'xl' 
      isAnimation={true}
    // onSubmit={formik.handleSubmit}
    >
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="register-establishment">{due_date == '' ? 'CHAVE PIX PARA PAGAMENTO IMEDIATO' : 'CHAVE PIX PARA PAGAMENTO COBRANÇA'}</ModalTitle>
      </ModalHeader>
      <ModalBody ref={ref}>
        <div>
          <div className='row m-0 mb-3 p-0'>
            <div className='text-center'>
              <p className='text-center' style={{ fontSize: '1.5em' }}>

                PAGAR <strong>  {typePix === 'immediate' ? total_ammount_immediate : total_ammount_billing} </strong>, para o estabelecimento: <strong>{establishment?.social_name}</strong> via PIX.
              </p>
            </div>
          </div>
          <div className='row m-0 mb-3 p-0'>
            <div className='text-center'>
              <p className='text-center' style={{ fontSize: '1em' }}>
                {due_date === '' ? 'Para pagamento imediato, utilize o QR code abaixo para realizar o pagamento.' : 'Para pagamento de cobrança, utilize o QR code abaixo para realizar o pagamento.'}
              </p>
            </div>
          </div>

          <div className='row m-0 mb-3 p-0'>
            <div className='col-sm-12 col-md-3  col-xl-3 text-center '>
              <figure className='figure' style={{ maxWidth: '200px' }}>
                <QRCode value={codigo_pix} renderAs="canvas" size={160} />
              </figure>
              <div className='text-center'>
                <Button
                  type='submit'
                  color='success'
                  icon="ContentCopy"
                  rounded={1}
                  hoverShadow="sm"
                  shadow="sm"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(codigo_pix);
                    showNotification('success', 'Código copiado para a área de transferência!');
                  }
                  }
                >
                  COPIAR CÓDIGO QR PARA PAGAMENTO
                </Button>
              </div>
            </div>
            <div className='col-sm-12 col-md-9  col-xl-9'>
              <div className=' mt-3'>
                <h5 className='mb-0 fw-bold'>Como funciona?</h5>
                <p className='mb-0 '>
                  <strong>1.</strong> Abra o aplicativo de seu banco.
                </p>
                <p className='mb-0 '>
                  <strong>2.</strong> Escoha pagar via PIX.
                </p>
                <p className='mb-0 '>
                  <strong>3.</strong> Escaneie o QR code no seu aplicativo de pagamento ou copie e cole o código de pagamento.
                </p>
                <p className='mb-0 '>
                  <strong>4.</strong> Após o pagamento, o estabelecimento poderá confirmar o pagamento.
                </p>
              </div>
              <p className='text-break mt-3'>{codigo_pix}</p>
              <div className='d-flex flex-row justify-content-evenly  m-0 mb-3 p-0'>
                <Pdf targetRef={ref} filename="pix_pagamento.pdf">
                  {({ toPdf }) => <Button
                    className='col-5'
                    type='submit'
                    color='success'
                    icon="PictureAsPdf"
                    rounded={1}
                    hoverShadow="sm"
                    shadow="sm"
                    size="sm"
                    onClick={toPdf}
                  >
                    GERAR PDF
                  </Button>}
                </Pdf>

                <Button
                  className='col-5'
                  type='submit'
                  color='success'
                  icon="Share"
                  rounded={1}
                  hoverShadow="sm"
                  shadow="sm"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(codigo_pix);
                    showNotification('success', 'Código copiado para a área de transferência!');
                  }
                  }
                >
                  COMPARTILHAR
                </Button>

              </div>
            </div>
          </div>
          <div className='row m-0 mb-3 p-0'>
            <div >
              <hr />
              <p style={{ fontSize: '1em' }}>
                <strong>Identificador: </strong><br /> {transaction_id}
              </p>
              <hr />
              <p className='text-center' style={{ fontSize: '1em' }}>
                <strong>Atenção:</strong> O estabelecimento não poderá confirmar o pagamento até que o valor do pagamento seja confirmado.
              </p>

            </div>
          </div>

        </div>
      </ModalBody>
    </Modal>
  )
}

export default ModalQrCode;