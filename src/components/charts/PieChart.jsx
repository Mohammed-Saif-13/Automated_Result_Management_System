import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from '@/components/ui/Card';

const PieChart = ({ data, title, colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'] }) => {
    return (
        <Card>
            {title && (
                <Card.Header>
                    <Card.Title>{title}</Card.Title>
                </Card.Header>
            )}

            <Card.Content>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                            }}
                        />
                        <Legend />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </Card.Content>
        </Card>
    );
};

export default PieChart;