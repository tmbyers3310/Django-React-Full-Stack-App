import Form from "../components/Form"

function Login({setLoggedInUser}) {
    return <Form setLoggedInUser={setLoggedInUser} route="/api/token/" method="login" />
}

export default Login;