import React, { useCallback, useContext, useEffect, useState, useMemo } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { demoPages } from '../../../menu';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import { DefaultContext } from '../../../contexts/default';
import TableCustom from '../../../components/MyCustom/TableCustom';
import { ACCESS_LEVEL, convertRolesPTBR } from '../../../types/roles';

const Users = () => {
    const { accessLevel, establishment, onShowAlert } = useContext(DefaultContext);


    const data = useMemo(() => ([
        {
            id: 1,
            name: 'Freddie Mercury',
            cpf_cnpj: '105.845.845-10',
            approval: true,
            active: true,
        },
        {
            id: 2,
            name: 'Michael Jackson',
            cpf_cnpj: '085.845.845-08',
            approval: false,
            active: false,
        },
        {
            id: 3,
            name: 'Arnaldo Antunes',
            cpf_cnpj: '023.845.845-02',
            approval: true,
            active: false,
        },
    ]))


    const columns = useMemo(() => ([
        {
            label: 'Nome',
            field: 'name',
        },
        {
            label: 'CPF/CNPJ',
            field: 'cpf_cnpj',
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
                    color={row.approval ? 'success' : 'danger'}
                    icon='Circle'
                    className='text-nowrap'>
                    {row.approval ? 'Aprovado' : 'Desaprovado'}
                </Button>
            )
        },
        {
            label: 'Ações',
            field: 'actions',
            format: row => (

                <Button
                    color="danger"
                    icon="Trash"
                    shadow="sm"
                    hoverShadow="sm"
                    size="sm"
                // onClick={() => handleOpenModalDelete(row.id)}
                />

            ),
            noExport: true
        },


    ]), [])


    return (
        <>
            <PageWrapper title={demoPages.users.text}>

                <Page container='fluid'>
                    <Card>
                        <CardHeader>
                            <CardLabel icon='Person' iconColor='light'>
                                <CardTitle>Usuários Cadastrados</CardTitle>
                            </CardLabel>
                        </CardHeader>
                        <CardBody className='table-responsive'>
                            {/* {accessLevel === ACCESS_LEVEL.ADMIN && */}
                            <>

                                <TableCustom
                                    rows={data}
                                    columns={columns}
                                    keyExtractor={item => item.uid}
                                />
                            </>
                            {/* } */}
                        </CardBody>
                    </Card>
                </Page>
            </PageWrapper>
        </>
    );
};

export default Users;
