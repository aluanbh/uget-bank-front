import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card, { CardBody } from './bootstrap/Card';


const MyCard = ({ corporateName, agency, account, dateRegister, ...props }) => {
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Card {...props} className={classNames(props.className)} stretch>
            <CardBody className='d-flex align-items-center' style={{
                background: '#820ad1', padding: '1em',
                borderRadius: '0.5em',
                width: '25em',
                height: '15em',
                boxShadow: '5px 8px 8px #000'
            }}>

                <div class="header">
                    <div class="box-img"
                        style={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}>
                        <img style={{ width: '20%' }} src="../assets/img/iconLogoWhite.png" alt="logowhite" />
                    </div>
                </div>
                <div class="boxMid"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}>
                    <div class="boxChip"
                        style={{
                            width: '10%',
                            marginTop: '2em',
                        }}>
                        <img style={{ width: '100%' }} src="../assets/img/chip.png" alt="chip" />
                    </div>
                    <div class="box-text"
                        style={{
                            textAlign: 'end',
                            alignContent: 'space-between',
                        }}>
                        <h4>B2B SOLUÇÕES EM TI LTDA</h4>
                        <h4>AGÊNCIA - 0001</h4>
                        <h4>CONTA - 2575412-8</h4>
                        <h4>DESDE - 07/07/2022</h4>
                    </div>
                </div>

            </CardBody>
        </Card >
    );
};
MyCard.propTypes = {
    corporateName: PropTypes.string,
    agency: PropTypes.string,
    account: PropTypes.string,
    dateRegister: PropTypes.string,

};
MyCard.defaultProps = {
    corporateName: null,
    agency: null,
    account: null,
    dateRegister: null,
};


export default MyCard;
