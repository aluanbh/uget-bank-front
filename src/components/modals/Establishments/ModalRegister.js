import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useFormik } from 'formik';
import Button from '../../bootstrap/Button';
import FormGroup from '../../bootstrap/forms/FormGroup';
import Input from '../../bootstrap/forms/Input';
import Textarea from '../../bootstrap/forms/Textarea';
import InputGroup, { InputGroupText } from '../../bootstrap/forms/InputGroup';
import Label from '../../bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../bootstrap/forms/Checks';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../bootstrap/Modal';
import Spinner from '../../bootstrap/Spinner';
import { GeoPoint } from 'firebase/firestore';
import masks from '../../../helpers/utils/masks';
import PreAlert from '../../../helpers/utils/preAlert';
import { DefaultContext } from '../../../contexts/default';
import Avatar from '../../MyCustom/Avatar';
import randomString from '../../../helpers/utils/functions/randomString';
import moment from 'moment'
import swalService from '../../../components/swal';
import api from '../../../services/api';
import masks2 from '../../../helpers/utils/masks2';

const validate = (values) => {
  const errors = {};
  if (!values.cnpj) {
    errors.cnpj = 'Este campo é necessário.';
  } else if (values.cnpj.length < 18) {
    errors.cnpj = 'O CNPJ precisa ter 14 dígitos.';
  }

  if (!values.social_name) {
    errors.name = 'Este campo é necessário.';
  }

  if (!values.fantasyName) {
    errors.fantasyName = 'Este campo é necessário.';
  } else if (values.fantasyName.length < 2) {
    errors.fantasyName = 'O nome precisa ter 2 caracteres ou mais.';
  }

  if (!values.phone) {
    errors.phone = 'Este campo é necessário.';
  } else if (values.phone.length >= 12) {
    errors.phone = 'O telefone precisa ter 10 dígitos.';

  }

  if (!values.email) {
    errors.email = 'Este campo é necessário.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email inválido.';
  }

  if (!values.business_line) {
    errors.business_line = 'Este campo é necessário.';
  } else if (values.business_line.length < 2) {
    errors.business_line = 'A linha de negócio precisa ter 2 caracteres ou mais.';
  }

  return errors;

}

