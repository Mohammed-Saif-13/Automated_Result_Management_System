import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';
import { firebaseAuthService } from '@/services/firebaseAuthService';
import { ROUTES } from '@/constants/routes';

const studentRegisterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    rollNumber: z.string().min(1, 'Roll number is required'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
    class: z.string().min(1, 'Class is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const StudentRegistrationForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(studentRegisterSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const result = await firebaseAuthService.registerWithEmail(
                data.email,
                data.password,
                data.name
            );

            if (result.success) {
                toast.success('Registration successful! Please verify your email.');
                toast.info('Verification email sent to ' + data.email);

                setTimeout(() => {
                    navigate(ROUTES.LOGIN);
                }, 2000);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setLoading(true);

        try {
            const result = await firebaseAuthService.signInWithGoogle();

            if (result.success) {
                toast.success('Signed up with Google successfully!');
                toast.info('Please complete your profile.');

                setTimeout(() => {
                    navigate(ROUTES.STUDENT.DASHBOARD);
                }, 1000);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Google sign-up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Full Name"
                placeholder="Enter your full name"
                {...register('name')}
                error={errors.name?.message}
                required
            />

            <Input
                label="Email Address"
                type="email"
                placeholder="student@example.com"
                {...register('email')}
                error={errors.email?.message}
                required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Roll Number"
                    placeholder="STD001"
                    {...register('rollNumber')}
                    error={errors.rollNumber?.message}
                    required
                />

                <Input
                    label="Class"
                    placeholder="10"
                    {...register('class')}
                    error={errors.class?.message}
                    required
                />
            </div>

            <Input
                label="Phone Number"
                type="tel"
                placeholder="1234567890"
                {...register('phone')}
                error={errors.phone?.message}
                required
            />

            <div className="relative">
                <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password (min 6 characters)"
                    {...register('password')}
                    error={errors.password?.message}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <div className="relative">
                <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <p className="text-xs text-primary-900 dark:text-primary-300">
                    <strong>Note:</strong> You will receive a verification email. Please verify before logging in.
                </p>
            </div>

            <Button type="submit" fullWidth loading={loading}>
                Register as Student
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or</span>
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={handleGoogleSignUp}
                className="flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                Sign up with Google
            </Button>
        </form>
    );
};

export default StudentRegistrationForm;