"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../page.module.css";
import { Button, Card, Skeleton, Modal } from "antd";
import Input from "@/CoreComponent/Input/page";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/Validations/loginSchema";
import apiConfig from "@/services/api";
import Password from "@/CoreComponent/Password/page";
const {success,error} = Modal;

export default function LoginComponent() {
    const { control, handleSubmit, reset } = useForm(({
        resolver: yupResolver(LoginSchema)
    }));
    const [skeletoActive, setSkeletonActive] = useState(true)


    const router = useRouter();
    const handleClickRegistrationPage = () => {
        router.push('/pages/registration')
    }

    const onSubmit = async (values) => {
        const params = {
            ...values
        }
        const response = await apiConfig.post("/auth/login", params)
        if (response.data?.intResult > 0) {
            success({
                title: 'Success',
                content: 'Login Success!',
                onOk: () => {
                    reset({})
                    router.push('/pages/home')
                },
            })

        }
        else {
            error({
                title: 'Error Occured',
                content: 'Login UnSuccessfully!',
                onOk: () => {
                    reset({})
                    router.push('/pages/login')
                },
            })

        }

    }

    useEffect(() => {
        const interVal = setTimeout(() => {
            setSkeletonActive(false)
        }, 1000)

        return () => clearTimeout(interVal)
    }, [])

    return (
        <div>
            <div className={`${styles.page} proj-backgroundColor`}
            >
                <Card title="Login" style={skeletoActive ? { width: '30%' } : { width: '30%' }} >
                    {skeletoActive ? (
                        <Skeleton />
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-12" >
                                    <Input name="username" label="User Name" control={control} required={true} />
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-12" >
                                    <Password name="password" label="Password" control={control} required={true} />
                                </div>
                            </div>
                            <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }} >
                                    <Button type="primary" htmlType="submit" >Submit</Button>
                                    <Button color="primary" variant="outlined" >Cancel</Button>
                                </div>
                            </div>
                            <div className="row mt-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                    <a onClick={handleClickRegistrationPage} style={{ color: 'red' }}>SignUp / Register</a>
                                </div>
                            </div>
                        </form>
                    )}
                </Card>
            </div>
        </div>
    );
}
