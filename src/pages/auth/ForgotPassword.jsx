import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useToast } from '@/hooks/useToast';
import { authService } from '@/services/authService';
import { ROUTES } from '@/constants/routes';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

const ForgotPassword = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const email = watch('email');

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const result = await authService.resetPassword(data.email);

            if (result.success) {
                setEmailSent(true);
                toast.success('Password reset email sent!');
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <div className="space-y-4">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900/20 rounded-full mb-4">
                        <CheckCircle size={32} className="text-success-600" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Check Your Email
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        We've sent a password reset link to
                    </p>

                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-6">
                        {email}
                    </p>
                </div>

                <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
                    <div className="space-y-2 text-xs text-primary-900 dark:text-primary-300">
                        <p className="font-semibold">Next Steps:</p>
                        <ul className="space-y-1 ml-4 list-disc">
                            <li>Check your email inbox (and spam folder)</li>
                            <li>Click the reset link in the email</li>
                            <li>Create a new password</li>
                            <li>Login with your new password</li>
                        </ul>
                    </div>
                </Card>

                <div className="space-y-2">
                    <Button
                        variant="outline"
                        fullWidth
                        onClick={() => setEmailSent(false)}
                    >
                        Didn't receive? Resend email
                    </Button>

                    <Link to={ROUTES.LOGIN}>
                        <Button variant="ghost" fullWidth>
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-3">
                    <Mail size={24} className="text-primary-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Forgot Password?
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                    No worries! Enter your email and we'll send you reset instructions.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                />

                <Button type="submit" fullWidth loading={loading}>
                    Send Reset Link
                </Button>
            </form>

            <Link to={ROUTES.LOGIN}>
                <Button variant="ghost" fullWidth>
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Login
                </Button>
            </Link>
        </div>
    );
};

export default ForgotPassword;