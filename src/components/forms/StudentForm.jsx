import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const studentSchema = z.object({
    rollNumber: z.string().min(1, 'Roll number is required'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
    class: z.string().min(1, 'Class is required'),
    section: z.string().min(1, 'Section is required'),
});

const StudentForm = ({ initialData = null, onSubmit, onCancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(studentSchema),
        defaultValues: initialData || {
            rollNumber: '',
            name: '',
            email: '',
            phone: '',
            class: '',
            section: '',
        },
    });

    const classOptions = [
        { value: '1', label: 'Class 1' },
        { value: '2', label: 'Class 2' },
        { value: '3', label: 'Class 3' },
        { value: '4', label: 'Class 4' },
        { value: '5', label: 'Class 5' },
        { value: '6', label: 'Class 6' },
        { value: '7', label: 'Class 7' },
        { value: '8', label: 'Class 8' },
        { value: '9', label: 'Class 9' },
        { value: '10', label: 'Class 10' },
    ];

    const sectionOptions = [
        { value: 'A', label: 'Section A' },
        { value: 'B', label: 'Section B' },
        { value: 'C', label: 'Section C' },
        { value: 'D', label: 'Section D' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Roll Number"
                    placeholder="Enter roll number"
                    {...register('rollNumber')}
                    error={errors.rollNumber?.message}
                    required
                />

                <Input
                    label="Student Name"
                    placeholder="Enter full name"
                    {...register('name')}
                    error={errors.name?.message}
                    required
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="student@example.com"
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                    label="Class"
                    {...register('class')}
                    options={classOptions}
                    error={errors.class?.message}
                    required
                />

                <Select
                    label="Section"
                    {...register('section')}
                    options={sectionOptions}
                    error={errors.section?.message}
                    required
                />
            </div>

            <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    {initialData ? 'Update' : 'Add'} Student
                </Button>
            </div>
        </form>
    );
};

export default StudentForm;