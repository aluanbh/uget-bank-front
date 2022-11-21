import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Chat, { ChatGroup, ChatHeader, ChatListItem } from '../../../components/Chat';
import Button from '../../../components/bootstrap/Button';
import { demoPages } from '../../../menu';
import SubHeader, {
  SubHeaderLeft,
  SubHeaderRight,
  SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import CommonChatStatus from '../../../components/CommonChatStatus';
import { useNavigate } from 'react-router-dom';
import OffCanvas, { OffCanvasBody, OffCanvasHeader } from '../../../components/bootstrap/OffCanvas';
import InputGroup from '../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTitle,
} from '../../../components/bootstrap/Card';
import ReactWhatsapp from 'react-whatsapp';


const zapzap = () => {
  return (
    <ReactWhatsapp number="+5538999795639" message="Olá Uget, preciso falar com vocês!!!" />
  );
};


const ContactUs = () => {




  return (
    <PageWrapper title={demoPages.contactUs.text}>
      <Page>
        <div className='col d-flex align-items-center justify-content-center'>
          <div className='col-md-8'>
            <Card stretch>
              <CardHeader className="mt-3">
                <CardLabel className="col d-flex align-items-center justify-content-center" icon='ContactSupport' iconColor='danger'>
                  <CardTitle className="h1 d-flex">Fale Conosco</CardTitle>
                </CardLabel>
              </CardHeader>
              <CardBody>
                <div id='first' className='row scroll-margin mt-3'>
                  <div className='col-md-4'>
                    <Card>
                      <CardBody>
                        <div className='row pt-5 g-4 text-center'>
                          <div className='col-12'>
                            <Icon icon='WhereToVote' size='7x' color='info' />
                          </div>
                          <div className='col-12'>
                            <h2>Endereço:</h2>
                          </div>

                          <div className='col-12'>
                            <div className='lead'>
                              Rua Lorem Ipsum, nº 0
                            </div>
                            <div className='lead'>
                              Cidade: São Paulo - SP
                            </div>
                            <div className='lead'>
                              CEP : 00000-000, Brasil
                            </div>
                          </div>
                          <div className='col-12'>
                            <Button
                              color='info'
                              isLight
                              className='w-100 py-3 text-uppercase'
                              size='lg'>
                              Mostrar no Mapa
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  <div className='col-md-4'>
                    <Card>
                      <CardBody>
                        <div className='row pt-5 g-4 text-center'>
                          <div className='col-12'>
                            <Icon icon='AccessTime' size='7x' color='warning' />
                          </div>
                          <div className='col-12'>
                            <h2>Horários:</h2>
                          </div>

                          <div className='col-12'>
                            <div className='lead'>
                              Segundas a Sextas:
                            </div>
                            <div className='lead'>
                              8:00 às 18:00
                            </div>
                            <div className='lead'>
                              Sábados: 8:00 às 12:00
                            </div>

                          </div>
                          <div className='col-12'>
                            <Button
                              color='warning'
                              isLight
                              className='w-100 py-3 text-uppercase'
                              size='lg'>
                              Enviar E-mail
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  <div className='col-md-4'>
                    <Card>
                      <CardBody>
                        <div className='row pt-5 g-4 text-center'>
                          <div className='col-12'>
                            <Icon icon='Phone' size='7x' color='success' />
                          </div>
                          <div className='col-12'>
                            <h2>Telefones:</h2>
                          </div>
                          <div className='col-12'>
                            <div className='lead'>
                              <Icon icon='ContactPhone' color='success' /> (11) 2222-4444
                            </div>
                            <div className='lead'>
                              <Icon icon='PhonelinkRing' color='success' />(11) 99999-9999
                            </div>
                            <div className='lead'>
                              <Icon icon='PermPhoneMsg' color='success' />   (38) 97979-9797
                            </div>
                          </div>

                          <div className='col-12'>

                            <Button
                              color='success'
                              isLight
                              className='w-100 py-3 text-uppercase'
                              size='lg'
                              onClick={zapzap}
                            >

                              Abrir Whatsapp
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Page>
    </PageWrapper >
  );
};

export default ContactUs;
