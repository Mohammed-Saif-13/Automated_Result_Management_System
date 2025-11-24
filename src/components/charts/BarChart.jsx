import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '@/components/ui/Card';

const BarChart = ({ data, title, xKey, yKey, color = '#3b82f6' }) => {
    return (
        <Card>
            {title && (
                <Card.Header>
                    <Card.Title>{title}</Card.Title>
                </Card.Header>
            )}

            <Card.Content>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey={xKey} stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                            }}
                        />
                        <Bar dataKey={yKey} fill={color} radius={[8, 8, 0, 0]} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </Card.Content>
        </Card>
    );
};

export default BarChart;