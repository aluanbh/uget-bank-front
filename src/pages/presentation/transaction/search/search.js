import React, { useState, useEffect, useMemo, useContext, useCallback } from 'react';
import moment from 'moment';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../../layout/SubHeader/SubHeader';
import Page from '../../../../layout/Page/Page';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import { demoPages } from '../../../../menu';
import Card, {
  CardActions,
  CardBody,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTitle,
} from '../../../../components/bootstrap/Card';
import Icon from '../../../../components/icon/Icon';
import Timeline, { TimelineItem } from '../../../../components/extras/Timeline';
import Popovers from '../../../../components/bootstrap/Popovers';
import Button from '../../../../components/bootstrap/Button';
import dateFormat from 'dateformat';
import Input from '../../../../components/bootstrap/forms/Input';
import Label from '../../../../components/bootstrap/forms/Label';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Dropdown, { DropdownMenu, DropdownToggle, DropdownItem } from '../../../../components/bootstrap/Dropdown';
import { useFormik } from 'formik';


const Search = () => {


  const [filterMenu, setFilterMenu] = useState(false);
  const formik = useFormik({
    initialValues: {
      store: '#',
      firstDate: dateFormat(moment().add(-1, 'month').toDate(), 'yyyy-mm-dd'),
      secondDate: dateFormat(new Date(), 'yyyy-mm-dd'),
      unityType: 'Tipo 1',
      region: 'Região 1',
    },
    // eslint-disable-next-line no-unused-vars
    onSubmit: (values) => {
      setFilterMenu(false);
      // setdataFilter({
      //   ...values
      // })
    },
  });








  return (
    <>
      <PageWrapper title={demoPages.transaction.subMenu.search.text}>
        <SubHeader>
          <SubHeaderLeft>
            <Breadcrumb
              list={[
                { title: 'Transações', to: '/Consulta' },
                {
                  title: 'Consulta',
                  to: '/transaction/search',
                },
              ]}
            />
          </SubHeaderLeft>
          <SubHeaderRight>
            <Dropdown isOpen={filterMenu} setIsOpen={setFilterMenu}>
              <DropdownToggle hasIcon={false}>
                <Button icon='Filter' color='primary' isLight data-tour='filter'>
                  Filtros
                </Button>
              </DropdownToggle>
              <DropdownMenu
                isAlignmentEnd
                size='lg'
                isCloseAfterLeave={false}
                data-tour='filter-menu'>
                <div className='container py-2'>
                  <form className='row g-3' onSubmit={formik.handleSubmit}>
                    <div className='col-12'>
                      <FormGroup>
                        <Label htmlFor='period'>Data de Inicio</Label>
                        <Input
                          id='firstDate'
                          type='date'
                          ariaLabel='First Date'
                          placeholder='01/2021'
                          onChange={formik.handleChange}
                          value={formik.values.firstDate}
                        />
                      </FormGroup>
                    </div>
                    <div className='col-12'>
                      <FormGroup>
                        <Label htmlFor='period'>Data Final</Label>
                        <Input
                          id='secondDate'
                          type='date'
                          ariaLabel='Second Date'
                          placeholder='01/2022'
                          onChange={formik.handleChange}
                          value={formik.values.secondDate}
                        />
                      </FormGroup>
                    </div>
                    <div className='col-6'>
                      <Button
                        color='primary'
                        isOutline
                        className='w-100'
                        onClick={formik.resetForm}>
                        Resetar
                      </Button>
                    </div>
                    <div className='col-6'>
                      <Button color='primary' className='w-100' type='submit'>
                        Filtrar
                      </Button>
                    </div>
                  </form>
                </div>
              </DropdownMenu>
            </Dropdown>
          </SubHeaderRight>
        </SubHeader>
        <Page container="fluid">
          <div className='col-md-12 col-sm-12 col-xl-12'>
            <div className='col d-flex justify-content-center'>
              <Card>
                <CardHeader>
                  <CardLabel icon='NotificationsActive' iconColor='warning'>
                    <CardTitle tag='h4' className='h5'>
                      Movimentações recentesss
                    </CardTitle>
                    <CardSubTitle>Últimas duas semanas</CardSubTitle>
                  </CardLabel>
                </CardHeader>
                <CardBody >
                  <Timeline>
                    <TimelineItem
                      label={moment().add(-0.25, 'hours').format('LT')}
                      color='danger'>
                      Saque de <b>R$ 550,00</b>.
                    </TimelineItem>
                    <TimelineItem
                      label={moment().add(-4.54, 'hours').format('LT')}
                      color='info'>
                      Recebimento de PIX Cobrança de Marcelo Teixeira, valor de <b>R$ 550,00</b>.
                      {/* <Popovers desc='5 stars' trigger='hover'>
                        <span>
                          <Icon icon='StarFill' color='warning' />
                          <Icon icon='StarFill' color='warning' />
                          <Icon icon='StarFill' color='warning' />
                          <Icon icon='StarFill' color='warning' />
                          <Icon icon='StarFill' color='warning' />
                        </span>
                      </Popovers> */}
                      {/* <b>, Recebimento de PIX Cobrança R$550,00.</b> */}
                    </TimelineItem>
                    <TimelineItem
                      label={moment().add(-9.34, 'hours').format('LT')}
                      color='danger'>
                      Saque de <b>R$ 2280,00</b>.
                    </TimelineItem>
                    <TimelineItem
                      label={moment().add(-1, 'day').fromNow()}
                      color='info'>
                      Recebimento de PIX Cobrança de Fabio Augusto, valor de <b>R$ 1050,00</b>.
                    </TimelineItem>
                    <TimelineItem
                      label={moment().add(-1, 'day').fromNow()}
                      color='info'>
                      Recebimento de PIX Cobrança de Antonio Eustaquio, valor de <b>R$ 550,00</b>.
                    </TimelineItem>
                    <TimelineItem
                      label={moment().add(-2, 'day').fromNow()}
                      color='info'>
                      Recebimento de PIX Cobrança de Cintia Amaral Costa, valor de  <b>R$ 680,00</b>.
                      {/* <span className='text-muted'>
                        New version released.{' '}
                        <a href='/' className='fw-bold'>
                          'V12.1.0'
                        </a>
                      </span> */}
                    </TimelineItem>
                    <TimelineItem
                      label={moment().add(-3, 'day').fromNow()}
                      color='danger'>
                      Saque de <b>R$ 1500,00</b>.
                    </TimelineItem>
                    <TimelineItem
                      label={moment().add(-7, 'day').fromNow()}
                      color='info'>
                      Recebimento de PIX Cobrança de Mario Canudo, valor de <b>R$ 800,00</b>.
                    </TimelineItem>
                    <TimelineItem
                      label={moment().add(-8, 'day').fromNow()}
                      color='info'>
                      Recebimento de PIX Cobrança de João Silva, valor de <b>R$ 700,00</b>.
                    </TimelineItem>
                  </Timeline>
                </CardBody>
              </Card>
            </div>
          </div>
        </Page>
      </PageWrapper>


    </>
  );
};

export default Search;
