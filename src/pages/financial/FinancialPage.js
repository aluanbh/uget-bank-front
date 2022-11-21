import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { useFormik } from 'formik';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import useDarkMode from '../../hooks/useDarkMode';
import Card, { CardBody, } from '../../components/bootstrap/Card';
import { DefaultContext } from '../../contexts/default';
import api from '../../services/api';
import moment from 'moment'
import dateFormat from 'dateformat';
import classNames from 'classnames';
import Button from '../../components/bootstrap/Button';
import Icone from '../../components/Icone';
import TableCustom from "../../components/MyCustom/TableCustom";
import Icon from '../../components/icon/Icon';
import Spinner from '../../components/bootstrap/Spinner';
import masks2, { unmask2 } from '../../helpers/utils/masks2';
import ModalPixBilling from '../../components/modals/qrCodeBilling/ModalRegister';
import ModalQrCode from '../../components/modals/qrVisualizacao/ModalRegister';

const FinancialPage = () => {
  const { themeStatus, darkModeStatus } = useDarkMode()
  const { user, establishmentt } = useContext(DefaultContext)
  const [balance, setBalance] = useState();
  const [account, setAccount] = useState();
  const [extract, setExtract] = useState([]);
  const [loadingPage, setIsLoadingPage] = useState(false);
  const [codigoqr, setCodigoqr] = useState('');
  const [openModalQrCode, setOpenModalQrCode] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {

    loadData();
  }, [loadData])


  const loadData = async () => {
    const response = await api.get(`/dashboard/report/${establishmentt?.cnpj}`);

    const { data } = response;
    // console.log(data)
    setBalance(data.balance);
    setAccount(data.accountData);
    setExtract(data.transactionsToday);
    setIsLoadingPage(true);
  }


  //abir modal de qr code para pagamento 
  const handleOpenModalQrCode = useCallback((item) => {
    setCodigoqr(item);
    setLoadingInfo(true);
    setOpenModalQrCode(true);
  }, [])



  const handleCloseModalQrCode = useCallback(() => {
    setOpenModalQrCode(false);
    setLoadingInfo(false);
  }, [])



  const [filterMenu, setFilterMenu] = useState(false);
  const formik = useFormik({
    initialValues: {
      store: '#',
      firstDate: dateFormat(moment().add(-1, 'month').toDate(), 'yyyy-mm-dd'),
      secondDate: dateFormat(new Date(), 'yyyy-mm-dd'),
      unityType: 'Tipo 1',
      region: 'Região 1',
    },
    // eslint-disable-next-line no-unused-vars
    onSubmit: (values) => {
      setFilterMenu(false);
    },
  });



  const columns = useMemo(() => ([
    {
      label: 'Data',
      field: 'entryDate',
      format: row => (
        <>
          {moment(row.date).format('DD-MM-YYYY')}
        </>
      )
    },
    {
      label: 'ID Controle',
      field: 'transaction_id',
    },
    {
      label: 'Tipo',
      field: 'type',
      format: row => (
        <>
          {row.transaction_type === 'Pix-immediate' ? 'Pix Imediato' : 'Pix Cobrança'}
        </>
      )
    },
    {
      label: 'CPF',
      field: 'cpf',
      format: row => (
        <>
          {
            masks2.cpf(row.transactions_establishments_clients[0]?.clients?.cpf)
              ?
              masks2.cpf(row.transactions_establishments_clients[0]?.clients?.cpf)
              :
              '-'
          }
        </>
      )
    },
    {
      label: 'Cliente',
      field: 'customerName',
      format: row => (
        <>
          {
            row.transactions_establishments_clients[0]?.clients?.name
              ?
              row.transactions_establishments_clients[0]?.clients?.name
              :
              '-'
          }
        </>
      )
    },
    {
      label: 'Telefone',
      field: 'phone',
      format: row => (
        <>
          {
            masks2.phone(row.transactions_establishments_clients[0]?.clients?.phone)
              ?
              masks2.phone(row.transactions_establishments_clients[0]?.clients?.phone)
              :
              '-'
          }
        </>
      )
    },
    {
      label: 'E-mail',
      field: 'email',
      format: row => (
        <>
          {
            row.transactions_establishments_clients[0]?.clients?.email
              ?
              row.transactions_establishments_clients[0]?.clients?.email
              :
              '-'
          }
        </>
      )
    },
    {
      label: 'Valor',
      field: 'amount',
      format: row => (
        <>
          R$ {parseFloat(row.amount).toFixed(2)}
        </>
      )

    },
    {
      label: 'Situação',
      field: 'paid',
      format: row => (
        <Button
          isLink
          color={row.paid === true ? 'success' : 'danger'}
          icon='Circle'
          className='text-nowrap'>
          {row.paid === true ? 'Pago' : 'Pedente'}
        </Button>
      )
    },
    {
      label: 'Ações',
      field: 'actions',
      format: row => (
        <div className='d-flex'>
          <Button
            isLink
            color='primary'
            icon='Eye'
            className='text-nowrap'
            onClick={() => handleOpenModalQrCode(row)}
          >
            Visualizar
          </Button>
        </div>
      )
    }

  ]), [handleOpenModalQrCode])

  return (

    loadingPage ? (
      <>

        <PageWrapper title='Resumo da Conta'>
          <Card className='mb-0 responsive'>
            <CardBody>
              <div className='d-flex flex-row align-items-center justify-content-between'>
                <div className='col-10'>
                  <div className='d-flex flex-row align-items-center'>
                    <div className='col-1'>
                      <Icone width={80} black />
                    </div>
                    <div className='col-6 mx-3'>
                      <h5>{establishmentt?.social_name ?? ''} </h5>
                      <h5>AGÊNCIA :  {account?.accountDestination?.branch}</h5>
                      <h5>CONTA :  {account?.accountDestination?.account}</h5>
                      <h5>CHAVE PIX  :  {account?.alias}</h5>
                    </div>
                  </div>
                </div>
                <div className={classNames('d-flex flex-column justify-content-center align-items-center px-5 py-2', {
                  'bg:white':
                    !darkModeStatus,
                  'bg-black':
                    darkModeStatus,
                })}
                  style={{ background: '#EBF1F9', borderRadius: '30px' }}>
                  <h5 className='fw-bold px-5'>SALDO ATUAL</h5>
                  <h5 className='fw-bold'> {balance?.availableBalanceForTransactions.toFixed(2)} </h5>
                </div>
              </div>
            </CardBody>

          </Card>

          <Page container="fluid" className='table-responsive'>
            <h5 className='fw-bold px-5'>TRANSAÇÕES DO DIA </h5>
            {/* <TabGeral /> */}
            <TableCustom
              rows={extract}
              columns={columns}
              keyExtractor={row => row.id}
            />
          </Page>
        </PageWrapper >




        <ModalQrCode
          establishment={establishmentt}
          typePix={codigoqr.transaction_type}
          total_ammount_immediate={codigoqr.amount}
          pixResponseData={codigoqr}
          open={openModalQrCode}
          setIsOpen={setOpenModalQrCode}
          setIsClose={handleCloseModalQrCode}
          loadingInfo={loadingInfo}
        />

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

export default FinancialPage;

