import React from 'react'
import { Result ,Button} from 'antd'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {

    const navigate=useNavigate();

    const homePage=()=>{
        navigate("/")
    }
    return (
        <>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    style={{fontSize:"1.2rem",fontWeight:"800"}}
                    extra={<Button onClick={homePage} type="primary">Back Home</Button>}
                />

        </>
    )
}

export default PageNotFound
