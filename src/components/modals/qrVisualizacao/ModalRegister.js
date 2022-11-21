import React, { useState, useEffect, useContext, useCallback } from 'react';
import Button from '../../bootstrap/Button';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../bootstrap/Modal';
import showNotification from '../../extras/showNotification';
import QRCode from 'qrcode.react';
import { formataStringDate } from '../../../utils/formatDate';
import masks2, { unmask2 } from '../../../helpers/utils/masks2';
import Pdf from 'react-to-pdf';
import Logo from '../../../components/Logo';
import { DefaultContext } from '../../../contexts/default';
import Spinner from '../../../components/bootstrap/Spinner';
import api from '../../../services/api';

const ModalQrCode = ({
  establishment,
  open,
  setIsOpen,
  pixResponseData,
  loadingInfo,
  client
}) => {
  // console.log('pixResponseData', pixResponseData)
  const { establishmentt } = useContext(DefaultContext);
  const type = pixResponseData.transaction_type;
  const codigo_pix = pixResponseData?.qr_code;
  const amount = pixResponseData?.amount;
  const due_date = new Date(pixResponseData?.due_date).toLocaleDateString('pt-BR');
  const ref = React.createRef();
  const transaction_id = pixResponseData?.transaction_id;
  const dataformatada = new Date(pixResponseData.date).toLocaleDateString('pt-BR');
  const mesExtenso = new Date(pixResponseData.created_at).toLocaleString('pt-BR', { month: 'long' });
  const carregou = loadingInfo;
  const [clients, setClients] = useState([]);
  // console.log(pixResponseData)





  useEffect(() => {
    loadKeys();
  }, []);

  async function loadKeys() {

    try {
      const response = await api.get(`/client/list/establishment/${establishmentt.id}`);
      const { data } = response;
      setClients(data);
      // console.log(data);
    } catch (error) {
      console.log(error)
    }
  }






  return (
    carregou ? (

      <>
        {type === 'Pix-immediate' ?
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
          >
            <ModalHeader setIsOpen={setIsOpen}>
              <ModalTitle id="register-pix">{type === 'Pix-immediate' ? 'CHAVE PIX PARA PAGAMENTO IMEDIATO' : 'CHAVE PIX PARA PAGAMENTO COBRANÇA'}</ModalTitle>
            </ModalHeader>
            <ModalBody ref={ref}>
              <div>
                <div className='row m-0 mb-3 p-0'>
                  <div className='text-center'>
                    <p className='text-center' style={{ fontSize: '1.5em' }}>

                      PAGAR <strong> R$ {parseFloat(amount).toFixed(2).replace('.', ',')} </strong> para o estabelecimento: <br></br><strong>{establishment?.social_name}</strong> via PIX.
                    </p>
                  </div>
                </div>
                <div className='row m-0 mb-3 p-0'>
                  <div className='text-center'>
                    <p className='text-center' style={{ fontSize: '1em' }}>
                      {type === 'Pix-immediate' ? 'Para pagamento imediato, utilize o QR code abaixo para realizar o pagamento.' : 'Para pagamento de cobrança, utilize o QR code abaixo para realizar o pagamento.'}
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
          :

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
            </ModalHeader>
            <ModalBody ref={ref}>
              <div >
                <div className="flex-column">
                  {/********* DADOS DO SACADO ***********/}
                  <div className="d-flex flex-row justify-content-between  m-0 mb-3 p-0">
                    <div className='col-2 px-0 d-flex align-items-center justify-content-center'>
                      <Logo width='100%' black />
                    </div>
                    <div className='col-7 border border-2 border-dark rounded-3 py-2 px-5'>
                      <h5 className='mb-0 fw-bold'> Dados do Sacado</h5>
                      <div className='row m-0 p-0'>
                        <div className='col-6 px-0'>
                          <p className='mb-0 ' style={{ fontSize: '9px' }}>Nome: {pixResponseData?.transactions_establishments_clients[0]?.clients?.name}</p>
                          <p className='mb-0 ' style={{ fontSize: '9px' }}>Endereço: { } </p>
                          <p className='mb-0 ' style={{ fontSize: '9px' }}>Código do cliente: {pixResponseData?.transactions_establishments_clients[0]?.clients.id}</p>
                        </div>
                        <div className='col-6 d-flex flex-column justify-content-end px-0'>
                          <p className='mb-0 ' style={{ fontSize: '9px' }}>MÊS REFERÊNCIA: {mesExtenso.toUpperCase()}</p>
                          <p className='mb-0 ' style={{ fontSize: '9px' }}>TELEFONE: {masks2.phone(pixResponseData?.transactions_establishments_clients[0]?.clients.phone)}</p>
                          <p className='mb-0 ' style={{ fontSize: '9px' }}>DATA DE EMISSÃO: {dataformatada}</p>
                        </div>
                      </div>
                    </div>
                    <div className='col-2 d-flex flex-column justify-content-evenly border border-2 border-dark rounded-3 px-0'>
                      <p className='mb-0 text-center' style={{ fontSize: '9px' }}>DATA DO VENCIMENTO:</p>
                      <p className='mb-0  text-center fw-bold '>{due_date}</p>
                      <div className='m-0 my-1 text-center border border-dark border-1'></div>
                      {/* <hr className='m-0 my-1 text-center border border-dark border-2 ' /> */}
                      <p className='mb-0 text-center' style={{ fontSize: '9px' }}>VALOR:</p>
                      <p className='mb-0 text-center fw-bold'>R$ {parseFloat(amount).toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>

                  {/********* DADOS DO CEDENTE ***********/}
                  <div className="col m-0 mb-3 p-0 border border-2 border-dark rounded-3 py-2 px-5">
                    <h5 className='mb-0 fw-bold'> Dados do Cedente</h5>
                    <div className='row m-0 p-0'>
                      <div className='col-6 px-0'>
                        <p className='mb-0 ' style={{ fontSize: '9px' }}>Razão Social: {establishmentt?.social_name}</p>
                        <p className='mb-0 ' style={{ fontSize: '9px' }}>CNPJ: {masks2.cpfCnpj(establishmentt?.cnpj)}</p>
                        <p className='mb-0 ' style={{ fontSize: '9px' }}>Incrição Estadual:</p>
                        <p className='mb-0 ' style={{ fontSize: '9px' }}>Site</p>
                      </div>
                      <div className='col-6 d-flex flex-column justify-content-end px-0'>
                        <p className='mb-0 ' style={{ fontSize: '9px' }}>Logradouro: {establishmentt?.address[0].street}</p>
                        <p className='mb-0 ' style={{ fontSize: '9px' }}>Bairro: {establishmentt?.address[0].neighborhood}</p>
                        <p className='mb-0 ' style={{ fontSize: '9px' }}>Cidade / Estado: {establishmentt?.address[0].city} - {establishmentt?.address[0].state}</p>
                        <p className='mb-0 ' style={{ fontSize: '9px' }}>CEP: {masks2.cep(establishmentt?.address[0].zip_code)}</p>
                      </div>
                    </div>
                  </div>

                  {/********* DESCRIÇÃO DA FATURA ***********/}
                  <div className="col m-0 mb-3 p-0 border border-2 border-dark rounded-3 py-2 px-5">
                    <h5 className='mb-0 fw-bold'> Descrição da sua fatura</h5>
                    <div className='row m-0 p-0'>
                      <p className='mb-0 ' style={{ fontSize: '9px' }}>Descrição detalhada: {pixResponseData?.description}</p>
                    </div>
                  </div>

                  {/********* REGRAS DO PAGAMENTO ***********/}
                  <div className="col m-0 mb-3 p-0 lh-1" style={{ fontSize: '9px' }}>
                    <p>Importante: mantenha o pagamento em dia e evite a suspensão parcial/total
                      dos serviços e a inclusão nos orgãos de proteção do crédito. Para pagamentos
                      após o vencimento serão cobrados encargos de 2% e juros de 1% ao mês em conta
                      futura. O ressarcimento por inoperância é realizado em conformidade com as
                      Resoluções: Para STFC artigo 32° da Resolução Anatel n° 426/2005: para SCM
                      artigo 46° da Resolução Anatel n° 614/2013 e para TV artigo 6° da Resolução
                      488/2007. Central de Atendimento Anatel: 1331 (Geral), 1332 (Deficientes Auditivos)
                      e www.anatel.gov.br.
                    </p>
                  </div>

                  {/********* QR CODE / INSTRUÇÕES ***********/}
                  <div className='row m-0 mb-3 p-0'>
                    <div className='col-sm-12 col-md-3 mt-3  col-xl-3 text-center '>
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
                        <Pdf targetRef={ref} filename="cobrança_pix.pdf">
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
                      {/* <p className='text-center' style={{ fontSize: '1em' }}>
                  {typePix === 'billing' && (
                    <><strong>Data de Vencimento:</strong><br />  {formataStringDate(due_date_billing)}</>
                  )}

                </p> */}
                      <hr />
                      <p className='text-center' style={{ fontSize: '1em' }}>
                        <strong>Atenção:</strong> O estabelecimento não poderá confirmar o pagamento até que o valor do pagamento seja confirmado.
                      </p>

                    </div>
                  </div>

                </div>
              </div>
            </ModalBody>
          </Modal>
        }
      </>
    ) : (
      <div className='col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size={'10em'} isGrow='true' color="warning">
          Loading...
        </Spinner>
      </div>
    )
  )
}

export default ModalQrCode;