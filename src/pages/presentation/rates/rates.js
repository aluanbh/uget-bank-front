import React, { useState, useContext,useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import { demoPages } from '../../../menu';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import { DefaultContext } from '../../../contexts/default';
import Spinner from '../../../components/bootstrap/Spinner';
import swalService from '../../../components/swal'
import api from '../../../services/api';



const Rates = () => {

  const { establishmentt } = useContext(DefaultContext)


  const [isLoading, setIsLoading]= useState(false);

  const [reduction_value_perc, setReductionValuePerc] = useState(0);
  const [discounts_value_perc, setDiscountsValuePerc] = useState(0);

  const [fines_value_perc, setFinesValuePerc] = useState('0');
  const [interests_value_perc, setInterestsValuePerc] = useState('0');


	useEffect(() =>{
		loadRates();
	// eslint-disable-next-line no-use-before-define
	},[establishmentt, loadRates])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadRates = async () => {
		try {
			const response = await api.get(`/rate/list/${establishmentt.cnpj}`)

			const rates = response.data;

			setReductionValuePerc(parseFloat(rates.reduction_value_perc))
			setDiscountsValuePerc(parseFloat(rates.discounts_value_perc))
		} catch (error) {
			console.error('error loading rates', error)
			//swalService.error('Erro ao buscar taxas')
		}
	}

	const handleServiceRates = async () => {
		setIsLoading(true);
		try {
			await api.post(`/rate/store`,{
				cnpj : establishmentt.cnpj,
				discounts_value_perc : discounts_value_perc.toString().replace(',','.'),
				fines_value_perc : fines_value_perc,
				interests_value_perc :  interests_value_perc,
				reduction_value_perc : reduction_value_perc.toString().replace(',','.')
			})

			setIsLoading(false);
			swalService.success('Taxa registrada com sucesso!');
		} catch (error) {
			setIsLoading(false);
			swalService.error('Erro salvar taxa! Verifique sua conexão!');
		}
    }

  return (
    <>
      <PageWrapper title={demoPages.instantPix.text}>
        <SubHeader>
          <SubHeaderLeft>
            <Breadcrumb
              list={[
                { title: 'Taxas' },

              ]}
            />
          </SubHeaderLeft>

        </SubHeader>
        <Page container="fluid">

          <div className='col d-flex justify-content-center'>
            <div className="col-sm-12 col-md-12 col-xl-6 col-xxl-6">
              <div className="col-xxl-12">
                <Card style={{ marginBottom: '10px', marginTop:'50px' }}>
                  <CardHeader>
                    <CardLabel icon='Money' iconColor='success'>
                      <CardTitle tag='h4' className='h5'>
                        Taxas
                      </CardTitle>
                      <CardSubTitle>Configure suas taxas de serviço!</CardSubTitle>
                    </CardLabel>
                  </CardHeader>
                  <CardBody >

                    <div className='row m-0 mb-3 p-0'>
                      <div className='col-6'>

						
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

					  <div className='col-6'>
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

                    <div className='col-12'>
                      {isLoading ? (
                        <Button
                          color='success'
                          className='rounded-1 w-100'
                          size='lg'
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
                          color='success'
                          className='rounded-1 w-100'
                          size='lg'
                          onClick={handleServiceRates}
                        >
                          Salvar Taxa
                        </Button>
                      )
                      }

                    </div>

                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </Page>
      </PageWrapper>
    </>
  );
};

export default Rates;
