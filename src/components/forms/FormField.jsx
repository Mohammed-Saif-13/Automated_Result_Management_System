import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';

const FormField = ({ type = 'text', ...props }) => {
    switch (type) {
        case 'select':
            return <Select {...props} />;
        case 'textarea':
            return <Textarea {...props} />;
        default:
            return <Input type={type} {...props} />;
    }
};

export default FormField;