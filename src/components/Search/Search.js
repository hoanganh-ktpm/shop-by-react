import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import ProductItem from '~/components/ProductItem';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useDebounce from '~/hooks/useDebounce';
const cx = classNames.bind(styles);

function Search() {
    const inputRef = useRef();

    const [searchResult, setSearchResult] = useState([]);
    const [searchContent, setSearchContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const debouncedValue = useDebounce(searchContent, 200);

    const handleDeleteSearch = () => {
        setSearchContent('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleSearch = async () => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:3001/products', {
                params: {
                    category: debouncedValue,
                },
            });
            setIsLoading(false);
            setSearchResult(response.data);
        } catch (error) {
            alert('Failed call API, to know more pls open console');
            console.log(error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [debouncedValue]);

    const handleClickOutside = () => {
        setSearchResult([]);
    };
    return (
        <HeadlessTippy
            interactive
            visible={searchResult.length > 0}
            maxWidth="none"
            onClickOutside={() => handleClickOutside()}
            render={(attrs) => {
                return (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Products</h4>
                            {searchResult.length > 0 && searchResult.map((product) => <ProductItem data={product} />)}
                        </PopperWrapper>
                    </div>
                );
            }}
        >
            <div className={cx('search-wrapper')}>
                <input
                    value={searchContent}
                    onChange={(e) => setSearchContent(e.target.value)}
                    placeholder="What do u want to buy today?"
                    ref={inputRef}
                />

                {searchContent.length > 0 && !isLoading && (
                    <button onClick={handleDeleteSearch} className={cx('btn-delete-search')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {isLoading && (
                    <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />
                )}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
