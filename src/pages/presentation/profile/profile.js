import React, { useCallback, useMemo, useContext, useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import { demoPages } from '../../../menu';
import Icon from '../../../components/icon/Icon';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardTitle,
} from '../../../components/bootstrap/Card';
import Avatar from '../../../components/MyCustom/Avatar';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { DefaultContext } from '../../../contexts/default';
import masks2 from '../../../helpers/utils/masks2';
import Spinner from '../../../components/bootstrap/Spinner';
import swalService from '../../../components/swal'
import api from '../../../services/api';




const Profile = () => {
  const { establishmentt, onShowQuestion } = useContext(DefaultContext)
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false)
  const [reduction_value_perc, setReductionValuePerc] = useState(0);
  const [discounts_value_perc, setDiscountsValuePerc] = useState(0);
  const [fines_value_perc, setFinesValuePerc] = useState('0');
  const [interests_value_perc, setInterestsValuePerc] = useState('0');



  const loadRates = async () => {
    try {
      const response = await api.get(`/rate/list/${establishmentt.cnpj}`)

      const rates = response.data;
      setLoading(true)
      setReductionValuePerc(parseFloat(rates.reduction_value_perc))
      setDiscountsValuePerc(parseFloat(rates.discounts_value_perc))
    } catch (error) {
      setLoading(true)
      console.error('error loading rates', error)
      //swalService.error('Erro ao buscar taxas')
    }
  }

  const handleServiceRates = async () => {
    setIsLoading(true);
    try {
      await api.post(`/rate/store`, {
        cnpj: establishmentt.cnpj,
        discounts_value_perc: discounts_value_perc.toString().replace(',', '.'),
        fines_value_perc: fines_value_perc,
        interests_value_perc: interests_value_perc,
        reduction_value_perc: reduction_value_perc.toString().replace(',', '.')
      })

      setIsLoading(false);
      swalService.success('Taxa registrada com sucesso!');
    } catch (error) {
      setIsLoading(false);
      swalService.error('Erro salvar taxa! Verifique sua conexão!');
    }
  }

  useEffect(() => {
    loadRates();
    // eslint-disable-next-line no-use-before-define
  }, [establishmentt, loadRates])



  return (
    loading == true ? (
      <>
        <PageWrapper title={demoPages.profile.text}>
          <Page>
            <div>
              <div className='row m-0 mb-1 p-0'>
                {/************ COL ESQUERDA *************/}
                <div className='col-sm-12 col-md-4 p-0 m-0'>
                  {/************ HEADER *************/}
                  <div className='row m-0 mb-3 p-0'>
                    <div className='d-flex flex-column justify-content-center col-2 p-0 m-0'>
                      <Icon icon='AccountCircle' size='3x' />
                    </div>
                    <div className='d-flex flex-column justify-content-center col-10 p-0 m-0'>
                      <h4 className='m-0'>Cadastro da Conta</h4>
                      <p className='m-0'>{establishmentt.fantasy_name}</p>
                    </div>
                  </div>
                  {/************ IMAGEM *************/}
                  <div className='row m-0 p-4'>
                    <Card>
                      <CardHeader>
                        <CardLabel icon='AccountBox'>
                          <CardTitle>Imagem do Perfil</CardTitle>
                        </CardLabel>
                      </CardHeader>
                      <CardBody>
                        <div>
                          <Avatar
                            id='imageHome_url'
                          // value={formik.values.imageHome_url}
                          // onChange={handleImageHome} 
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  {/************ INPUTS MODIFICÁVEIS *************/}
                  <div className='row m-0  mb-0 p-1 mt-md-1'>
                    <div className='col-12 mb-3'>
                      <FormGroup
                        className={'px-0'}
                        id='email'
                        isFloating
                        label='E-mail'>
                        <Input type='email' autoComplete='email' value={establishmentt.email} />
                      </FormGroup>
                    </div>
                    <div className='col-12 mb-3'>
                      <FormGroup
                        className={'px-0'}
                        id='phone'
                        isFloating
                        label='Telefone'>
                        <Input type='number' autoComplete='phone' />
                      </FormGroup>
                    </div>
                    <div className='col-12 mb-3'>
                      <FormGroup
                        className={'px-0'}
                        id='password'
                        isFloating
                        label='Senha'>
                        <Input type='password' autoComplete='password' />
                      </FormGroup>
                    </div>
                    <div className='col-12 mb-3'>
                      <FormGroup
                        id='total_ammount'
                        isFloating
                        disabled={true}
                        label='Custo por boleto (%)'
                      >

                        <Input
                          type='number'
                          autoComplete='total_ammount'
                          value={reduction_value_perc}
                          onChange={e => setReductionValuePerc(e.target.value)}
                        />
                      </FormGroup>
                    </div>
                    <div className='col-12'>
                      <FormGroup
                        id='total_ammount'
                        isFloating
                        disabled={true}
                        label='Acrescimo por dia após o vencimento (%)'
                      >

                        <Input
                          type='number'
                          autoComplete='total_ammount'
                          value={discounts_value_perc}
                          onChange={e => setDiscountsValuePerc(e.target.value)}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  {/************ BOTÃO SALVAR *************/}
                  <div className='row m-0  mb-0 p-1 mt-md-5 px-3'>
                    <Button
                      className=' rounded-1 w-100'
                      color='success'
                      size='lg'
                      onClick={handleServiceRates}
                    >
                      Salvar Mudanças
                    </Button>
                  </div>
                </div>
                {/************ COL DIREITA *************/}
                <div className='col-sm-12 mt-3 col-md-8 mt-md-5 pt-md-5' >
                  <div className='row m-0 mb-0 p-0'>
                    <FormGroup
                      className={'col-12 px-0 px-md-2'}
                      id='socialName'
                      isFloating
                      label='Razão Social'>
                      <Input autoComplete='socialName' value={establishmentt.social_name} />
                    </FormGroup>
                    <FormGroup
                      className={'col-12 px-0 col-md-6 mt-3 px-md-2'}
                      id='inscricaoEstadual'
                      isFloating
                      label='Incrição Estadual'>
                      <Input autoComplete='inscricaoEstadual' />
                    </FormGroup>
                    <FormGroup
                      className={'col-12 px-0 col-md-6 mt-3 px-md-2'}
                      id='cnpj'
                      isFloating
                      label='CNPJ'>
                      <Input autoComplete='cnpj' value={masks2.cpfCnpj(establishmentt.cnpj)} />
                    </FormGroup>
                    <FormGroup
                      className={'col-12 px-0 mt-3 px-md-2'}
                      id='site'
                      isFloating
                      label='Site'>
                      <Input autoComplete='site' />
                    </FormGroup>
                  </div>
                  {/************ ENDEREÇO *************/}
                  <div className='row m-0 mt-md-5 mb-0 p-0'>
                    <FormGroup
                      className={'col-12 px-0 mt-3 col-md-6 px-md-2'}
                      id='cep'
                      isFloating
                      label='CEP'>
                      <Input type='number' autoComplete='cep' value={establishmentt.address[0].zip_code} />
                    </FormGroup>
                    <FormGroup
                      className={'col-12 px-0 mt-3 col-md-6 px-md-2'}
                      id='city'
                      isFloating
                      label='Cidade'>
                      <Input autoComplete='city' value={establishmentt.address[0].city} />
                    </FormGroup>
                    <FormGroup
                      className={'col-12 px-0 col-md-8 mt-3 px-md-2'}
                      id='street'
                      isFloating
                      label='Logradouro'>
                      <Input autoComplete='street' value={establishmentt.address[0].street} />
                    </FormGroup>
                    <FormGroup
                      className={'col-12 px-0 col-md-4 mt-3 px-md-2'}
                      id='number'
                      isFloating
                      label='Número'>
                      <Input autoComplete='number' value={establishmentt.address[0].number} />
                    </FormGroup>
                    <FormGroup
                      className={'col-12 px-0 col-md-6 mt-3 px-md-2'}
                      id='neighborhood'
                      isFloating
                      label='Bairro'>
                      <Input autoComplete='neighborhood' value={establishmentt.address[0].neighborhood} />
                    </FormGroup>
                    <FormGroup
                      className={'col-12 px-0 col-md-6 mt-3 px-md-2'}
                      id='complement'
                      isFloating
                      label='Complemento'>
                      <Input autoComplete='complment' value={establishmentt.address[0].complement} />
                    </FormGroup>
                  </div>
                  {/************ DESCRIÇÃO INADIPLÊNCIA *************/}
                  <div className='row m-0 mt-3 mt-md-5 mb-0 p-0 px-md-2'>
                    <Textarea
                      rows='5'
                      size='sm'
                      value='Importante: mantenha o pagamento em dia e evite a suspensão parcial/total 
                            dos serviços e a inclusão nos orgãos de proteção do crédito. Para pagamentos após
                             o vencimento serão cobrados encargos de 2% e juros de 1% ao mês em conta futura.
                              O ressarcimento por inoperância é realizado em conformidade com as Resoluções: 
                              Para STFC artigo 32° da Resolução Anatel n° 426/2005: para SCM artigo 46° da 
                              Resolução Anatel n° 614/2013 e para TV artigo 6° da Resolução 488/2007. Central 
                              de Atendimento Anatel: 1331 (Geral), 1332 (Deficientes Auditivos) e www.anatel.gov.br. '
                      autoComplete='description' />

                  </div>
                </div>
              </div>

              {/* <div className='row m-0 p-0'>
            <div className='col-12 col-md-4 mt-3 mt-md-5 mb-3 mb-md-5'>
              <Button
                className=' rounded-1 w-100'
                color='success'
                size='lg'
              // onClick={handleOpenModalRegister}
              >
                Salvar Mudanças
              </Button>
            </div>
          </div> */}

            </div>
          </Page>
        </PageWrapper >
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

export default Profile;