const ModalRegisterEstablishments = ({ open, setIsOpen, setIsClose, editData, loadEstabelecimentos, establishment }) => {

  const { onShowAlert } = useContext(DefaultContext)
  const [date, setDate] = useState(moment().format('YYYY/MM/DD'));



  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      cnpj: '',
      social_name: '',
      fantasyName: '',
      phone: '',
      email: '',
      business_line: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zip_code: ''
    },
    validate,
    onSubmit: async values => {
      const { social_name, fantasyName, phone, email, cnpj, business_line, street, number, neighborhood, city, state, zip_code, complement } = values;

      const data = {
        establishment: {
          cnpj: cnpj,
          social_name: social_name,
          fantasy_name: fantasyName,
          phone: phone,
          email: email,
          account_type: "Administrador",
          created_date: date.toString(),
          business_line: business_line,
          active: true,
          aproved_uget: true,
          aproved_matera: true
        },
        address: {
          street: street,
          number: number,
          complement: complement,
          neighborhood: neighborhood,
          city: city,
          state: state,
          zip_code: zip_code
        }
      }

      const onSuccess = () => {
        loadEstabelecimentos();
        setIsClose();
        return swalService.success('Sucesso!', 'Estabelecimento cadastrado com sucesso!', () => { });
      }
      const onSuccessUpdate = () => {
        onShowAlert(PreAlert.success('Estabelecimento atualizado com sucesso!'));
        loadEstabelecimentos();
        setIsClose();
      }
      const onError = () => {
        return swalService.error('Erro!', 'Falha ao cadastrar o estabelecimento.', () => { });
      }

      setIsLoading(true);

      if (editData) {
        await api.put('/establishment/store', data)
          .then(onSuccessUpdate)
          .catch(onError)
          .finally(() => setIsLoading(false));
      } else {
        await api.post('/establishment/store', data)
          .then(onSuccess)
          .catch(onError)
          .finally(() => setIsLoading(false))
      }
    },
  })

  useEffect(() => {
    if (!open) return formik.resetForm();
    // console.log('editData', editData)
    if (editData) {
      const {
        cnpj,
        social_name,
        fantasy_name,
        phone,
        email,
        business_line,
        street,
        number,
        neighborhood,
        city,
        state,
        zip_code,
        complement,
      } = editData;
      formik.setValues({
        cnpj: cnpj,
        social_name: social_name,
        fantasyName: fantasy_name,
        phone: phone,
        email: email,
        business_line: business_line,
        street: editData.address[0].street,
        number: editData.address[0].number,
        neighborhood: editData.address[0].neighborhood,
        city: editData.address[0].city,
        state: editData.address[0].state,
        zip_code: editData.address[0].zip_code,
        complement: editData.address[0].complement
      });
    }
  }, [editData, open])

  // console.log(formik.values)

  // const handleImage = useCallback((e) => {
  //   const [file] = Array.from(e.target.files)
  //   formik.setValues({
  //     ...formik.values,
  //     image: file,
  //     image_url: URL.createObjectURL(file)
  //   })
  // }, [formik.values])

  return (
    <Modal
      id={'modal-register-establishments'}
      titleId={'Cadastro e Update de Estabelecimentos'}
      isOpen={open}
      setIsOpen={setIsOpen}
      isStaticBackdrop={true}
      isScrollable={false}
      isCentered={true}
      size="lg" // 'sm' || 'lg' || 'xl' 
      isAnimation={true}
      onSubmit={formik.handleSubmit}
    >
      <ModalHeader setIsOpen={setIsOpen}>
        <ModalTitle id="register-establishment">{editData ? 'Atualização de Estabelecimento' : 'Cadastro de Estabelecimento'}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className='row m-0 mb-3 p-0'>
            <div className='col-6'>
              <FormGroup
                id='socialName'
                isFloating
                label='Nome Social'>
                <Input autoComplete='socialName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.social_name}
                  isValid={formik.isValid}
                  isTouched={formik.touched.social_name}
                  invalidFeedback={formik.errors.social_name}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: Empresa LTDA' />
              </FormGroup>
            </div>
            <div className='col-6'>
              <FormGroup
                id='fantasyName'
                isFloating
                label='Nome Fantasia'>
                <Input autoComplete='fantasyName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.social_name}
                  isValid={formik.isValid}
                  isTouched={formik.touched.social_name}
                  invalidFeedback={formik.errors.social_name}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: Empresa Comercial' />
              </FormGroup>
            </div>
          </div>
          <div className='row m-0 mb-3 p-0'>
            <div className='col-3'>
              <FormGroup
                id='cnpj'
                isFloating
                label='CNPJ'>
                <Input autoComplete='cnpj' onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={masks2.cpfCnpj(formik.values.cnpj)}
                  isValid={formik.isValid}
                  isTouched={formik.touched.cnpj}
                  invalidFeedback={formik.errors.city}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: 00.000.000/0001-00' />
              </FormGroup>
            </div>
            <div className='col-3'>
              <FormGroup
                id='inscricaoEstadual'
                isFloating
                label='Inscrição Estadual'>
                <Input autoComplete='inscricaoEstadual' />
              </FormGroup>
            </div>
            <div className='col-3'>
              <FormGroup
                id='dateFundation'
                isFloating
                label='Data de Fundação'>
                <Input type='date' autoComplete='dateFundation' />
              </FormGroup>
            </div>
            <div className='col-3'>
              <FormGroup
                id='business_line'
                isFloating
                label='Linha de Negócio'>
                <Input type='business_line' autoComplete='business_line' onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.business_line}
                  isValid={formik.isValid}
                  isTouched={formik.touched.business_line}
                  invalidFeedback={formik.errors.business_line}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: 47' />
              </FormGroup>
            </div>
          </div>
          <div className='row m-0 mb-3 p-0'>
            <div className='col-6'>
              <FormGroup
                id='email'
                isFloating
                label='E-mail'>
                <Input type='email' autoComplete='email' onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isValid={formik.isValid}
                  isTouched={formik.touched.email}
                  invalidFeedback={formik.errors.email}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: empresateste@gmail.com' />
              </FormGroup>
            </div>
            <div className='col-6'>
              <FormGroup
                id='phone'
                isFloating
                label='Telefone'>
                <Input type='phone' autoComplete='phone' onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={masks2.phone(formik.values.phone)}
                  isValid={formik.isValid}
                  isTouched={formik.touched.phone}
                  invalidFeedback={formik.errors.phone}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: (34) 3481-5021' />
              </FormGroup>
            </div>
          </div>
          <div className='row m-0 mb-3 p-0'>
            <div className='col-6'>
              <FormGroup
                id='site'
                isFloating
                label='Site'>
                <Input type='text' autoComplete='site' />
              </FormGroup>
            </div>
            <div className='col-6'>
              <FormGroup
                id='logo'
                isFloating
                label='Logo'>
                <Input type='file' autoComplete='logo' />
              </FormGroup>
            </div>
          </div>
          <div className='row m-0 mb-3 p-0'>
            <div className='col-6'>
              <FormGroup
                id='street'
                isFloating
                label='Rua'>
                <Input autoComplete='street'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                  isValid={formik.isValid}
                  isTouched={formik.touched.street}
                  invalidFeedback={formik.errors.street}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: Rua São Pedro' />
              </FormGroup>
            </div>
            <div className='col-3'>
              <FormGroup
                id='number'
                isFloating
                label='Número'>
                <Input autoComplete='number'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.number}
                  isValid={formik.isValid}
                  isTouched={formik.touched.number}
                  invalidFeedback={formik.errors.number}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: 296' />
              </FormGroup>
            </div>
            <div className='col-3'>
              <FormGroup
                id='complement'
                isFloating
                label='Complemento'>
                <Input autoComplete='complement'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.complement}
                  isValid={formik.isValid}
                  isTouched={formik.touched.complement}
                  invalidFeedback={formik.errors.complement}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: Apto 301' />
              </FormGroup>
            </div>
          </div>
          <div className='row m-0 mb-3 p-0'>
            <div className='col-6'>
              <FormGroup
                id='neighborhood'
                isFloating
                label='Bairro'>
                <Input autoComplete='neighborhood'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.neighborhood}
                  isValid={formik.isValid}
                  isTouched={formik.touched.neighborhood}
                  invalidFeedback={formik.errors.neighborhood}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: Centro' />
              </FormGroup>
            </div>
            <div className='col-6'>
              <FormGroup
                id='city'
                isFloating
                label='Cidade'>
                <Input autoComplete='city'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  isValid={formik.isValid}
                  isTouched={formik.touched.city}
                  invalidFeedback={formik.errors.city}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: Belo Horizonte' />
              </FormGroup>
            </div>
          </div>
          <div className='row m-0 mb-3 p-0'>
            <div className='col-6'>
              <FormGroup
                id='state'
                isFloating
                label='Estado'>
                <Input autoComplete='state'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  isValid={formik.isValid}
                  isTouched={formik.touched.state}
                  invalidFeedback={formik.errors.state}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: Minas Gerais' />
              </FormGroup>
            </div>
            <div className='col-6'>
              <FormGroup
                id='zipCode'
                isFloating
                label='CEP'>
                <Input autoComplete='zipCode'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={masks.cep(formik.values.zip_code)}
                  isValid={formik.isValid}
                  isTouched={formik.touched.zip_code}
                  invalidFeedback={formik.errors.zip_code}
                  validFeedback='Assim está bom!'
                  placeholder='Ex: 39100-000' />
              </FormGroup>
            </div>
          </div>
          {/* Buttons */}
          <div className="row pt-4">
            <div className="col-md-4 offset-md-8">
              <div className='d-flex justify-content-evenly'>
                <Button
                  color="danger"
                  icon="cancel"
                  rounded={1}
                  onClick={setIsClose}
                  shadow="sm"
                  hoverShadow="sm"
                  size="sm"
                >
                  Cancelar
                </Button>
                {isLoading ? (
                  <Button
                    color="success"
                    rounded={1}
                    hoverShadow="sm"
                    shadow="sm"
                    size="sm"
                  >
                    <Spinner
                      color="light"
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
                    isDisable={!formik.isValid && !!formik.submitCount}
                    type='submit'
                    color='success'
                    icon="check"
                    rounded={1}
                    hoverShadow="sm"
                    shadow="sm"
                    size="sm"
                  >
                    Confirmar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default ModalRegisterEstablishments;