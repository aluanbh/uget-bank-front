import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { useFormik } from 'formik';
import Button from '../../bootstrap/Button';
import FormGroup from '../../bootstrap/forms/FormGroup';
import Spinner from '../../bootstrap/Spinner';
import Input from '../../bootstrap/forms/Input';
import Checks, { ChecksGroup } from '../../bootstrap/forms/Checks';
import Label from '../../bootstrap/forms/Label';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../bootstrap/Modal';
import masks from '../../../helpers/utils/masks';
import InputGroup, { InputGroupText } from '../../bootstrap/forms/InputGroup';
import { DefaultContext } from '../../../contexts/default';
import api from '../../../services/api';
import PreAlert from '../../../helpers/utils/preAlert';
import swalService from '../../../components/swal';


const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Este campo é necessário';
  } else if (values.name.length < 3) {
    errors.name = 'O nome precisa ter 3 caracteres ou mais';
  }

  if (!values.email) {
    errors.email = 'Este campo é necessário.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email inválido.';
  }

  return errors;

}

const ModalRegisterUsers = ({ open, setIsOpen, setIsClose, editData, loadUsers, establishment }) => {

  const { user, accessLevel, onShowAlert } = useContext(DefaultContext)

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      phone: '',
      rua: '',
      numero: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      email: '',
    },
    validate,
    onSubmit: async values => {
      const { name, cpf, phone, rua, numero, cep, bairro, estado, cidade, email } = values;

      const data = {
        client: {
          cpf: String(Number(cpf.replace(/\D/g, ""))),
          name: name,
          email: email,
          phone: String(Number(phone.replace(/\D/g, ""))),
        },
        address: {
          street: rua,
          number: numero,
          complement: "",
          neighborhood: bairro,
          city: cidade,
          state: estado,
          zip_code: String(Number(cep.replace(/\D/g, ""))),
        },
        establishment: {
          id: Number(establishment),
        },
      };

      const onSuccess = () => {
        //onShowAlert(PreAlert.success('Registro cadastrado com sucesso!'));
        loadUsers();
        setIsClose();
        return swalService.success('Sucesso!', 'Cliente cadastrado com sucesso!', () => { });
      }

      const onSuccessUpdate = () => {
        onShowAlert(PreAlert.success('Registro atualizado com sucesso!'));
        loadUsers();
        setIsClose();
      }

      const onError = () => {
        // onShowAlert(PreAlert.error('Falha ao cadastrar o cliente.'));
        return swalService.error('Erro!', 'Falha ao cadastrar o cliente.', () => { });
      }

      setIsLoading(true);

      if (editData) {
        await api.put('/client/store', data)
          .then(onSuccessUpdate)
          .catch(onError)
          .finally(() => setIsLoading(false));
      } else {
        await api.post('/client/store', data)
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
        name,
        phone,
        cpf,
        email,
        rua,
        numero,
        cep,
        bairro,
        cidade,
        estado,
      } = editData;
      formik.setValues({
        name: name,
        email: email,
        phone: phone,
        cpf: cpf,
        rua: editData.address[0].street,
        numero: editData.address[0].number,
        cep: editData.address[0].zip_code,
        bairro: editData.address[0].neighborhood,
        cidade: editData.address[0].city,
        estado: editData.address[0].state,
      });
    }
  }, [editData, open])


  return (
    <Modal
      id={'modal-register-category'}
      titleId={'Cadastro de Cliente'}
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
        <ModalTitle id="register-user">{editData ? 'Atualização de Cliente' : 'Cadastro de Cliente'}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form noValidate onSubmit={formik.handleSubmit}>
          {/* Inputs */}
          <div className="row g-4">
            {/* Nome */}
            <FormGroup id="name" label="Nome" className='col-md-8'>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                isValid={formik.isValid}
                isTouched={formik.touched.name}
                invalidFeedback={formik.errors.name}
                validFeedback='Assim está bom!'
                placeholder='Ex: João da Silva'
              />
            </FormGroup>


            {/* Email */}
            <FormGroup id="email" label="E-mail" className='col-md-4'>
              <InputGroup>
                <InputGroupText id="inputGroupPrepend">
                  @
                </InputGroupText>
                <Input
                  id="email"
                  ariaDescribedby='inputGroupPrepend'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isValid={formik.isValid}
                  isTouched={formik.touched.email}
                  invalidFeedback={formik.errors.email}
                  validFeedback='Assim está bom!'
                  placeholder="joaodasilva@email.com"

                />
              </InputGroup>
            </FormGroup>

            {/* cpf */}
            <FormGroup id='cpf' label='CPF' className='col-md-4'>
              <Input
                type="cpf"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={masks.cpf(formik.values.cpf)}
                isValid={formik.isValid}
                isTouched={formik.touched.cpf}
                invalidFeedback={formik.errors.cpf}
                validFeedback='Assim está bom!'
                placeholder='CPF do Usuário'

              />
            </FormGroup>

            {/* phone */}
            <FormGroup id='phone' label='Telefone' className='col-md-4'>
              <Input
                type="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={masks.phone(formik.values.phone)}
                isValid={formik.isValid}
                isTouched={formik.touched.phone}
                invalidFeedback={formik.errors.phone}
                validFeedback='Assim está bom!'
                placeholder='Telefone do Usuário'

              />
            </FormGroup>

            {/* Status
            <FormGroup className='col-md-4'>
              <Label>Status</Label>
              <ChecksGroup
                isValid={formik.isValid}
                isTouched={formik.touched.active}
                invalidFeedback={formik.errors.active}
              >
                <Checks
                  type="radio"
                  id="active"
                  label="Ativo"
                  name="active"
                  value="ativo"
                  onChange={formik.handleChange}
                  checked={formik.values.active}
                  isInline
                />
                <Checks
                  type="radio"
                  id="active2"
                  label="Inativo"
                  name="active"
                  value="inativo"
                  onChange={formik.handleChange}
                  checked={formik.values.active}
                  isInline
                />
              </ChecksGroup>
            </FormGroup> */}

            {/* Endereço */}
            <FormGroup id="cep" label="CEP" className='col-md-4'>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={masks.cep(formik.values.cep)}
                isValid={formik.isValid}
                isTouched={formik.touched.cep}
                invalidFeedback={formik.errors.cep}
                validFeedback='Assim está bom!'
                placeholder='Ex: 39100-000'
              />
            </FormGroup>
            <FormGroup id="rua" label="Rua" className='col-md-6'>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rua}
                isValid={formik.isValid}
                isTouched={formik.touched.rua}
                invalidFeedback={formik.errors.rua}
                validFeedback='Assim está bom!'
                placeholder='Ex: Rua Da Paz'
              />
            </FormGroup>
            <FormGroup id="numero" label="Nº" className='col-md-2'>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.numero}
                isValid={formik.isValid}
                isTouched={formik.touched.numero}
                invalidFeedback={formik.errors.numero}
                validFeedback='Assim está bom!'
                placeholder='Ex: 40a'
              />
            </FormGroup>
            <FormGroup id="bairro" label="Bairro" className='col-md-4'>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bairro}
                isValid={formik.isValid}
                isTouched={formik.touched.bairro}
                invalidFeedback={formik.errors.bairro}
                validFeedback='Assim está bom!'
                placeholder='Ex: Centro'
              />
            </FormGroup>
            <FormGroup id="cidade" label="Cidade" className='col-md-4'>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cidade}
                isValid={formik.isValid}
                isTouched={formik.touched.cidade}
                invalidFeedback={formik.errors.cidade}
                validFeedback='Assim está bom!'
                placeholder='Ex: Diamantina'
              />
            </FormGroup>
            <FormGroup id="estado" label="Estado" className='col-md-4'>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.estado}
                isValid={formik.isValid}
                isTouched={formik.touched.estado}
                invalidFeedback={formik.errors.estado}
                validFeedback='Assim está bom!'
                placeholder='Ex: Minas Gerais'
              />
            </FormGroup>



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
                    isDisable={!formik.isValid || isLoading}
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

export default ModalRegisterUsers;