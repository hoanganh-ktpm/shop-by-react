import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <img className={cx('logo')} src={images.logo} alt="Logo" />
                </Link>
                <HeadlessTippy
                    interactive
                    visible={true}
                    maxWidth="none"
                    render={(attrs) => {
                        return (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>Products</h4>
                                    <ProductItem
                                        data={{
                                            id: '123',
                                            title: 'Áo thun',
                                            price: 456,
                                        }}
                                    />
                                    <ProductItem
                                        data={{
                                            id: '13',
                                            title: 'Áo thun',
                                            price: 456,
                                        }}
                                    />
                                </PopperWrapper>
                            </div>
                        );
                    }}
                >
                    <div className={cx('search-wrapper')}>
                        <input placeholder="What do u want to buy today?" />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
                        </button>
                    </div>
                </HeadlessTippy>
                <div className={cx('action')}></div>
            </div>
        </div>
    );
}

export default Header;
