import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import ProductItem from '~/components/ProductItem';
import { useState, useEffect, useRef } from 'react';
import Search from '~/components/Search';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons/faCircleMinus';

const cx = classNames.bind(styles);

function Header() {


    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <img className={cx('logo')} src={images.logo} alt="Logo" />
                </Link>
                <Search />
                <div className={cx('action')}></div>
            </div>
        </div>
    );
}

export default Header;
