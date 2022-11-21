import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { authPages, demoPages } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle';
import Popovers from '../../components/bootstrap/Popovers';

import { DefaultContext } from '../../contexts/default';
import { convertRolesPTBR } from '../../types/roles';

const User = () => {
  const navigate = useNavigate();
  const handleItem = useNavigationItemHandle();
  const { darkModeStatus, setDarkModeStatus } = useDarkMode();

  const { user, logOut } = useContext(DefaultContext)

  const [collapseStatus, setCollapseStatus] = useState(false);

  const { t } = useTranslation(['translation', 'menu']);

  return (
    <>
      <div
        // className={classNames('user', { open: collapseStatus })}
        className='user'
      // role='presentation'
      // onClick={() => setCollapseStatus(!collapseStatus)}
      >
        <div className='user-avatar'>
        </div>
        <div className='user-info'>
          <div className='user-name'>
            {/* <Popovers > */}
            {user?.name}
            {/* </Popovers> */}
            {/* <code className='ps-2'>User.js</code> */}
          </div>
          <div className='user-sub-title'>
            {/* <Popovers > */}
            {convertRolesPTBR(user?.role)}
            {/* </Popovers> */}
            {/* <code className='ps-2'>User.js</code> */}
          </div>
        </div>
      </div>

      {/* <Collapse isOpen={collapseStatus} className='user-menu'>
        <nav aria-label='aside-bottom-user-menu'>
          <div className='navigation'>
            <div
              role='presentation'
              className='navigation-item cursor-pointer'
              onClick={() =>
                navigate(
                  //`../${demoPages.appointment.subMenu.employeeID.path}/${USERS.JOHN.id}`,
                  handleItem(),
                )
              }>
              <span className='navigation-link navigation-link-pill'>
                <span className='navigation-link-info'>
                  <Icon icon='AccountBox' className='navigation-icon' />
                  <span className='navigation-text'>{t('menu:Perfil')}</span>
                </span>
              </span>
            </div>
            <div
              role='presentation'
              className='navigation-item cursor-pointer'
              onClick={() => {
                setDarkModeStatus(!darkModeStatus);
                handleItem();
              }}>
              <span className='navigation-link navigation-link-pill'>
                <span className='navigation-link-info'>
                  <Icon
                    icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
                    color={darkModeStatus ? 'info' : 'warning'}
                    className='navigation-icon'
                  />
                  <span className='navigation-text'>
                    {darkModeStatus ? t('menu:DarkMode') : t('menu:LightMode')}
                  </span>
                </span>
              </span>
            </div>
          </div>
        </nav>
        <NavigationLine />
        <nav aria-label='aside-bottom-user-menu-2'>
          <div className='navigation'>
            <div
              role='presentation'
              className='navigation-item cursor-pointer'
              onClick={logOut}>
              <span className='navigation-link navigation-link-pill'>
                <span className='navigation-link-info'>
                  <Icon icon='Logout' className='navigation-icon' />
                  <span className='navigation-text'>{t('menu:Sair')}</span>
                </span>
              </span>
            </div>
          </div>
        </nav>
      </Collapse> */}
    </>
  );
};

export default User;
