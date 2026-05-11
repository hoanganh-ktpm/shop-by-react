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
    const [showResult, setShowResult] = useState(true);
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
        setIsLoading(true);


        try {
            let response = await axios.get('http://localhost:3001/products', {
                params: {
                    'category:contains': debouncedValue,
                },
            });
            if (response.data.length === 0) {
                response = await axios.get('http://localhost:3001/products', {
                    params: {
                        'title:contains': debouncedValue,
                    },
                });
            }
            setSearchResult(response.data);
        } catch (error) {
            alert('Failed call API, to know more pls open console');
            setIsLoading(false);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            setIsLoading(false);
            return;
        }
        handleSearch();
        const safetyTimer = setTimeout(() => {
            setIsLoading(false);
            console.warn('No result');
        }, 3000);
        return () => {
            clearTimeout(safetyTimer);
        };
    }, [debouncedValue]);

    return (
        <HeadlessTippy
            interactive
            visible={searchResult.length > 0 && showResult}
            maxWidth="none"
            onClickOutside={() => setShowResult(false)}
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
                    onClick={() => setShowResult(true)}
                    ref={inputRef}
                />

                {searchContent.length > 0 && !isLoading && (
                    <button onClick={handleDeleteSearch} className={cx('btn-delete-search')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {isLoading && <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon className={cx('search-icon')} icon={faSearch} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
