import React, { useMemo, useContext, useEffect, useState } from 'react';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import TableCustom from "../../../components/MyCustom/TableCustom";
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { demoPages } from '../../../menu';
import { DefaultContext } from '../../../contexts/default';
import api from '../../../services/api';
import Icon from '../../../components/icon/Icon';
import Spinner from '../../../components/bootstrap/Spinner';


const Withdrawals = () => {

  const { establishmentt } = useContext(DefaultContext)
  const [loading, setLoading] = useState(false)
  const [extract, setExtract] = useState([]);
  const [error, setError] = useState('');

  async function loadExtract() {
    try {

      const response = await api.get(`/extract/establishment/${establishmentt.cnpj}`);

      const { data } = response;

      // console.log(data);

      setExtract(data);
      setLoading(true);
    } catch (error) {
      setError(error.response.data);
    }
  }
  useEffect(() => {
    loadExtract()
  }, []);

  const columns = useMemo(() => ([
    {
      label: 'Data',
      field: 'entryDate',
      format: row => (
        <>

          {row.entryDate.replace('T', ' - ').replace('-03:00', '')}
        </>
      )
    },
    {
      label: 'Id Transação',
      field: 'transactionId',
    },
    {
      label: 'Conta Bancária',
      field: 'bankAccount',
    },
    {
      label: 'Instituição',
      field: 'institution',
    },
    {
      label: 'Tarifa',
      field: 'fee',
      format: row => (
        <>
          R$ {row.amount.toFixed(2)}
        </>
      )
    },
    {
      label: 'Valor',
      field: 'amount',
      format: row => (
        <>
          R$ {row.amount.toFixed(2)}
        </>
      )
    },
    {
      label: 'Situação',
      field: 'status',
      format: row => (
        <Button
          isLink
          color={'success'}
          icon='Circle'
          className='text-nowrap'>
          {'Concluido'}
        </Button>
      )
    },

  ]), [])
  // console.log('loading', loading);

  return (
    loading == true ? (
      <>
        <PageWrapper title={demoPages.withdrawals.text}>
          <Page container='fluid'>
            <Card stretch>
              <CardHeader>
                <CardLabel icon='EventNote' iconColor='light'>
                  <CardTitle>Extratos Transferências - {establishmentt?.fantasy_name}</CardTitle>
                </CardLabel>
              </CardHeader>
              <CardBody className='table-responsive'>
                <TableCustom
                  isScrollable={true}
                  rows={extract}
                  columns={columns}
                  keyExtractor={row => row.id}
                />
              </CardBody>
            </Card>
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
}

export default Withdrawals;

