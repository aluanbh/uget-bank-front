import React, { useContext, useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
import Popovers from '../../../components/bootstrap/Popovers';
import useDarkMode from '../../../hooks/useDarkMode';
import LANG, { getLangWithKey } from '../../../lang';

import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import ThemeContext from '../../../contexts/themeContext';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import { DefaultContext } from '../../../contexts/default';
import SubHeader, {
  SubHeaderLeft,
  SubHeaderRight,
  SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import OffCanvas, {
  OffCanvasBody,
  OffCanvasHeader,
  OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import Alert from '../../../components/bootstrap/Alert';

const DefaultHeader = () => {
  const { themeStatus, darkModeStatus, setDarkModeStatus } = useDarkMode();
  const { establishment } = useContext(DefaultContext)
  const styledBtn = {
    color: darkModeStatus ? 'dark' : 'light',
    hoverShadow: 'default',
    isLight: !darkModeStatus,
    size: 'lg',
  };

  const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);

  const [offcanvasStatus, setOffcanvasStatus] = useState(false);

  const { i18n } = useTranslation();

  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [stores, setStores] = useState([]);
  const [storeSelected, setStoreSelected] = useState(null);

  const TABS = {
    GERAL: 'CASHLESS',
    FATURAMENTO: 'HYBRID',
  };
  const [activeTab, setActiveTab] = useState(TABS.GERAL);


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() =>
      showNotification(
        <span className='d-flex align-items-center'>
          <Icon icon={getLangWithKey(lng)?.icon} size='lg' className='me-1' />
          <span>{`Language changed to ${getLangWithKey(lng)?.text}`}</span>
        </span>,
        'You updated the language of the site. (Only "Aside" was prepared as an example.)',
      ),
    );
  };

  /**
   * Language attribute
   */
  useLayoutEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language);
  });

  const handleOPenModalRegister = (() => {
    setOpenModalRegister(true)
  })

  const handleCloseModalRegister = useCallback(() => {
    setOpenModalRegister(false);
  }, [])


  return (
    <Header>
      <HeaderLeft>
        <ButtonGroup className='table-responsive'>
          <div>
            {Object.keys(TABS).map((key) => (
              <Button
                key={key}
                color={activeTab === TABS[key] ? 'warning' : themeStatus}
                onClick={() => setActiveTab(TABS[key])}>
                {TABS[key]}
              </Button>
            ))}
          </div>
        </ButtonGroup>
      </HeaderLeft>

      <HeaderRight>
        <div className='row g-3 align-items-center'>
          <div className='col-auto'>
            {/* <Popovers
							title='DashboardHeader.js'
							desc={<code>src/pages/common/Headers/DashboardHeader.js</code>}>
							HeaderRight
						</Popovers>
						<code className='ps-3'>DashboardHeader.js</code> */}
          </div>
          {/* Dark Mode */}
          <div className='col-auto'>
            <Popovers trigger='hover' desc='Dark / Light mode'>
              <Button
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...styledBtn}
                icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
                onClick={() => setDarkModeStatus(!darkModeStatus)}
                aria-label='Toggle fullscreen'
                data-tour='dark-mode'
              />
            </Popovers>
          </div>
          {/*	Full Screen */}
          <div className='col-auto'>
            <Popovers trigger='hover' desc='Fullscreen'>
              <Button
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...styledBtn}
                icon={fullScreenStatus ? 'FullscreenExit' : 'Fullscreen'}
                onClick={() => setFullScreenStatus(!fullScreenStatus)}
                aria-label='Toggle dark mode'
              />
            </Popovers>
          </div>
          {/*	Notifications */}
          <div className='col-auto'>
            <Button
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...styledBtn}
              icon='Notifications'
              onClick={() => setOffcanvasStatus(true)}
              aria-label='Notifications'
            />
          </div>
          {/* Lang Selector */}
          {/* <div className='col-auto'>
						<Dropdown>
							<DropdownToggle hasIcon={false}>
								{typeof getLangWithKey(i18n.language)?.icon === 'undefined' ? (
									<Button
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...styledBtn}
										className='btn-only-icon'
										aria-label='Change language'
										data-tour='lang-selector'>
										<Spinner isSmall inButton='onlyIcon' isGrow />
									</Button>
								) : (
									<Button
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...styledBtn}
										icon={getLangWithKey(i18n.language)?.icon}
										aria-label='Change language'
										data-tour='lang-selector'
									/>
								)}
							</DropdownToggle>
							<DropdownMenu isAlignmentEnd data-tour='lang-selector-menu'>
								{Object.keys(LANG).map((i) => (
									<DropdownItem key={LANG[i].lng}>
										<Button
											icon={LANG[i].icon}
											onClick={() => changeLanguage(LANG[i].lng)}>
											{LANG[i].text}
										</Button>
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</div> */}
        </div>
        <OffCanvas
          id='notificationCanvas'
          titleId='offcanvasExampleLabel'
          placement='end'
          isOpen={offcanvasStatus}
          setOpen={setOffcanvasStatus}>
          <OffCanvasHeader setOpen={setOffcanvasStatus}>
            <OffCanvasTitle id='offcanvasExampleLabel'>Notificações</OffCanvasTitle>
            <Button
              color='primary'
              icon='plus'
              shadow="sm"
              hoverShadow="sm"
              onClick={handleOPenModalRegister}
            >
              nova notificação
            </Button>
          </OffCanvasHeader>
          <OffCanvasBody>
            <Alert icon='ViewInAr' isLight color='info' className='flex-nowrap'>
              Produto Cadastrado com sucesso.
            </Alert>
            <Alert icon='ThumbUp' isLight color='warning' className='flex-nowrap'>
              Usuário ativado com sucesso.
            </Alert>
            <Alert icon='Inventory2' isLight color='danger' className='flex-nowrap'>
              Estoque atualizado com sucesso.
            </Alert>
            <Alert icon='BakeryDining' isLight color='success' className='flex-nowrap'>
              Dashboard carregada com sucesso.
            </Alert>
            <Alert icon='Escalator' isLight color='primary' className='flex-nowrap'>
              Abertura de Caixa Efetuada.
            </Alert>
          </OffCanvasBody>
        </OffCanvas>
      </HeaderRight>

    </Header>


  );
};

export default DefaultHeader;


