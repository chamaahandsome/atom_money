import React, { useCallback, useEffect, useState } from 'react';
import { PlaidLinkOptions, PlaidLinkOnSuccess, usePlaidLink } from 'react-plaid-link';
import { StyledString } from 'next/dist/build/swc';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { createLinkToken } from '@/lib/Actions/user.actions';
import { exchangePublicToken } from '../lib/Actions/user.actions';

const PlaidLink = ({user, variant}: PlaidLinkProps) => {

    const router = useRouter();

    const [token, setToken] = useState("");

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token: string) =>{
        await exchangePublicToken({
            publicToken: public_token, 
            user
        })

        router.push('/');
    }, [user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    };

    const { open, ready } = usePlaidLink(config);

    return (
    
        <>
            {variant === "primary" ?  (
                <Button 
                    onClick={() => open()}
                    disabled={!ready}
                    className='plaidlink-primary'
                >
                    Connect Bank
                </Button>
            ): variant === "ghost" ? (
                <Button>
                    Connect Bank
                </Button>
            ): (
                <Button>
                    Connect Bank
                </Button>
            
            )}
        </>
    
    )
}

export default PlaidLink;