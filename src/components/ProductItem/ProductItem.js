import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    return (
        <>
            <Link to={`/${data.id}`} className={cx('product-item')}>
                <img
                    src="https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-6/630695867_3166560830398367_211198893490798313_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFmT3Aq9ppyp5wDVLM-Z_hw13FRIlYKllzXcVEiVgqWXLcb68YLPqiUX-Re-GSEiRnqigybPZs6StxVH1nHNPO-&_nc_ohc=H0ew76_WW2cQ7kNvwFp2m0w&_nc_oc=AdrTVoCLeW5CAgFH59AFA4H3C0KpK6rQqaT_zgVJp6m2Vwx68NTJxzd4Lc-PBZy2SZEhiOO-0qi9u2fCNSP13ML-&_nc_zt=23&_nc_ht=scontent.fvca1-1.fna&_nc_gid=r39GyycHEEeu4auJB3o4eg&_nc_ss=7b2a8&oh=00_Af73zES1k6sMzivKTUW3JKsX2fxnlnpkXjvQhnekOEpFAQ&oe=6A0626A6"
                    alt="img"
                />
                <div className={cx('product-des')}>
                    <h4 className={cx('product-name')}>{data.title}</h4>
                    <p className={cx('product-price')}>{data.price}.000 VNĐ</p>
                </div>
            </Link>
        </>
    );
}

export default ProductItem;
