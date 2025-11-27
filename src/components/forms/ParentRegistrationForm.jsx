import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';
import { ROUTES } from '@/constants/routes';

const parentRegisterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
    childRollNumber: z.string().min(1, 'Child roll number is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const ParentRegistrationForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(parentRegisterSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const result = await authService.registerWithEmail(
                data.email,
                data.password,
                data.name,
                'parent'
            );

            if (result.success) {
                toast.success('Registration successful!');

                const userData = {
                    id: result.user.uid,
                    name: result.user.name,
                    email: result.user.email,
                    role: 'parent',
                    emailVerified: result.user.emailVerified,
                };

                login(userData, result.token);

                setTimeout(() => {
                    navigate(ROUTES.PARENT.DASHBOARD);
                }, 1000);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Registration failed. Please try again.');
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
                placeholder="parent@example.com"
                {...register('email')}
                error={errors.email?.message}
                required
            />

            <Input
                label="Phone Number"
                type="tel"
                placeholder="1234567890"
                {...register('phone')}
                error={errors.phone?.message}
                required
            />

            <Input
                label="Child's Roll Number"
                placeholder="STD001"
                {...register('childRollNumber')}
                error={errors.childRollNumber?.message}
                helperText="Enter your child's school roll number"
                required
            />

            <div className="relative">
                <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    error={errors.password?.message}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div className="relative">
                <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <Button type="submit" fullWidth loading={loading}>
                Register as Parent
            </Button>
        </form>
    );
};

export default ParentRegistrationForm;