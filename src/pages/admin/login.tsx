import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoLogIn } from 'react-icons/io5';
import TextInput from 'common/ui/TextInput';
import Button from 'common/ui/Button';
import ModuleContainer from 'common/shared/module-container';
import AuthController from 'controller/authentication/auth-controller';
import Emitter from 'utils/event-manager/emitter';
import useEventListener from 'utils/event-manager/use-event-listener';
import Loader from 'common/ui/Loader';

const controller = ModuleContainer.resolve(AuthController);
const emitter = ModuleContainer.resolve(Emitter);

const Login: NextPage = () => {
    const router = useRouter();
    const [errorLoginText, setErrorLoginText] = React.useState('');
    useEventListener(emitter, {
        type: controller.getEventType().LOGIN_FAILED,
        callback: (message: string) => setErrorLoginText(message),
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().min(3).max(64).required(),
            password: Yup.string().min(6).max(64).required(),
        }),
        onSubmit: async (values) => {
            const data = await controller.login(values.username, values.password);
            if (data) {
                router.replace('/admin');
            }
        },
    });

    return (
        <>
            <Head>
                <meta name="description" content="A blog of Le Xuan Tung" />
                <link rel="icon" href="/favicon.ico" />
                <title>Admin | Login</title>
            </Head>
            <main className="ad-login-container">
                <form className="ad-login-form" onSubmit={formik.handleSubmit}>
                    <div className="ad-login-title">Please login to continue</div>
                    <label htmlFor="username">Username</label>
                    <TextInput
                        id="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        invalid={!!(formik.touched.username && formik.errors.username)}
                        errorText={formik.errors.username}
                    />
                    <label htmlFor="password">Password</label>
                    <TextInput
                        id="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        invalid={!!(formik.touched.password && formik.errors.password)}
                        errorText={formik.errors.password}
                    />
                    {errorLoginText && <small className="ad-login-error">{errorLoginText}</small>}
                    <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                        {formik.isSubmitting ? <Loader /> : <IoLogIn size={20} />}
                        <span>Login</span>
                    </Button>
                </form>
            </main>
        </>
    );
};

export default Login;
