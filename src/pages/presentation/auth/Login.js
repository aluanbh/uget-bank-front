// import React, { useState, useEffect, useContext, memo, useCallback } from 'react';
import React, { useState, useCallback, useEffect, useContext, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import Wizard, { WizardItem } from '../../../components/Wizard';
import Spinner from '../../../components/bootstrap/Spinner';
import api from '../../../services/api';
import apiViaCep from '../../../services/viaCep';
import { DefaultContext } from '../../../contexts/default';
import showNotification from '../../../components/extras/showNotification';


const LoginHeader = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Criar uma conta,</div>
				<div className='text-center h4 text-muted mb-5'>Registe-se para começar!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Bem vindo,</div>
			<div className='text-center h4 text-muted mb-5'>Faça login para continuar!</div>
		</>
	);
};

const Login = ({ isSignUp }) => {
	const { darkModeStatus } = useDarkMode();

	const { saveUserInLocal } = useContext(DefaultContext)

	const navigate = useNavigate();
	const [isNewUser, setIsNewUser] = useState(isSignUp);
	const [isLoading, setIsLoading] = useState(false);
	const [messageError, setMessageError] = useState(null);
	const [error, setError] = useState(false);
	const [usernameLogin, setUserNameLogin] = useState('');
	const [passwordLogin, setPasswordLogin] = useState('');
	const [required_username, setRequiredUsername] = useState(false);
	const [required_password, setRequiredPassword] = useState(false);
	const [user, setUser] = useState({
		cpf: '', nome: '', email: '', password: '', mother: '', birth_date: '', street: '', number: 0, complement: '', neighborhood: '', city: '', state: '', zip_code: '',
	});
	const [establishment, setEstablishment] = useState({
		site: '', logo: '', inscricao_estadual: '', cnpj: '', social_name: '', fantasy_name: '', phone_business: '', email_business: '', account_type: '', created_date: '', business_line: '', active: true, aproved_uget: false, aproved_matera: false, street_business: '', number_business: 0, complement_business: '', neighborhood_business: '', city_business: '', state_business: '', zip_code_business: '',
	});

	const numeroUser = user.number;
	const numeroEstablishment = establishment.number_business;



	const handleChange = e => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	}

	const handleChangeEstablishment = (e) => {
		const { name, value } = e.target;
		setEstablishment({ ...establishment, [name]: value });
	}

	const handleCallbackCep = async (cep) => {
		await apiViaCep(`${cep}/json`)
			.then(res => {
				if (res.data.erro) {
					showNotification('', 'CEP não encontrado', 'danger');
					user.neighborhood('neighborhood', '');
					user.street('street', '');
					user.zip_code('zip_code', '');
					user.state('state', '');
					user.city('city', '');
					user.state('state_code', '');
				} else {
					showNotification('', 'CEP localizado', 'success');
					if (res.data.bairro) user.neighborhood('neighborhood', res.data.bairro);
					if (res.data.logradouro) user.street('street', res.data.logradouro);
					user.zip_code('zip_code', res.data.cep);
					user.state('state', res.data.uf);
					user.city('city', res.data.localidade);
					user.state('state_code', res.data.ibge.substring(0, 2));
					// console.log(res.data)
				}
			}).catch(err => {
				showNotification('', 'CEP não encontrado', 'danger');
			}).finally(res => {
				//setIsLoading(false);
			});
	}

	useEffect(() => {
		if (user.zip_code.length === 8) {
			// let cep = user.zip_code.replace('-', '');
			let cep = user.zip_code;
			// console.log('Zip Code: ' + cep);
			handleCallbackCep(cep);
		}

	}, [user.zip_code]);

	useEffect(() => {
		// console.log(user);
		// console.log(establishment);
		// console.log(user.zip_code)
	}, [user, establishment]);


	const handleignIn = async () => {

		if (!usernameLogin) {
			setRequiredUsername(true)
			return
		} else {
			setRequiredUsername(false)
		};
		if (!passwordLogin) {
			setRequiredPassword(true)
			return
		} else {
			setRequiredPassword(false)
		};

		setIsLoading(true);
		try {
			const response = await api.post('/auth/signin', {
				cpf: usernameLogin,
				password: passwordLogin
			})
			const { data } = response;
			//console.log(data.token)
			await saveUserInLocal(data.token)
			navigate('/financial')
			setError(false);
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setError(true);
			setIsLoading(false);
		}
	}
	const handleOnClick = useCallback(() => navigate('/financial'), [navigate]);

	const handleOnClickSignUp = async () => {
		try {
			let user = {
				cpf: user.cpf,
				name: user.nome,
				email: user.email,
				password: user.password,
				monther: user.mother,
				birth_date: user.birth_date
			};

			let user_address = {
				street: user.street,
				number: user.number,
				complement: user.complement,
				neighborhood: user.neighborhood,
				city: user.city,
				state: user.state,
				zip_code: user.zip_code,
			};

			let establishment = {
				cnpj: establishment.cnpj,
				social_name: establishment.social_name,
				fantasy_name: establishment.fantasy_name,
				phone: establishment.phone_business,
				email: establishment.email_business,
				account_type: "Administrador",
				created_date: establishment.created_date,
				business_line: establishment.business_line,
				active: true,
				aproved_uget: true,
				aproved_matera: true
			};

			let establishment_address = {
				street: establishment.street_business,
				number: establishment.number_business,
				complement: establishment.complement_business,
				neighborhood: establishment.neighborhood_business,
				city: establishment.city_business,
				state: establishment.state_business,
				zip_code: establishment.zip_code_business,
			};

			if (establishment.cnpj == "") {
				await api.post('/user/store', user, user_address).then(res => {
					// console.log(res.data)
				}).catch(err => {
					console.log(err)
				});
			}

			else {
				await api.post('/establishment/store', user, user_address, establishment, establishment_address).then(res => {
					// console.log(res.data)
				}).catch(err => {
					console.log(err)
				});;
			}

		} catch (error) {
			console.log(error)
			setError(true);
			setIsLoading(false);
		}

		navigate('/financial');
	}

	const handleOnClickSemCadastro = useCallback(() => navigate('/financial'), [navigate]);


	return (
		<PageWrapper
			title={isNewUser ? 'Cadastro' : 'Login'}
			// className={classNames({ 'bg-warning': !isNewUser, 'bg-warning': !!isNewUser })}>
			className={classNames('bg-warning')}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className={isNewUser ? 'col-xl-8 col-lg-8 col-md-8 shadow-3d-container' : 'col-xl-4 col-lg-6 col-md-8 shadow-3d-container'}>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={300} black />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-lo10-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setUserNameLogin(false);
													setIsNewUser(!isNewUser);
													// setIsNewUser(isNewUser);
												}}>
												Conecte-se
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setUserNameLogin(false);
													setIsNewUser(!isNewUser);
												}}>
												Cadastro
											</Button>

										</div>
									</div>
								</div>

								<LoginHeader isNewUser={isNewUser} />

								<form className='row g-4'>
									{isNewUser ? (
										<Wizard
											isHeader
											color='info'
											isLoading={isLoading}
											onSubmit={handleOnClickSignUp}
											className='shadow-3d-info'>
											<WizardItem isLoading={isLoading} id='step1' title='Dados Pessoais'>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='email'
															isFloating
															label='Seu email'>
															<Input type='email' name="email" autoComplete='email'
																value={user.email}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='password'
															isFloating
															label='Senha'>
															<Input
																type='password'
																name='password'
																autoComplete='password'
																value={user.password}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='nome'
															isFloating
															label='Seu nome'>
															<Input autoComplete='given-name'
																value={user.nome}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='cpf'
															isFloating
															label='CPF'>
															<Input
																type='number'
																autoComplete='cpf'
																value={user.cpf}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='mother'
															isFloating
															label='Nome da Mãe'>
															<Input autoComplete='mother-name'
																value={user.mother}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='birth_date'
															isFloating
															label='Date de Nascimento'>
															<Input autoComplete='birthDate'
																type='date'
																value={user.birth_date}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
												</div>
											</WizardItem>
											<WizardItem isLoading={isLoading} id='step2' title='Dados de Endereço'>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-4'>
														<FormGroup
															id='zip_code'
															isFloating
															label='CEP'>
															<Input type='number' autoComplete='zipCode'
																value={user.zip_code}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
													<div className='col-8'>
														<FormGroup
															id='street'
															isFloating
															label='Rua'>
															<Input autoComplete='street'
																value={user.street}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-3'>
														<FormGroup
															id='number'
															isFloating
															label='Número'>
															<Input type='number' autoComplete='number'
																value={user.number}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
													<div className='col-3'>
														<FormGroup
															id='complement'
															isFloating
															label='Complemento'>
															<Input autoComplete='complement'
																value={user.complement}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='neighborhood'
															isFloating
															label='Bairro'>
															<Input autoComplete='neighborhood'
																value={user.neighborhood}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='city'
															isFloating
															label='Cidade'>
															<Input autoComplete='city'
																value={user.city}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='state'
															isFloating
															label='Estado'>
															<Input autoComplete='state'
																value={user.state}
																onChange={handleChange}
															/>
														</FormGroup>
													</div>

												</div>
											</WizardItem>
											<WizardItem isLoading={isLoading} id='step3' title='Dados do Estabelecimento'>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='social_name'
															isFloating
															label='Nome Social'>
															<Input autoComplete='socialName'
																value={establishment.social_name}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='fantasy_name'
															isFloating
															label='Nome Fantasia'>
															<Input autoComplete='fantasyName'
																value={establishment.fantasy_name}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-3'>
														<FormGroup
															id='cnpj'
															isFloating
															label='CNPJ'>
															<Input type='number' autoComplete='cnpj'
																value={establishment.cnpj}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-3'>
														<FormGroup
															id='inscricao_estadual'
															isFloating
															label='Insc. Estadual'>
															<Input type='number' autoComplete='inscricaoEstadual'
																value={establishment.inscricao_estadual}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-3'>
														<FormGroup
															id='created_date'
															isFloating
															label='Data de Fundação'>
															<Input type='date' autoComplete='dateFundation'
																value={establishment.created_date}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-3'>
														<FormGroup
															id='business_line'
															isFloating
															label='Linha de Negócio'>
															<Input type='number' autoComplete='business_line'
																value={establishment.business_line}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='email_business'
															isFloating
															label='E-mail'>
															<Input type='email' autoComplete='email'
																value={establishment.email_business}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='phone_business'
															isFloating
															label='Telefone'>
															<Input type='number' autoComplete='phone'
																value={establishment.phone_business}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='site'
															isFloating
															label='Site'>
															<Input type='text' autoComplete='site'
																value={establishment.site}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='logo'
															isFloating
															label='Logo'>
															<Input type='file' autoComplete='logo'
																value={establishment.logo}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='street_business'
															isFloating
															label='Rua'>
															<Input autoComplete='street'
																value={establishment.street_business}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-3'>
														<FormGroup
															id='number_business'
															isFloating
															label='Número'>
															<Input type='number' autoComplete='number'
																value={establishment.number_business}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-3'>
														<FormGroup
															id='complement_business'
															isFloating
															label='Complemento'>
															<Input autoComplete='complement'
																value={establishment.complement_business}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='neighborhood_business'
															isFloating
															label='Bairro'>
															<Input autoComplete='neighborhood'
																value={establishment.neighborhood_business}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='city_business'
															isFloating
															label='Cidade'>
															<Input autoComplete='city'
																value={establishment.city_business}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
												</div>
												<div className='row m-0 mb-3 p-0'>
													<div className='col-6'>
														<FormGroup
															id='state_business'
															isFloating
															label='Estado'>
															<Input autoComplete='state'
																value={establishment.state_business}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>
													</div>
													<div className='col-6'>
														<FormGroup
															id='zip_code_business'
															isFloating
															label='CEP'>
															<Input autoComplete='cep'
																value={establishment.zip_code_business}
																onChange={handleChangeEstablishment}
															/>
														</FormGroup>

													</div>
												</div>
											</WizardItem>
										</Wizard>
									) : (
										<>
											<div className='col-12'>
												{
													error && (
														<div className='col-12' style={{ textAlign: 'center', margin: '5px', color: '#FF0000' }}>
															usuário ou senha incorreto
														</div>
													)
												}
												{
													required_username && (
														<div className='col-12' style={{ margin: '5px', color: '#FF0000' }}>
															campo CPF é obrigatório
														</div>
													)
												}
												<FormGroup
													id='login-username'
													isFloating
													label='cpf'
												>
													<Input
														autoComplete='username'
														value={usernameLogin} Login
														onChange={e => setUserNameLogin(e.target.value)}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{
													required_password && (
														<div className='col-12' style={{ margin: '5px', color: '#FF0000' }}>
															Campo senha é obrigatório
														</div>
													)
												}
												<FormGroup
													id='login-password'
													isFloating
													label='Senha'
												>
													<Input
														type='password'
														autoComplete='password'
														value={passwordLogin}
														onChange={e => setPasswordLogin(e.target.value)}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{isLoading ? (
													<Button
														color='warning'
														className='w-100 py-3'
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
														color='warning'
														className='w-100 py-3'
														// onClick={handleignIn}
														onClick={handleOnClickSemCadastro}
													>
														Entrar
													</Button>
												)}
											</div>
										</>
									)}

								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3',
									{
										'link-light': isNewUser,
										'link-dark': !isNewUser,
									}
									// 'link-dark'
								)}>
								Política de Privacidade
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none',
									{
										'link-light': isNewUser,
										'link-dark': !isNewUser,
									}
									// 'link-dark'
								)}>
								Termos de uso
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper >
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
