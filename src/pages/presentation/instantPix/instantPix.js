import React, { useState, useCallback, useContext } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { demoPages } from '../../../menu';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Money from '../../../helpers/utils/money/money';
import { moneyMask } from '../../../helpers/utils/money/moneyMask';
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import ModalQrCode from '../../../components/modals/qrCode/ModalRegister';
import { DefaultContext } from '../../../contexts/default';
import Spinner from '../../../components/bootstrap/Spinner';
import swalService from '../../../components/swal'
import api from '../../../services/api';


const InstantPix = () => {

  const { establishmentt } = useContext(DefaultContext)

  const [total_ammount_immediate, setTotalAmountImmediate] = useState('');

  const [total_ammount_billing, setTotalAmountBilling] = useState('');
  const [due_date_billing, setDueDateBilling] = useState('');
  const [days_after_due_date, setDaysAfterDueDate] = useState('');
  const [openModalQrCode, setOpenModalQrCode] = useState(false);

  const [responsePixDataImmediate, setResponsePixDataImmediate] = useState(null);
  const [responsePixDataBilling, setResponsePixDataBilling] = useState(null);

  const [isLoadingImmediate, setIsLoadingImmediate] = useState(false);
  const [isLoadingBilling, setIsLoadingBilling] = useState(false);
  const [typePix, setTypePix] = useState('');

  const handleCloseModalQrCode = useCallback(() => {
    setOpenModalQrCode(false);
  }, [])


  const handleOpenModalPixImmediate = async () => {
    if (validateFormImmediate()) {
      if (!total_ammount_immediate) {
        return
      }
      setTypePix('immediate');
      setIsLoadingImmediate(true);

      try {
        const response = await api.post('/pix-totem/generate/immediate', {
          establishment_cnpj: establishmentt.cnpj,
          totalAmount: total_ammount_immediate.replace('RS ', '').replace(',', '.')
        })
        const { data } = response;

        setOpenModalQrCode(true);
        setResponsePixDataImmediate(data.data)
        setIsLoadingImmediate(false);
      } catch (error) {
        setIsLoadingImmediate(false);
        swalService.error('Erro ao gerar pix Imediato!')
      }

    }
  }


  const handleOpenModalPixBilling = async () => {
    if (validateFormBilling()) {
      if (!total_ammount_billing || !due_date_billing | !days_after_due_date) {
        return
      }

      // console.log(total_ammount_billing, due_date_billing, days_after_due_date)
      setTypePix('billing');
      setIsLoadingBilling(true);

      try {
        const response = await api.post('/pix-totem/generate/immediate', {
          establishment_cnpj: establishmentt.cnpj,
          totalAmount: total_ammount_billing,
          due_date_billing: due_date_billing,
          days_after_due_date: days_after_due_date
        })
        const { data } = response;
        console.log(data)
        console.log(response)
        console.log(data.data)
        setOpenModalQrCode(true);
        setResponsePixDataBilling(data.data)

        setIsLoadingBilling(false);
      } catch (error) {
        setIsLoadingBilling(false);
        swalService.error('Erro ao gerar pix Cobrança!')
      }

    }
  }

  const validateFormImmediate = () => {
    if (!total_ammount_immediate) {
      swalService.error('Preencha o valor total!')
      return false
    }
    return true
  }

  const validateFormBilling = () => {
    if (!total_ammount_billing || !due_date_billing | !days_after_due_date) {
      swalService.error('Preencha todos os campos!')
      return false
    }
    return true
  }






  return (
    <>
      <PageWrapper title={demoPages.instantPix.text}>
        <SubHeader>
          <SubHeaderLeft>
            <Breadcrumb
              list={[
                { title: 'PIX Imediato' },

              ]}
            />
          </SubHeaderLeft>
          <SubHeaderRight>
            <FormGroup id="name" label="" className='col-md-6'>
              <Input
                // onChange={e => setsearch(e.target.value)}
                // value={search}
                placeholder='Buscar'
              />
            </FormGroup>
            <Button
              color='primary'
              icon='plus'
              shadow="sm"
              hoverShadow="sm"
            // onClick={handleOpenModalRegister}
            >
              Cadastrar Cliente
            </Button>

          </SubHeaderRight>

        </SubHeader>
        <Page container="fluid">

          <div className='col d-flex justify-content-center'>
            <div className="col-sm-12 col-md-12 col-xl-6 col-xxl-6">
              <div className="col-xxl-12">
                <Card style={{ marginBottom: '10px' }}>
                  <CardHeader>
                    <CardLabel icon='Money' iconColor='success'>
                      <CardTitle tag='h4' className='h5'>
                        PIX Imediato
                      </CardTitle>
                      <CardSubTitle>Gere PIX de cobrança para pagamento imediato</CardSubTitle>
                    </CardLabel>
                  </CardHeader>
                  <CardBody >
                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-12'>
                        <FormGroup
                          id='total_ammount'
                          isFloating
                          disabled={true}
                          label='Valor'>

                          <Input
                            type='text'
                            autoComplete='total_ammount'
                            value={total_ammount_immediate}
                            onChange={e => setTotalAmountImmediate(moneyMask(e.target.value))}
                          />
                        </FormGroup>
                      </div>
                    </div>

                    <div className='col-12'>
                      {isLoadingImmediate ? (
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
                          Carregando...
                        </Button>
                      ) : (
                        <Button
                          color='success'
                          className='rounded-1 w-100'
                          size='lg'
                          onClick={handleOpenModalPixImmediate}
                        >
                          Gerar Pix Imediato
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

      {responsePixDataImmediate &&
        <ModalQrCode
          establishment={establishmentt}
          typePix={typePix}

          total_ammount_immediate={total_ammount_immediate}
          pixResponseData={responsePixDataImmediate}

          open={openModalQrCode}
          setIsOpen={setOpenModalQrCode}
          setIsClose={handleCloseModalQrCode}
        />
      }

      {responsePixDataBilling &&
        <ModalQrCode
          establishment={establishmentt}
          typePix={typePix}

          total_ammount_billing={total_ammount_billing}
          due_date_billing={due_date_billing}
          days_after_due_date={days_after_due_date}
          pixResponseData={responsePixDataBilling}

          open={openModalQrCode}
          setIsOpen={setOpenModalQrCode}
          setIsClose={handleCloseModalQrCode}
        />
      }

    </>
  );
};

export default InstantPix;
