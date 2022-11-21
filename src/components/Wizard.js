import React, { Children, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card, {
  CardActions,
  CardBody,
  CardFooter,
  CardFooterLeft,
  CardFooterRight,
  CardHeader,
  CardLabel,
  CardTitle,
} from './bootstrap/Card';
import Button from './bootstrap/Button';
import Popovers from './bootstrap/Popovers';
import useDarkMode from '../hooks/useDarkMode';
import Spinner from './bootstrap/Spinner';

export const WizardItem = ({ id, title, children, className, required, ...props }) => {
  return (
    <section
      id={id}
      className={classNames('wizard-item', className)}
      role='tabpanel'
      required={required}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      {children}
    </section>
  );
};
WizardItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};
WizardItem.defaultProps = {
  className: null,
  title: null,
};

const Wizard = ({ children, onSubmit, isHeader, color, stretch, isLoading, ...props }) => {
  const { themeStatus } = useDarkMode();
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const childCount = children.length;
  const childRequired = [];

  children.map((item, index) => {
    return (childRequired[index] = item.props.required ? item.props.required : false);
  })

  const getTitleName = (i) => {
    return `Step ${i + 1}`;
  };

  const prevBtn = !!activeItemIndex && (
    <Button color={color} isLink onClick={() => setActiveItemIndex(activeItemIndex - 1)}>
      Anterior
    </Button>
  );

  const nextBtn = (
    <div className='d-flex justify-content-evenly'>
      <Button
        className={classNames({ 'd-none': childCount === activeItemIndex + 1 }, 'mx-3')}
        aria-hidden={childCount === activeItemIndex + 1}
        color={color}
        disabled={childRequired[activeItemIndex]}
        isLight
        onClick={() => setActiveItemIndex(activeItemIndex + 1)}>
        Próximo
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
          disabled={childRequired[activeItemIndex]}
          className={classNames({ 'd-none': childCount !== activeItemIndex + 1 })}
          aria-hidden={childCount !== activeItemIndex + 1}
          type='submit'
          onClick={onSubmit}
          onSubmit={onSubmit}
          icon="check"
          color='success'
          rounded={1}
          hoverShadow="sm"
          shadow="sm"
          size="sm">
          Confirmar
        </Button>
      )}
    </div>
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Card stretch={stretch} tag='form' onSubmit={onSubmit} {...props}>
      {!!isHeader && (
        <CardHeader>
          <CardLabel icon='Assignment' iconColor={color}>
            {Children.map(children, (child, index) => (
              <CardTitle
                key={child.props.id}
                className={index !== activeItemIndex ? 'd-none' : null}>
                {child.props.title || getTitleName(index)}
              </CardTitle>
            ))}
          </CardLabel>
          {isHeader === 'withButton' && (
            <CardActions>
              {prevBtn}
              {nextBtn}
            </CardActions>
          )}
        </CardHeader>
      )}
      <CardBody isScrollable={!!stretch}>
        <div className='wizard-progress position-relative'>
          <div className='progress'>
            <div
              className={classNames('progress-bar', {
                [`bg-${color}`]: color !== 'primary',
              })}
              role='progressbar'
              style={{ width: `${(100 / (childCount - 1)) * activeItemIndex}%` }}
              aria-valuenow={(100 / (childCount - 1)) * activeItemIndex}
              aria-valuemin='0'
              aria-valuemax='100'
              aria-label='progress'
            />
          </div>
          {Children.map(children, (child, index) => (
            <Popovers
              key={child.props.id}
              desc={child.props.title || getTitleName(index)}
              trigger='hover'>
              <button
                type='button'
                className={classNames(
                  'wizard-progress-btn',
                  'position-absolute p-0 top-0',
                  'translate-middle',
                  'btn btn-sm',
                  {
                    [`btn-${color}`]: activeItemIndex >= index,
                    [`btn-${themeStatus}`]: activeItemIndex < index,
                  },
                  'rounded-pill',
                )}
                style={{
                  left: `${(100 / (childCount - 1)) * index}%`,
                }}
              // onClick={() => setActiveItemIndex(index)}
              >
                {index + 1}
              </button>
            </Popovers>
          ))}
        </div>

        <div className='wizard'>
          {Children.map(children, (child, index) =>
            cloneElement(child, {
              className: index !== activeItemIndex ? 'd-none' : '',
              'aria-hidden': index !== activeItemIndex,
            }),
          )}
        </div>
      </CardBody>
      <CardFooter>
        <CardFooterLeft>{prevBtn}</CardFooterLeft>
        <CardFooterRight>{nextBtn}</CardFooterRight>
      </CardFooter>
    </Card>
  );
};
Wizard.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'dark',
    'brand',
    'brand-two',
    'storybook',
  ]),
  isHeader: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['withButton'])]),
  onSubmit: PropTypes.func.isRequired,
  stretch: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['full', 'semi'])]),
};
Wizard.defaultProps = {
  isHeader: false,
  color: 'primary',
  stretch: null,
};

export default Wizard;
