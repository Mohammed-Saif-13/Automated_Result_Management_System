import LoginForm from '@/components/forms/LoginForm';

const Login = () => {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Welcome Back
            </h2>
            <LoginForm />
        </div>
    );
};

export default Login;