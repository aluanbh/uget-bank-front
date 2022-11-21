import React, { useCallback, useContext, useEffect, useState, useMemo } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { demoPages } from '../../../menu';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import TableCustom from '../../../components/MyCustom/TableCustom';
import ModalRegisterEstablishments from '../../../components/modals/Establishments/ModalRegister';
import { DefaultContext } from '../../../contexts/default';
import api from '../../../services/api';
import masks2 from '../../../helpers/utils/masks2';
import Spinner from '../../../components/bootstrap/Spinner';

const Establishments = () => {
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [estabelecimentos, setEstabelecimentos] = useState([]);
    const [establishmentSelected, setEstablishmentSelected] = useState(null)
    const { accessLevel, establishment, onShowAlert } = useContext(DefaultContext);
    const [usersInEstab, setUsersInEstab] = useState([])
    const [usersUget, setUsersUget] = useState([])
    const { establishmentt, onShowQuestion } = useContext(DefaultContext)
    const [loadingPage, setIsLoadingPage] = useState(false);

    useEffect(() => {
        loadKeys();
    }, []);

    async function loadKeys() {
        try {
            const response = await api.get(`/establishment/all`);
            const { data } = response;
            setEstabelecimentos(data);
            setIsLoadingPage(true);
        } catch (error) {
            console.log(error.response.data);
        }
    }




    const handleOpenModalRegister = useCallback(() => {
        setEstablishmentSelected(null)
        setOpenModalRegister(true);
    }, [])

    const handleCloseModalRegister = useCallback(() => {
        setOpenModalRegister(false);
    }, [])

    const handleOpenModalEdit = useCallback((item) => {
        setEstablishmentSelected(item);
        setOpenModalRegister(true)
    }, [])

    const handleOpenModalDelete = useCallback((row) => {

    }, [])





    const columns = useMemo(() => ([
        {
            label: 'Nome',
            field: 'fantasy_name',
        },
        {
            label: 'CNPJ',
            field: 'cnpj',
            format: row => masks2.cpfCnpj(row.cnpj),
        },
        {
            label: 'CPF Titular',
            field: 'cpf_titular',
        },
        {
            label: 'Status',
            field: 'active',
            format: row => (
                <Button
                    isLink
                    color={row.active ? 'success' : 'danger'}
                    icon='Circle'
                    className='text-nowrap'>
                    {row.active ? 'Ativo' : 'Inativo'}
                </Button>
            )
        },
        {
            label: 'Aprovação',
            field: 'approval',
            format: row => (
                <Button
                    isLink
                    color={row.aproved_uget ? 'success' : 'danger'}
                    icon='Circle'
                    className='text-nowrap'>
                    {row.aproved_uget ? 'Aprovado' : 'Reprovado'}
                </Button>
            )
        },
        {
            label: 'Ações',
            field: 'actions',
            format: row => (
                <div className='w-50 d-flex justify-content-between'>
                    <Button
                        color="light"
                        icon="edit"
                        shadow="sm"
                        hoverShadow="sm"
                        size="sm"
                        onClick={() => handleOpenModalEdit(row)}
                    />
                </div>
            ),
            noExport: true
        },


    ]), [handleOpenModalEdit])

    return (
        loadingPage ? (
            <>

                <PageWrapper title={demoPages.establishments.text}>
                    <SubHeader>
                        <SubHeaderLeft>
                            <Breadcrumb
                                list={[
                                    { title: 'Estabelecimentos' },

                                ]}
                            />
                        </SubHeaderLeft>
                        <SubHeaderRight>

                            <Button
                                color='primary'
                                icon='plus'
                                shadow="sm"
                                hoverShadow="sm"
                                onClick={handleOpenModalRegister}
                            >
                                Cadastrar Estabelecimentos
                            </Button>
                        </SubHeaderRight>
                    </SubHeader>
                    <Page container='fluid'>
                        <Card>
                            <CardHeader>
                                <CardLabel icon='Storefront' iconColor='light'>
                                    <CardTitle>Estabelecimentos Cadastrados</CardTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody className='table-responsive'>



                                {/* {accessLevel === ACCESS_LEVEL.ADMIN && */}
                                <>

                                    <TableCustom
                                        rows={estabelecimentos}
                                        columns={columns}
                                        keyExtractor={row => row?.id}
                                    />
                                </>
                                {/* } */}
                            </CardBody>
                        </Card>
                    </Page>
                </PageWrapper>
                <ModalRegisterEstablishments
                    open={openModalRegister}
                    setIsOpen={setOpenModalRegister}
                    setIsClose={handleCloseModalRegister}
                    editData={establishmentSelected}
                    loadEstabelecimentos={loadKeys}
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

export default Establishments;
