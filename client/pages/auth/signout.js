import { Router } from "next/router";
import { useEffect } from "react";
import { useRequest } from "../../hooks";


export default () => {
    const { request } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    })

    useEffect(() => {
        request();
    }, []);

    return (
        <div>Signing you out....</div>
    );
}