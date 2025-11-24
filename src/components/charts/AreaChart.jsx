import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/ui/Card';

const AreaChart = ({ data, title, xKey, yKey, color = '#3b82f6' }) => {
    return (
        <Card>
            {title && (
                <Card.Header>
                    <Card.Title>{title}</Card.Title>
                </Card.Header>
            )}

            <Card.Content>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsAreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
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
                        <Area
                            type="monotone"
                            dataKey={yKey}
                            stroke={color}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </RechartsAreaChart>
                </ResponsiveContainer>
            </Card.Content>
        </Card>
    );
};

export default AreaChart;