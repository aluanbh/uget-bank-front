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


const Receivables = () => {

  const { establishmentt } = useContext(DefaultContext)
  const [loading, setLoading] = useState(false)
  const [extract, setExtract] = useState([]);
  const [error, setError] = useState('');


  async function loadExtract() {
    try {
      const response = await api.get(`/extract/establishment/${establishmentt.cnpj}`);

      const { data } = response;

      const receivables = data.filter((item) => item.type === "C");

      console.log('receivables:', receivables);
      console.log('data:', data);
      setExtract(receivables);
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
      label: 'Id Controle',
      field: 'idControle',
    },
    {
      label: 'Tipo',
      field: 'type',
      format: row => (
        <>
          <Icon
            className="mx-2"
            icon={row.type === 'D' ? 'CallReceived' : 'CallMade'}
          />
          {row.description}
        </>
      )
    },
    {
      label: 'CPF/CNPJ',
      field: 'cpfCnpj',
    },
    {
      label: 'Cliente',
      field: 'customer',
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
      label: 'Tarifa',
      field: 'fee',
      format: row => (
        <>
          R$ {row.amount.toFixed(2)}
        </>
      )
    },
    {
      label: 'Valor Recebido',
      field: 'receivedAmount',
      format: row => (
        <>
          R$ {row.amount.toFixed(2)}
        </>
      )
    },
    {
      label: 'Id Transação',
      field: 'transactionId',
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

  return (
    loading == true ? (
      <>
        <PageWrapper title={demoPages.receivables.text}>
          <Page container='fluid'>
            <Card stretch>
              <CardHeader>
                <CardLabel icon='EventNote' iconColor='light'>
                  <CardTitle>Extratos Recebíveis - {establishmentt?.fantasy_name}</CardTitle>
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

export default Receivables;

