import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '@/components/ui/Card';

const LineChart = ({ data, title, xKey, lines = [], colors = ['#3b82f6', '#22c55e', '#f59e0b'] }) => {
    return (
        <Card>
            {title && (
                <Card.Header>
                    <Card.Title>{title}</Card.Title>
                </Card.Header>
            )}

            <Card.Content>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={data}>
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
                        <Legend />
                        {lines.map((line, index) => (
                            <Line
                                key={line.key}
                                type="monotone"
                                dataKey={line.key}
                                name={line.name}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />
                        ))}
                    </RechartsLineChart>
                </ResponsiveContainer>
            </Card.Content>
        </Card>
    );
};

export default LineChart;