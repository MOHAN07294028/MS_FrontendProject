"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../page.module.css";
import { Button, Card, Modal, Skeleton } from "antd";
import Input from "@/CoreComponent/Input/page";
import { useForm } from "react-hook-form";
import Select from "@/CoreComponent/Select/page";
import Password from "@/CoreComponent/Password/page";
import apiConfig from "@/services/api";
import { yupResolver } from '@hookform/resolvers/yup'
import { RegistrationSchema } from "@/Validations/registrationSchema";
const { success, error } = Modal;

export default function RegistrationComponent() {
  const { control, handleSubmit, reset } = useForm(({
    resolver: yupResolver(RegistrationSchema)
  }));
  const router = useRouter();
  const [skeletoActive, setSkeletonActive] = useState(true)

  const onSubmit = async (values) => {
    setSkeletonActive(true)
    const params = {
      ...values,
      userId: parseInt(values.userId),
    }

    const response = await apiConfig.post("/auth/register", params)
    if (response.data?.intResult > 0) {
      success({
        title: 'Success',
        content: 'Registration Successfully, Please login and enjoy...',
        onOk: () => {
          reset({})
          setSkeletonActive(false)
          router.push('/pages/auth/login')
        },
      })
    }
    else {
      error({
        title: 'Error Occured',
        content: 'Registration UnSuccessfully!',
        onOk: () => {
          setSkeletonActive(false)
          router.push('/pages/auth/registration')
        },
      })
    }
  }

  const handleClickLoginPage = () => {
    setSkeletonActive(true)
    router.push('/pages/auth/login')
  }

  useEffect(() => {
    const interVal = setTimeout(() => {
      setSkeletonActive(false)
    }, 1000)

    return () => clearTimeout(interVal)
  }, [])

  return (
    <div>
      {/* <div>
        <img className="img-background" src="/images/registration04.jpg" alt="Registration" />
      </div> */}
      <div className={`${styles.page} proj-backgroundColor`}
      >
        <Card title="Registration" style={skeletoActive ? { width: '60%' } : {}} extra={<a onClick={handleClickLoginPage} style={{ color: 'red' }} >Back To Login</a>}  >

          {skeletoActive ? (
            <Skeleton />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row" >
                <div className="col-md-4" >
                  <Input name="userId" label="User Id" control={control} required={true} />
                </div>
                <div className="col-md-4" >
                  <Input name="userFirstName" label="First Name" control={control} required={true} />
                </div>
                <div className="col-md-4" >
                  <Input name="userLastName" label="Last Name" control={control} />
                </div>
              </div>
              <div className="row" >
                <div className="col-md-4" >
                  <Input name="userName" label="User Name" control={control} required={true} />
                </div>
                <div className="col-md-4" >
                  <Input name="userEmail" label="Email Id" control={control} required={true} />
                </div>
                <div className="col-md-4" >
                  <Input name="userPhone" label="Phone Number" control={control} required={true} />
                </div>
              </div>
              <div className="row" >
                <div className="col-md-4" >
                  <Select name="userRole" label="Department" control={control} required={true}
                    options={[{ label: "Frontend", value: "Frontend" }, { label: "Backend", value: "Backend" },
                    { label: "FullStack", value: "FullStack" }, { label: "QA", value: "QA" }]}
                  />
                </div>
                <div className="col-md-4" >
                  <Select name="userGender" label="Gender" control={control} required={true}
                    options={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }]}
                  />
                </div>
                <div className="col-md-4" >
                  <Select name="userState" label="State" control={control} required={true} options={[
                    { label: "Tamil Nadu", value: "Tamil Nadu" }, { label: "Bangalore", value: "Bangalore" }
                  ]} />
                </div>
              </div>
              <div className="row" >
                <div className="col-md-4" >
                  <Password name="userPassword" label="Password" control={control} required={true} />
                </div>
                <div className="col-md-4" >
                  <Password name="userConfirmPassword" label="ConfirmPassword" control={control} required={true} />
                </div>
                <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                  <div className="col-md-3" style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Button type="primary" htmlType="submit" >Submit</Button>
                    <Button color="primary" variant="outlined" >Cancel</Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
