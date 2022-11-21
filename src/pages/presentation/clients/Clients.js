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
import Icon from '../../../components/icon/Icon';
import ModalRegisterUsers from '../../../components/modals/Clients/ModalRegister';
import masks2 from '../../../helpers/utils/masks2';


function Clients() {

	const [openModalRegister, setOpenModalRegister] = useState(false);
	const [userSelected, setUserSelected] = useState(null)
	const { establishmentt, onShowQuestion } = useContext(DefaultContext)
	const [clients, setClient] = useState([]);
	const [loadingPage, setIsLoadingPage] = useState(false);


	useEffect(() => {
		loadKeys();
	}, []);

	async function loadKeys() {

		try {
			const response = await api.get(`/client/list/establishment/${establishmentt.id}`);
			const { data } = response;
			setClient(data);
			console.log(data);
			setIsLoadingPage(true);
		} catch (error) {
			swalService.error(error.response.data);
		}
	}

	const handleOpenModalRegister = useCallback(() => {
		setUserSelected(null)
		setOpenModalRegister(true);
	}, [])

	const handleCloseModalRegister = useCallback(() => {
		setOpenModalRegister(false);
	}, [])

	const handleOpenModalEdit = useCallback((item) => {
		setUserSelected(item);
		setOpenModalRegister(true)
	}, [])

	const handleOpenModalDelete = useCallback((row) => {

	}, [])

	const columns = useMemo(() => ([
		{
			label: 'Nome',
			field: 'name',
		},
		{
			label: 'Email',
			field: 'email',
		},
		{
			label: 'CPF',
			field: 'cpf',
			format: row => masks2.cpf(row.cpf)
		},
		{
			label: 'Telefone',
			field: 'phone',
			format: row => masks2.phone(row.phone)
		},
		{
			label: 'Endereço',
			field: 'street',
			format: row => (
				<div>
					{row.address[0].street},
					{row.address[0].number},
					{row.address[0].city}
				</div>
			)
		},

		{
			label: 'Status',
			field: 'status',
			format: row => (
				<Button
					isLink
					color='success'
					icon='Circle'
					className='text-nowrap'>
					{'Ativo'}
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


	]), [handleOpenModalEdit, handleOpenModalDelete])




	return (
		loadingPage ? (
			<>
				<PageWrapper title={demoPages.clients.text}>
					<SubHeader>
						<SubHeaderLeft>
							<Breadcrumb
								list={[
									{ title: 'Clientes' },

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
								Cadastrar Cliente
							</Button>
						</SubHeaderRight>
					</SubHeader>
					<Page container='fluid'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Person' iconColor='light'>
									<CardTitle>Clientes Cadastrados</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='table-responsive'>
								<TableCustom
									rows={clients}
									columns={columns}
									keyExtractor={row => row?.id}
								/>
							</CardBody>
						</Card>
					</Page>
				</PageWrapper >

				<ModalRegisterUsers
					open={openModalRegister}
					setIsOpen={setOpenModalRegister}
					setIsClose={handleCloseModalRegister}
					editData={userSelected}
					establishment={establishmentt.id}
					loadUsers={loadKeys}
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

export default Clients;
