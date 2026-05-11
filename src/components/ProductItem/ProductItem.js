import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    return (
        <>
            <Link to={`/${data.title}`} className={cx('product-item')}>
                <img src={data.image} alt="img" />
                <div className={cx('product-des')}>
                    <h4 className={cx('product-name')}>{data.title}</h4>
                    <p className={cx('product-price')}>{data.price}.000 VNĐ</p>
                </div>
            </Link>
        </>
    );
}

export default ProductItem;
