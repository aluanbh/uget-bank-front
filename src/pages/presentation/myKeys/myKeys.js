import React, { useCallback, useMemo, useContext, useEffect, useState } from 'react';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import TableCustom from "../../../components/MyCustom/TableCustom";
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { demoPages } from '../../../menu';
import ModalLoading from '../../../components/modals/MyKeys/ModalRegister';
import { DefaultContext } from '../../../contexts/default';
import Spinner from '../../../components/bootstrap/Spinner';
import api from '../../../services/api';
import swalService from '../../../components/swal'

const Mykeys = () => {

  const [openModalRegister, setOpenModalRegister] = useState(false);
  const { establishmentt, onShowQuestion } = useContext(DefaultContext)
  const [keys, setKey] = useState([]);
  const [error, setError] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [loadingPage, setIsLoadingPage] = useState(false);


  useEffect(() => {
    loadKeys();
  }, []);

  async function loadKeys() {

    try {
      const response = await api.get(`/establishment/show-alias/${establishmentt.cnpj}`);
      const { data } = response;
      setKey(data.aliases);
      setIsLoadingPage(true);
    } catch (error) {
      swalService.error(error.response.data);
    }
  }




  const handleRegisterKey = async () => {

    setIsLoading(true);
    try {
      await api.post(`/establishment/create-alias/${establishmentt.cnpj}`);

      setIsLoading(false);
      loadKeys()
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }

  const handleCloseModalRegister = useCallback(() => {
    setOpenModalRegister(false);
  }, [])

  const handleOpenModalDelete = useCallback((id) => {
    onShowQuestion({
      title: 'Exclus??o de Chave Pix',
      message: 'Voc?? est?? excluindo uma Chave Pix. Est?? a????o ?? irrevers??vel. Deseja continuar?',
      // onConfirm: () => {
      //   row => row?.id
      //     .delete(id)
      //     .then(res => showNotification('', notificationBody('Chave Pix deletada com sucesso'), 'success'))
      //     .catch(err => showNotification('', notificationBody('Falhou ao deletar a Chave Pix'), 'danger'))
      // }
    })
  }, [establishmentt])

  const columns = useMemo(() => ([
    {
      label: 'Tipo',
      field: 'type',
    },
    {
      label: 'Chave',
      field: 'name',
    },
    {
      label: 'Status',
      field: 'status',
      format: row => (
        <Button
          isLink
          color={row.status ? 'success' : 'danger'}
          icon='Circle'
          className='text-nowrap'>
          {row.status ? 'Ativo' : 'Inativo'}
        </Button>
      )
    },
    // {
    //   label: 'A????es',
    //   field: 'actions',
    //   format: row => (

    //     <Button
    //       disables={true}
    //       color="danger"
    //       icon="Trash"
    //       shadow="sm"
    //       hoverShadow="sm"
    //       size="sm"
    //       onClick={() => handleOpenModalDelete(row.id)}
    //     />

    //   ),
    //   noExport: true
    // },


  ]), [handleOpenModalDelete])

  const confirm = () => {
    swalService.confirm('Confirma a cria????o de uma nova chave Pix?', '', () => handleRegisterKey());
  }

  return (
    loadingPage ? (
      <>
        <PageWrapper title={demoPages.myKeys.text}>
          <SubHeader>
            <SubHeaderLeft>
              <Breadcrumb
                list={[
                  { title: 'Minhas Chaves' },

                ]}
              />
            </SubHeaderLeft>
            <SubHeaderRight>
              <Button
                color='primary'
                icon='plus'
                shadow="sm"
                hoverShadow="sm"
                onClick={confirm}
              >
                Cadastrar Chave Aleat??ria
              </Button>
            </SubHeaderRight>
          </SubHeader>
          <Page container='fluid'>
            <Card stretch>
              <CardHeader>
                <CardLabel icon='VpnKey' iconColor='light'>
                  <CardTitle>Minhas Chaves PIX</CardTitle>
                </CardLabel>
              </CardHeader>
              <CardBody className='table-responsive'>
                <TableCustom
                  rows={keys}
                  columns={columns}
                  keyExtractor={row => row?.id}
                />
              </CardBody>
            </Card>
          </Page>
        </PageWrapper>

        {/* <ModalCreatePixKey
        open={handleOpenModalRegister}
        setIsOpen={setOpenModalRegister}
        setIsClose={handleCloseModalRegister}
      /> */}

        <ModalLoading
          text={'Gerando chave pix'}
          open={loading}
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
}

export default Mykeys;
