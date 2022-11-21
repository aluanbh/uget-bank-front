import React, { useState, useEffect, useCallback, useContext } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { demoPages } from '../../../menu';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import masks2, { unmask2 } from '../../../helpers/utils/masks2';
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import ModalPixBilling from '../../../components/modals/qrCodeBilling/ModalRegister';
import { DefaultContext } from '../../../contexts/default';
import Spinner from '../../../components/bootstrap/Spinner';
import swalService from '../../../components/swal'
import api from '../../../services/api';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const PixBilling = () => {
  const [loadingPage, setIsLoadingPage] = useState(false);
  const { establishmentt } = useContext(DefaultContext);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [clients, setClient] = useState([]);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [request, setRequest] = useState('');
  const [description, setDescription] = useState('');
  const [total_ammount_billing, setTotalAmountBilling] = useState('');
  const [due_date_billing, setDueDateBilling] = useState('');
  const [codigoqr, setCodigoqr] = useState('');
  const [openModalQrCode, setOpenModalQrCode] = useState(false);

  const [responsePixDataBilling, setResponsePixDataBilling] = useState(null);

  const [isLoadingBilling, setIsLoadingBilling] = useState(false);
  const [typePix, setTypePix] = useState('');

  useEffect(() => {
    loadKeys();
  }, []);

  async function loadKeys() {

    try {
      const response = await api.get(`/client/search/establishment/${establishmentt.id}`);
      const { data } = response;
      setClient(data);
      // console.log(data);
      setIsLoadingPage(true);
    } catch (error) {
      swalService.error(error.response.data);
    }
  }


  const handleCloseModalQrCode = useCallback(() => {
    setOpenModalQrCode(false);
  }, [])


  const handleOpenModalPixBilling = async () => {
    if (!validateFormBilling())
      return;

    // console.log(total_ammount_billing, due_date_billing)
    setTypePix('billing');
    setIsLoadingBilling(true);

    try {
      const response = await api.post('/pix-totem/generate/billing', {
        establishment_cnpj: establishmentt.cnpj,
        totalAmount: (unmask2(total_ammount_billing) / 100).toString(),
        description: description,
        due_date: due_date_billing,
        days_after_due_date: '0',
        client: {
          id,
          cpf,
          name,
          email,
          phone
        },
        address: {
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
          zip_code
        }
      })
      const { data } = response;
      // console.log('response', response.config.data);
      setRequest(response.config.data);
      console.log('data', data);
      console.log('response', response);
      console.log('config', response.config.data);
      setOpenModalQrCode(true);
      setResponsePixDataBilling(data.data);
      setCodigoqr(data.data.instantPayment.textContent);
      // console.log('codigoqr', codigoqr);
      setIsLoadingBilling(false);
    } catch (error) {
      setIsLoadingBilling(false);
      swalService.error('Serviço indisponível no momento.');
      //swalService.error('Ocorreu um erro ao gerar PIX de Cobrança.\nTente novamente mais tarde!')
    }
  }


  const validateFormBilling = () => {
    if (!total_ammount_billing || !due_date_billing) {
      swalService.error('Preencha todos os campos!')
      return false
    }
    return true
  }


  //MODAL QRCODE PIX COBRANÇA
  const handleOpenModalRegister = useCallback(() => {
    setOpenModalRegister(true);
  }, [])

  const handleCloseModalRegister = useCallback(() => {
    setOpenModalRegister(false);
  }, [])

  const fillFields = (client) => {
    setId(client.id);
    setName(client.name);
    setCpf(client.cpf);
    setEmail(client.email);
    setPhone(client.phone);
    setStreet(client.address[0].street);
    setNumber(client.address[0].number);
    setComplement(client.address[0].complement);
    setNeighborhood(client.address[0].neighborhood);
    setCity(client.address[0].city);
    setState(client.address[0].state);
    setZipCode(client.address[0].zip_code);
  }

  const resetFields = () => {
    setId('');
    setName('');
    setCpf('');
    setEmail('');
    setPhone('');
    setStreet('');
    setNumber('');
    setComplement('');
    setNeighborhood('');
    setCity('');
    setState('');
    setZipCode('');
  }

  const styles = theme => ({
    textField: {
      width: '30%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
    },
    input: {
      color: 'white'
    },
    label: {
      color: 'white'
    }
  });

  return (
    <>
      <PageWrapper title={demoPages.pixBilling.text}>
        <SubHeader>
          <SubHeaderLeft>
            <Breadcrumb
              list={[
                { title: 'PIX Cobrança' },

              ]}
            />
          </SubHeaderLeft>

        </SubHeader>
        <Page container="fluid">

          <div className='col d-flex justify-content-center'>
            <div className="col-sm-12 col-md-12 col-xl-6 col-xxl-6">
              <div className="col-xxl-12" >
                <Card >
                  <CardHeader>
                    <CardLabel icon='Money' iconColor='success'>
                      <CardTitle tag='h4' className='h5'>
                        PIX Cobrança
                      </CardTitle>
                      <CardSubTitle>Gere PIX de cobrança para pagamento posterior</CardSubTitle>
                    </CardLabel>
                  </CardHeader>
                  <CardBody >

                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6'>
                        <FormGroup
                          id="name"
                          isFloating
                          //label="Cliente"
                          InputLabelProps={{
                            className: 'form-label',
                            style: {
                              color: 'white',
                              opacity: '0.5',
                              transform: 'unset'
                            }
                          }}
                        >
                          <Autocomplete
                            id="nome"
                            options={clients}
                            freeSolo
                            getOptionLabel={(option) => option.name}
                            style={{ borderRadius: '1rem' }}
                            className='w-100'
                            onChange={(event, value) => {
                              if (value) {
                                fillFields(value)
                              } else {
                                resetFields()
                              }
                            }}
                            renderInput={(params) =>
                              <>
                                <TextField
                                  {...params}
                                  onAbort={e => console.log(e)}
                                  label="Cliente"
                                  value={name}
                                  onChange={e => setName(e.target.value)}
                                  InputProps={{
                                    ...params.InputProps,
                                    className: 'form-control form-label',
                                    style: {
                                      height: 'calc(3.5rem + 2px)',
                                      lineHeight: '1.25',
                                      padding: '1rem 1rem',
                                      borderRadius: '1rem',
                                      paddingTop: '1.625rem',
                                      paddingBottom: '0.625rem',
                                      border: 'none',
                                      outline: 'none',
                                      color: '#323232',
                                      fontWeight: 600,
                                      fontSize: '1rem',
                                      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                                    },
                                    outline: 'none',
                                    sx: {
                                      "*": {
                                        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                          border: "1px solid white",
                                          borderRadius: '1rem',
                                          outline: 'none'
                                        },
                                      },
                                      "*:focus": {
                                        border: "1px solid white",
                                        borderRadius: '1rem',
                                        outline: 'none',
                                        InputLabelProps: {
                                          style: {
                                            color: 'red',
                                            padding: '0.3rem 1rem',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            opacity: '0.5',
                                            transform: 'unset',
                                            border: 'none',
                                            outline: 'none',
                                          }
                                        }
                                      },
                                      "*:before": {
                                        boxSizing: "border-box",
                                      },
                                      "*:after": {
                                        boxSizing: "border-box",
                                      },
                                      "input:focus-visible": {
                                        outlineOffset: '0px'
                                      },
                                      "&:hover": {
                                        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                          border: "1px solid white",
                                          borderRadius: '1rem',
                                          outline: 'none'
                                        },
                                      },
                                    }
                                  }}
                                  InputLabelProps={{
                                    className: 'form-label form-control',
                                    style: {
                                      color: '#323232',
                                      padding: '0.3rem 1rem 0rem 1rem',
                                      fontSize: '0.9rem',
                                      opacity: '0.6',
                                      transform: 'unset',
                                    },
                                  }}
                                />
                              </>
                            }
                          />
                        </FormGroup>
                      </div>

                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6"'>
                        <FormGroup
                          id='email'
                          isFloating
                          label='E-mail'>
                          <Input
                            type='email'
                            autoComplete='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6"'>
                        <FormGroup
                          id='telefone'
                          isFloating
                          label='Telefone'>
                          <Input
                            autoComplete='phone'
                            value={phone}
                            onChange={e => setPhone(masks2.phone(e.target.value))}
                          />
                        </FormGroup>
                      </div>
                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6"'>
                        <FormGroup
                          id='cpfCnpj'
                          isFloating
                          label='CPF'>
                          <Input
                            autoComplete='cpf'
                            value={cpf}
                            onChange={e => setCpf(masks2.cpf(e.target.value))}
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-sm-12 mt-2 col-md-3 col-xl-3 col-xxl-3"'>
                        <FormGroup
                          id='cep'
                          isFloating
                          label='CEP'>
                          <Input
                            autoComplete='cep'
                            value={zip_code}
                            onChange={e => setZipCode(masks2.cep(e.target.value))}
                          />
                        </FormGroup>
                      </div>
                      <div className='col-sm-12 mt-2 col-md-5 col-xl-5 col-xxl-5"'>
                        <FormGroup
                          id='city'
                          isFloating
                          label='Cidade'>
                          <Input
                            autoComplete='city'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                      <div className='col-sm-12 mt-2 col-md-4 col-xl-4 col-xxl-4"'>
                        <FormGroup
                          id='state'
                          isFloating
                          label='Estado'>
                          <Input
                            autoComplete='state'
                            value={state}
                            onChange={e => setState(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-sm-12 mt-2 col-md-8 col-xl-8 col-xxl-8"'>
                        <FormGroup
                          id='street'
                          isFloating
                          label='Logradouro'>
                          <Input
                            autoComplete='street'
                            value={street}
                            onChange={e => setStreet(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                      <div className='col-sm-12 mt-2 col-md-4 col-xl-4 col-xxl-4"'>
                        <FormGroup
                          id='number'
                          isFloating
                          label='Número'>
                          <Input
                            autoComplete='number'
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-sm-12 mt-2 col-md-8 col-xl-8 col-xxl-8"'>
                        <FormGroup
                          id='neighborhood'
                          isFloating
                          label='Bairro'>
                          <Input
                            autoComplete='neighborhood'
                            value={neighborhood}
                            onChange={e => setNeighborhood(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                      <div className='col-sm-12 mt-2 col-md-4 col-xl-4 col-xxl-4"'>
                        <FormGroup
                          id='complement'
                          isFloating
                          label='Complemento'>
                          <Input
                            autoComplete='complement'
                            value={complement}
                            onChange={e => setComplement(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6"'>
                        <FormGroup
                          id='due_date'
                          isFloating
                          disabled={true}
                          label='Vencimento'>
                          <Input
                            type='date'
                            autoComplete='due_date'
                            value={due_date_billing}
                            onChange={e => setDueDateBilling(e.target.value)}
                          />
                        </FormGroup>
                      </div>

                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6"'>
                        <FormGroup
                          id='total_ammount'
                          isFloating
                          label='Valor'>
                          <Input
                            type='text'
                            autoComplete='total_ammount'
                            value={total_ammount_billing}
                            onChange={e => setTotalAmountBilling(masks2.moneyMasks(e.target.value))}
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-12'>
                        <FormGroup
                          id='description'
                          // isFloating
                          label='Descrição da Fatura'>
                          <Textarea
                            value={description}
                            rows={6}
                            onChange={e => setDescription(e.target.value)}
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <div className='col-12'>
                      {isLoadingBilling ? (
                        <Button
                          color='success'
                          className='rounded-1 w-100'
                          size='lg'
                          disabled={true}
                        >
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
                          Gerando PIX de Cobrança...
                        </Button>
                      ) : (
                        <Button
                          color='success'
                          className='rounded-1 w-100'
                          size='lg'
                          onClick={handleOpenModalPixBilling}
                        >
                          Gerar Pix Cobrança
                        </Button>
                      )
                      }
                    </div>

                  </CardBody>
                </Card>
              </div>
            </div>

          </div>
        </Page>
      </PageWrapper>

      {responsePixDataBilling &&
        <ModalPixBilling
          establishment={establishmentt}
          typePix={typePix}
          codigoqr={codigoqr}
          request={request}
          total_ammount_billing={total_ammount_billing}
          due_date_billing={due_date_billing}
          pixResponseData={responsePixDataBilling}

          open={openModalQrCode}
          setIsOpen={setOpenModalQrCode}
          setIsClose={handleCloseModalQrCode}
        />
      }

    </>
  );
};

export default PixBilling;
