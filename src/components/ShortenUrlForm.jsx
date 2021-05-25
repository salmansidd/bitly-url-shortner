/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [shortUrl, setshortUrl] = useState('');
    const [isInvalidUrl, setIsInvalidUrl] = useState(false);

    /**
     * Set long URL from the user input
     * @param e The event listener
     */
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    });

    /**
     * Validate user's long URL input
     * @param url The long URL
     * @returns boolean The validity status of long URL
     */
    const isValidHttpUrl = (url) => {
        let httpUrl;
        try {
            httpUrl = new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    /**
     * Fetch request to the Bitly API for URL shortening
     */
    const fetchRequest = () => {
        const url = `${process.env.REACT_APP_BITLY_URL}`;
        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_BITLY_AUTORIZATION_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                long_url: value,
            }),
        };
        fetch(url, options)
            .then(response => response.json())
            .then((data) => {
                if (data.link) {
                    setshortUrl(data.link);
                    // Copy the short url to the clipboard
                    navigator.clipboard.writeText(data.link);
                } else if (data.errors) {
                    console.error('Error Message:', data.message);
                }
            });
    };

    /**
     * Submit request to shorten the URL
     * @param e The event listener
     */
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (isValidHttpUrl(value)) {
            fetchRequest();
            setIsInvalidUrl(false);
        } else {
            setIsInvalidUrl(true);
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input placeholder="Url to shorten" id="shorten" aria-label="input" type="text" value={value} onChange={onChange} />
            </label>
            <input type="submit" aria-label="button" value="Shorten and copy URL" />
            {isInvalidUrl && (
                <div className="Invalid-url">
                    <p>Invalid Url Entered</p>
                </div>
            )}
            {!isInvalidUrl && shortUrl && (
                <div className="Short-url" aria-label="url">
                    <p>Short Url: </p>
                    <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
                </div>
            )}
        </form>
    );
};

export default ShortenUrlForm;
