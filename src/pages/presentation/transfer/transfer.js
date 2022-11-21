import React, { useState, useEffect, useMemo, useContext, useCallback } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import useDarkMode from '../../../hooks/useDarkMode';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { demoPages } from '../../../menu';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Spinner from '../../../components/bootstrap/Spinner';
import masks, { unmask } from '../../../helpers/utils/masks';
import { DefaultContext } from '../../../contexts/default';
import api from '../../../services/api';
import swalService from '../../../components/swal'
import { moneyMask } from '../../../helpers/utils/money/moneyMask';
import classNames from 'classnames';
import masks2 from '../../../helpers/utils/masks2';




const Transfer = () => {
  const { establishmentt } = useContext(DefaultContext)
  const { themeStatus, darkModeStatus } = useDarkMode()

  const [isLoading, setIsLoading] = useState(false);
  const [cnpj_destination, setCnpjDestination] = useState('')
  const [bank_destination, setBankDestination] = useState('')
  const [account_destination, setAccountDestination] = useState('')
  const [branch_destination, setBranchDestination] = useState('');
  const [total_amount, setTotalAmount] = useState('');
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState();
  const [account, setAccount] = useState();
  const [extract, setExtract] = useState([]);
  const [loadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const response = await api.get(`/dashboard/report/${establishmentt?.cnpj}`);

    const { data } = response;

    setBalance(data.balance);
    setAccount(data.accountData);
    setExtract(data.extractDay);
    setLoading(true);
    setIsLoadingPage(true);
  }
  //converter saldo para string e aplicar mascara de dinheiro
  // const saldo = balance?.availableBalanceForTransactions.toString();
  // const saldoFinal = masks2.moneyMasks(saldo);
  // console.log(saldoFinal)


  // console.log(Money(availableBalanceForTransactions).formatToBRL())

  const handleWithdraw = async () => {
    if (validateForm()) {

      if (!cnpj_destination || !bank_destination || !account_destination || !total_amount) {
        return
      }
      setIsLoading(true);
      try {

        await api.post('/balance/tedCashOut', {
          from_establishment_cnpj: unmask(establishmentt?.cnpj),
          total_ammount: unmask(total_amount),
          bank_destination: bank_destination,
          account_destination: account_destination,
          branch_destination: branch_destination,
          cnpj_destination: unmask(cnpj_destination)
        })
        swalService.success('Tudo certo', 'Saque realizado com sucesso')

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        swalService.error('Erro ao efetuar Saque');
      }
    }
  }
  const validateForm = () => {
    if (cnpj_destination === '') {
      swalService.error('Erro', 'Preencha o CNPJ do destinatário');
      return false;
    }
    if (cnpj_destination.length !== 18) {
      swalService.error('Erro', 'Preencha o campo CNPJ corretamente');
      return false;
    }
    if (bank_destination === '') {
      swalService.error('Erro', 'Preencha o banco do destinatário');
      return false;
    }
    if (account_destination === '') {
      swalService.error('Erro', 'Preencha o número da conta do destinatário');
      return false;
    }
    if (branch_destination === '') {
      swalService.error('Erro', 'Preencha o número da agência do destinatário');
      return false;
    }
    if (total_amount === '') {
      swalService.error('Erro', 'Preencha o valor do saque');
      return false;
    }
    // if (total_amount.length < 100) {
    //   swalService.error('Erro', 'Preencha o valor do saque corretamente');
    //   return false;
    // }
    return true;
  }



  return (
    loadingPage ? (
      <>
        <PageWrapper title={demoPages.transfer.text}>
          <SubHeader>
            <SubHeaderLeft>
              <Breadcrumb
                list={[
                  { title: 'Transferência' },

                ]}
              />
            </SubHeaderLeft>
            <SubHeaderRight className='py-1'>
              <div className='d-flex flex-column justify-content-center align-items-center px-5 py-1'>
                <h6 className='fw-bold px-5'>SALDO ATUAL</h6>
                <h6 className='fw-bold'>{balance?.availableBalanceForTransactions.toFixed(2)} </h6>
              </div>

            </SubHeaderRight>
          </SubHeader>
          <Page container="fluid">

            <div className='col d-flex justify-content-center'>
              <div className='col-sm-12 col-md-12 col-xl-6 col-xxl-6'>
                <Card>
                  <CardHeader className="mb-0 py-0 mt-2">
                    <CardLabel className="mb-0 py-0" icon='Money' iconColor='success'>
                      <CardTitle tag='h4' className='h5  mb-0 py-0'>
                        Transferência TED
                      </CardTitle>
                      <CardSubTitle> Valor disponivel: <strong> {masks2.moneyMasks((balance?.availableBalanceForTransactions).toString())}</strong></CardSubTitle>
                    </CardLabel>
                  </CardHeader>
                  <CardBody className='pt-0'>
                    <div className='row m-0 mb-3 p-0'>
                      <p>
                        Insira os dados bancarios para transferência da mesma titularidade
                      </p>
                      <div className='col-12'>
                        <p className='mb-0'>
                          Razão social: {account?.corporateName}
                        </p>
                        <p>
                          CNPJ: {account?.cnpj}
                        </p>
                      </div>
                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6'>
                        <FormGroup
                          id='bank_destination'
                          isFloating
                          label='Banco'>
                          <Select
                            id="tipos"
                            list={[
                              {
                                text: 'Bando do Brasil',
                                value: 1
                              },
                              {
                                text: 'Itaú',
                                value: 2
                              },
                              {
                                text: 'Bradesco',
                                value: 3
                              },
                            ]}
                            onBlur={function noRefCheck() { }}
                            onChange={function noRefCheck() { }}
                            onFocus={function noRefCheck() { }}
                            onInput={function noRefCheck() { }}
                            onInvalid={function noRefCheck() { }}
                            onSelect={function noRefCheck() { }}
                            value=""
                          />
                        </FormGroup>
                      </div>
                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6'>
                        <FormGroup
                          id='type_account'
                          isFloating
                          label='Tipo de Conta'>
                          <Select
                            id="tipos"
                            list={[
                              {
                                text: 'Conta Corrente',
                                value: 1
                              },
                              {
                                text: 'Conta Poupança',
                                value: 2
                              },
                              {
                                text: 'Conta Salário',
                                value: 3
                              },
                            ]}
                            onBlur={function noRefCheck() { }}
                            onChange={function noRefCheck() { }}
                            onFocus={function noRefCheck() { }}
                            onInput={function noRefCheck() { }}
                            onInvalid={function noRefCheck() { }}
                            onSelect={function noRefCheck() { }}
                            value=""
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6'>
                        <FormGroup
                          id='agency_destination'
                          isFloating
                          label='Agência'>
                          <Input
                            type='number'
                            autoComplete='agency_destination'
                            placeholder='Agência'
                          />
                        </FormGroup>
                      </div>
                      <div className='col-sm-12 mt-2 col-md-6 col-xl-6 col-xxl-6'>
                        <FormGroup
                          id='account_destination'
                          isFloating
                          label='Conta Corrente'>
                          <Input
                            type='number'
                            autoComplete='account_destination'
                            placeholder='Conta Corrente'
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-sm-12  mt-2'>
                        <FormGroup
                          id='total_ammount'
                          isFloating
                          label='Valor do Saque'>
                          <Input
                            type='text'
                            autoComplete='total_ammount'
                            value={total_amount}
                            onChange={e => setTotalAmount(moneyMask(e.target.value))}
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className='col-12 '>
                      {isLoading ? (
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
                          onClick={handleWithdraw}
                        >
                          Efetuar Saque
                        </Button>
                      )
                      }


                    </div>

                  </CardBody>
                </Card>
              </div>
            </div>
          </Page>
        </PageWrapper>


      </>
    ) : (
      <div className='col' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size={'10em'} isGrow='true' color="warning">
          Loading...
        </Spinner>
      </div>
    )
  );
};

export default Transfer;
